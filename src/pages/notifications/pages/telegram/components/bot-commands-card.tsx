import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BotCommandsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Commands</CardTitle>
        <CardDescription>Available commands you can use in the Telegram chat</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <code className="text-sm bg-muted px-2 py-1 rounded">/portfolio</code>
            <span className="text-sm text-muted-foreground">View your portfolio</span>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-muted px-2 py-1 rounded">/alerts</code>
            <span className="text-sm text-muted-foreground">Manage your alerts</span>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-muted px-2 py-1 rounded">/news</code>
            <span className="text-sm text-muted-foreground">Latest market news</span>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-muted px-2 py-1 rounded">/settings</code>
            <span className="text-sm text-muted-foreground">Bot settings</span>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-muted px-2 py-1 rounded">/help</code>
            <span className="text-sm text-muted-foreground">Show all commands</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
