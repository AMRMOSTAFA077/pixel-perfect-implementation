import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callEdgeFunction } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Eye } from "lucide-react";

export default function ShareBoard() {
  const { shareId } = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    callEdgeFunction("share-resolve", { method: "GET", query: { shareId: shareId! }, noAuth: true })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [shareId]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-destructive">{error}</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">{data.board?.name || "Shared Board"}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(data.items || []).map((item: any) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square bg-muted">
              {item.signedUrl ? <img src={item.signedUrl} alt="" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-muted-foreground text-xs">No image</div>}
            </div>
            <CardContent className="p-3 space-y-1">
              <p className="text-xs font-medium">@{item.owner_username || "unknown"}</p>
              <p className="text-xs text-muted-foreground truncate">{item.caption?.slice(0, 60)}</p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{item.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{item.comments}</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
