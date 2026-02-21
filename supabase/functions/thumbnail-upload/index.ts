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

    const contentType = req.headers.get("content-type") || "";
    let fileData: Uint8Array;
    let igShortcode: string;

    if (contentType.includes("application/json")) {
      // Base64 upload
      const body = await req.json();
      igShortcode = body.ig_shortcode;
      const base64 = body.file_base64;
      if (!igShortcode || !base64) {
        return new Response(JSON.stringify({ error: "ig_shortcode and file_base64 required" }), { status: 400, headers: corsHeaders });
      }
      const binaryStr = atob(base64);
      fileData = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) fileData[i] = binaryStr.charCodeAt(i);
    } else {
      // FormData upload
      const formData = await req.formData();
      const file = formData.get("file") as File;
      igShortcode = formData.get("ig_shortcode") as string;
      if (!file || !igShortcode) {
        return new Response(JSON.stringify({ error: "file and ig_shortcode required" }), { status: 400, headers: corsHeaders });
      }
      fileData = new Uint8Array(await file.arrayBuffer());
    }

    const path = `${user.id}/${igShortcode}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(path, fileData, { contentType: "image/jpeg", upsert: true });

    if (uploadError) throw uploadError;

    return new Response(JSON.stringify({ path: `thumbnails/${path}` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
