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
    const { share_type, board_id, media_item_id } = body;

    if (!share_type || !["board", "item"].includes(share_type)) {
      return new Response(JSON.stringify({ error: "share_type must be 'board' or 'item'" }), { status: 400, headers: corsHeaders });
    }

    // Verify ownership
    const { data: workspace } = await supabase.from("workspaces").select("id").eq("user_id", user.id).single();
    if (!workspace) return new Response(JSON.stringify({ error: "No workspace" }), { status: 404, headers: corsHeaders });

    if (share_type === "board" && board_id) {
      const { data: board } = await supabase.from("boards").select("id").eq("id", board_id).eq("workspace_id", workspace.id).single();
      if (!board) return new Response(JSON.stringify({ error: "Board not found" }), { status: 403, headers: corsHeaders });
    }

    if (share_type === "item" && media_item_id) {
      const { data: item } = await supabase.from("media_items").select("id").eq("id", media_item_id).eq("workspace_id", workspace.id).single();
      if (!item) return new Response(JSON.stringify({ error: "Item not found" }), { status: 403, headers: corsHeaders });
    }

    const { data: share, error: shareError } = await supabase
      .from("shares")
      .insert({ share_type, board_id: board_id || null, media_item_id: media_item_id || null, created_by: user.id })
      .select()
      .single();

    if (shareError) throw shareError;

    return new Response(JSON.stringify({ share }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
