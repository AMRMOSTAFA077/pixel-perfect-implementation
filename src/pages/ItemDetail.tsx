import { useParams } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Item Detail</h1>
      <p className="text-muted-foreground">Item ID: {id}</p>
    </div>
  );
}
