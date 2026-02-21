import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Missing auth" }), { status: 401, headers: corsHeaders });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!);

    const { data: { user }, error: authError } = await anonClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    const supabase = createClient(supabaseUrl, serviceKey);
    const body = await req.json();
    const { board_id, ig_shortcode, media_type, caption, hashtags, likes, comments, views, permalink, owner_username, thumbnail_path } = body;

    if (!board_id || !ig_shortcode) {
      return new Response(JSON.stringify({ error: "board_id and ig_shortcode are required" }), { status: 400, headers: corsHeaders });
    }

    // Verify board belongs to user's workspace
    const { data: workspace } = await supabase.from("workspaces").select("id").eq("user_id", user.id).single();
    if (!workspace) return new Response(JSON.stringify({ error: "No workspace found" }), { status: 404, headers: corsHeaders });

    const { data: board } = await supabase.from("boards").select("id").eq("id", board_id).eq("workspace_id", workspace.id).single();
    if (!board) return new Response(JSON.stringify({ error: "Board not found or not owned" }), { status: 403, headers: corsHeaders });

    // Upsert media item
    const { data: mediaItem, error: mediaError } = await supabase
      .from("media_items")
      .upsert(
        { workspace_id: workspace.id, ig_shortcode, media_type, caption, hashtags, likes, comments, views, permalink, owner_username, thumbnail_path },
        { onConflict: "workspace_id,ig_shortcode" }
      )
      .select()
      .single();

    if (mediaError) throw mediaError;

    // Link to board (ignore duplicate)
    await supabase
      .from("board_items")
      .upsert(
        { board_id, media_item_id: mediaItem.id },
        { onConflict: "board_id,media_item_id" }
      );

    return new Response(JSON.stringify({ item: mediaItem }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
