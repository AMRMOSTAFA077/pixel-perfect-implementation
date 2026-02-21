import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Not authenticated");
  return {
    "Authorization": `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
}

export async function callEdgeFunction(name: string, options: {
  method?: string;
  body?: any;
  query?: Record<string, string>;
  noAuth?: boolean;
} = {}) {
  const { method = "POST", body, query, noAuth } = options;
  const params = query ? "?" + new URLSearchParams(query).toString() : "";
  const url = `${SUPABASE_URL}/functions/v1/${name}${params}`;

  const headers: Record<string, string> = noAuth
    ? { "Content-Type": "application/json" }
    : await getAuthHeaders();

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
