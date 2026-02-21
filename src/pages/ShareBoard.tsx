import { useParams } from "react-router-dom";

export default function ShareBoard() {
  const { shareId } = useParams();

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-4">Shared Board</h1>
      <p className="text-muted-foreground">Share ID: {shareId}</p>
    </div>
  );
}
