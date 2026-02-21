import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Board {
  id: string;
  name: string;
  workspace_id: string;
  created_at: string;
}

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadBoards = async () => {
    const { data } = await supabase.from("boards").select("*").order("created_at");
    setBoards((data as Board[]) || []);
  };

  useEffect(() => { loadBoards(); }, []);

  const createBoard = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      // Get workspace
      const { data: ws } = await supabase.from("workspaces").select("id, plan").single();
      if (!ws) throw new Error("No workspace");

      // Plan gating: free = max 1 board
      if (ws.plan === "free" && boards.length >= 1) {
        toast({ title: "Upgrade required", description: "Free plan allows 1 board. Upgrade to create more.", variant: "destructive" });
        return;
      }

      const { error } = await supabase.from("boards").insert({ workspace_id: ws.id, name: newName.trim() });
      if (error) throw error;
      setNewName("");
      loadBoards();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Boards</h1>
      </div>
      <div className="flex gap-2 max-w-md">
        <Input placeholder="New board name" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && createBoard()} />
        <Button onClick={createBoard} disabled={creating}>
          <Plus className="h-4 w-4 mr-1" /> Create
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => (
          <Card key={board.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/boards/${board.id}`)}>
            <CardHeader>
              <CardTitle className="text-lg">{board.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Created {new Date(board.created_at).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
        {boards.length === 0 && (
          <Card className="border-dashed border-2 flex items-center justify-center min-h-[160px]">
            <CardContent className="text-center text-muted-foreground">
              <Plus className="h-8 w-8 mx-auto mb-2" />
              <p>Create your first board</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
