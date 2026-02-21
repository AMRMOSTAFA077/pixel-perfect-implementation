import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const shareId = url.searchParams.get("shareId");
    if (!shareId) return new Response(JSON.stringify({ error: "shareId required" }), { status: 400, headers: corsHeaders });

    // No auth required — public endpoint, uses service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: share, error: shareError } = await supabase
      .from("shares")
      .select("*")
      .eq("share_id", shareId)
      .single();

    if (shareError || !share) {
      return new Response(JSON.stringify({ error: "Share not found" }), { status: 404, headers: corsHeaders });
    }

    if (share.share_type === "item" && share.media_item_id) {
      const { data: item } = await supabase.from("media_items").select("*").eq("id", share.media_item_id).single();

      let signedUrl = null;
      if (item?.thumbnail_path) {
        const path = item.thumbnail_path.replace("thumbnails/", "");
        const { data: urlData } = await supabase.storage.from("thumbnails").createSignedUrl(path, 3600);
        signedUrl = urlData?.signedUrl;
      }

      return new Response(JSON.stringify({ share_type: "item", item, signedUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (share.share_type === "board" && share.board_id) {
      const { data: board } = await supabase.from("boards").select("*").eq("id", share.board_id).single();
      const { data: boardItems } = await supabase
        .from("board_items")
        .select("media_item_id, media_items(*)")
        .eq("board_id", share.board_id);

      // Generate signed URLs for all thumbnails
      const items = await Promise.all(
        (boardItems || []).map(async (bi: any) => {
          const item = bi.media_items;
          let signedUrl = null;
          if (item?.thumbnail_path) {
            const path = item.thumbnail_path.replace("thumbnails/", "");
            const { data: urlData } = await supabase.storage.from("thumbnails").createSignedUrl(path, 3600);
            signedUrl = urlData?.signedUrl;
          }
          return { ...item, signedUrl };
        })
      );

      return new Response(JSON.stringify({ share_type: "board", board, items }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid share" }), { status: 400, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
