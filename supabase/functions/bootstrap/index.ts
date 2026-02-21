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

    // Verify user with anon client
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    // Use service role for writes
    const supabase = createClient(supabaseUrl, serviceKey);

    // Check if workspace exists
    const { data: existing } = await supabase
      .from("workspaces")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      // Workspace exists, return it with boards
      const { data: boards } = await supabase.from("boards").select("*").eq("workspace_id", existing.id);
      return new Response(JSON.stringify({ workspace: existing, boards }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Create workspace
    const { data: workspace, error: wsError } = await supabase
      .from("workspaces")
      .insert({ user_id: user.id, plan: "free" })
      .select()
      .single();

    if (wsError) throw wsError;

    // Create default board
    const { data: board, error: boardError } = await supabase
      .from("boards")
      .insert({ workspace_id: workspace.id, name: "Default Board" })
      .select()
      .single();

    if (boardError) throw boardError;

    return new Response(JSON.stringify({ workspace, boards: [board] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
