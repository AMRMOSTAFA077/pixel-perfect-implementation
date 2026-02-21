import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callEdgeFunction } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Eye } from "lucide-react";

export default function ShareItem() {
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

  const item = data.item;

  return (
    <div className="min-h-screen bg-background p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shared Item</h1>
      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
        {data.signedUrl ? <img src={data.signedUrl} alt="" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-muted-foreground">No image</div>}
      </div>
      {item && (
        <>
          <div className="flex gap-6 text-sm mb-4">
            <span className="flex items-center gap-1"><Heart className="h-4 w-4" />{item.likes}</span>
            <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" />{item.comments}</span>
            <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{item.views}</span>
            <span className="text-muted-foreground">@{item.owner_username}</span>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-sm">Caption</CardTitle></CardHeader>
            <CardContent><p className="text-sm whitespace-pre-wrap">{item.caption || "No caption"}</p></CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
