import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Heart, MessageCircle, Eye } from "lucide-react";
import { callEdgeFunction } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: string;
  ig_shortcode: string;
  media_type: string;
  caption: string;
  likes: number;
  comments: number;
  views: number;
  thumbnail_path: string;
  owner_username: string;
  created_at: string;
}

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [board, setBoard] = useState<any>(null);
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    async function load() {
      const { data: b } = await supabase.from("boards").select("*").eq("id", id as string).single();
      setBoard(b);

      const { data: boardItems } = await supabase
        .from("board_items")
        .select("media_item_id, media_items(*)")
        .eq("board_id", id as string);

      setItems((boardItems || []).map((bi: any) => bi.media_items).filter(Boolean));
    }
    load();
  }, [id]);

  const shareBoard = async () => {
    try {
      const data = await callEdgeFunction("share-create", { body: { share_type: "board", board_id: id } });
      const url = `${window.location.origin}/share/board/${data.share.share_id}`;
      await navigator.clipboard.writeText(url);
      toast({ title: "Share link copied!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (!board) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{board.name}</h1>
        <Button variant="outline" onClick={shareBoard}><Share2 className="h-4 w-4 mr-2" /> Share</Button>
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No items in this board yet. Save content using the Chrome extension.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} className="cursor-pointer hover:border-primary transition-colors overflow-hidden" onClick={() => navigate(`/item/${item.id}`)}>
              <div className="aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground">
                {item.thumbnail_path ? "📷" : "No thumbnail"}
              </div>
              <CardContent className="p-3 space-y-1">
                <p className="text-xs font-medium truncate">@{item.owner_username || "unknown"}</p>
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
      )}
    </div>
  );
}
