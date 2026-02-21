import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Heart, MessageCircle, Eye, Star } from "lucide-react";
import { callEdgeFunction } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function ItemDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [item, setItem] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    supabase.from("media_items").select("*").eq("id", id as string).single().then(({ data }) => {
      if (data) {
        setItem(data);
        setRating(data.rating || 0);
        setNotes(data.notes || "");
        setTags((data.tags || []).join(", "));
      }
    });
  }, [id]);

  const save = async () => {
    const { error } = await supabase.from("media_items").update({
      rating: rating || null,
      notes: notes || null,
      tags: tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    }).eq("id", id!);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Saved!" });
  };

  const copyCaption = () => {
    if (item?.caption) { navigator.clipboard.writeText(item.caption); toast({ title: "Caption copied!" }); }
  };

  const copyHashtags = () => {
    if (item?.hashtags?.length) { navigator.clipboard.writeText(item.hashtags.join(" ")); toast({ title: "Hashtags copied!" }); }
  };

  const shareItem = async () => {
    try {
      const data = await callEdgeFunction("share-create", { body: { share_type: "item", media_item_id: id } });
      const url = `${window.location.origin}/share/item/${data.share.share_id}`;
      await navigator.clipboard.writeText(url);
      toast({ title: "Share link copied!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (!item) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Item Detail</h1>
        <Button variant="outline" onClick={shareItem}><Share2 className="h-4 w-4 mr-2" /> Share</Button>
      </div>

      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        {item.thumbnail_path ? "📷 Thumbnail" : "No thumbnail"}
      </div>

      <div className="flex gap-6 text-sm">
        <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {item.likes}</span>
        <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {item.comments}</span>
        <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {item.views}</span>
        <span className="text-muted-foreground">@{item.owner_username}</span>
        <span className="text-muted-foreground uppercase text-xs">{item.media_type}</span>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Caption</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap mb-2">{item.caption || "No caption"}</p>
          <Button variant="outline" size="sm" onClick={copyCaption}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Hashtags</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm mb-2">{item.hashtags?.join(" ") || "None"}</p>
          <Button variant="outline" size="sm" onClick={copyHashtags}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Your Notes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">Rating (1-5)</label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} className="p-1">
                  <Star className={`h-5 w-5 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Tags (comma-separated)</label>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. inspiration, carousel" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Notes</label>
            <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <Button onClick={save}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
