import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Image, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { callEdgeFunction } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ items: 0, boards: 0 });

  useEffect(() => {
    async function load() {
      try { await callEdgeFunction("bootstrap"); } catch {}
      const { count: boardCount } = await supabase.from("boards").select("*", { count: "exact", head: true });
      const { count: itemCount } = await supabase.from("media_items").select("*", { count: "exact", head: true });
      setStats({ boards: boardCount || 0, items: itemCount || 0 });
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.items}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Boards</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.boards}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Saves</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">—</div></CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">No items saved yet. Connect your Chrome extension to start saving content.</p>
      </div>
    </div>
  );
}
