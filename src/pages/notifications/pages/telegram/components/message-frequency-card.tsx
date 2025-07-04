import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface MessageFrequencyCardProps {
  telegramEnabled: boolean;
}

export default function MessageFrequencyCard({ telegramEnabled }: MessageFrequencyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Frequency</CardTitle>
        <CardDescription>Control how often you receive Telegram messages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Real-time alerts</p>
            <p className="text-sm text-muted-foreground">Messages sent immediately when events occur</p>
          </div>
          <Switch defaultChecked disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Hourly summaries</p>
            <p className="text-sm text-muted-foreground">Consolidated updates every hour</p>
          </div>
          <Switch disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Daily digest</p>
            <p className="text-sm text-muted-foreground">One message with all daily activity</p>
          </div>
          <Switch disabled={!telegramEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
