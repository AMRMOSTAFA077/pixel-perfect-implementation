import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Connect() {
  const { session } = useAuth();
  const { toast } = useToast();
  const token = session?.access_token || "Sign in to get your token";

  const copy = () => {
    if (session?.access_token) {
      navigator.clipboard.writeText(session.access_token);
      toast({ title: "Token copied!" });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Connect Extension</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Access Token</CardTitle>
          <CardDescription>Copy this token and paste it into your iSorter Chrome extension settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md font-mono text-xs break-all max-h-32 overflow-auto">
            {token}
          </div>
          <Button variant="outline" className="gap-2" onClick={copy}>
            <Copy className="h-4 w-4" /> Copy Token
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
