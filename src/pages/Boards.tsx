import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Boards() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Boards</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Board
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-dashed border-2 flex items-center justify-center min-h-[160px] cursor-pointer hover:border-primary transition-colors">
          <CardContent className="text-center text-muted-foreground">
            <Plus className="h-8 w-8 mx-auto mb-2" />
            <p>Create your first board</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
