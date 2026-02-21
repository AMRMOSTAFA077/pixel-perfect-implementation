import { useParams } from "react-router-dom";

export default function BoardDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Board</h1>
      <p className="text-muted-foreground">Board ID: {id}</p>
      <p className="text-muted-foreground">No items in this board yet.</p>
    </div>
  );
}
