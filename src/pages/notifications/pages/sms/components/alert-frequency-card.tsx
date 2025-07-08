import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface AlertFrequencyCardProps {
  smsEnabled: boolean;
}

export default function AlertFrequencyCard({ smsEnabled }: AlertFrequencyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Frequency</CardTitle>
        <CardDescription>Control how often you receive SMS notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Immediate alerts</p>
            <p className="text-sm text-muted-foreground">SMS sent as soon as events occur</p>
          </div>
          <Switch defaultChecked disabled={!smsEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Batched alerts</p>
            <p className="text-sm text-muted-foreground">Multiple alerts combined into one SMS</p>
          </div>
          <Switch disabled={!smsEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Daily summary</p>
            <p className="text-sm text-muted-foreground">One SMS with all daily activity</p>
          </div>
          <Switch disabled={!smsEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
