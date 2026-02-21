import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function Connect() {
  const token = "Connect Lovable Cloud to generate your token";

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Connect Extension</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Access Token</CardTitle>
          <CardDescription>
            Copy this token and paste it into your iSorter Chrome extension settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md font-mono text-sm break-all">
            {token}
          </div>
          <Button variant="outline" className="gap-2">
            <Copy className="h-4 w-4" />
            Copy Token
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
