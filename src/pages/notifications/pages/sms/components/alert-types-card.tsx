import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface AlertTypesCardProps {
  smsEnabled: boolean;
}

export default function AlertTypesCard({ smsEnabled }: AlertTypesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SMS Alert Types</CardTitle>
        <CardDescription>Choose what types of SMS alerts you want to receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Critical price alerts</p>
            <p className="text-sm text-muted-foreground">Major price movements in your portfolio</p>
          </div>
          <Switch defaultChecked disabled={!smsEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Breaking news</p>
            <p className="text-sm text-muted-foreground">Important market news and events</p>
          </div>
          <Switch disabled={!smsEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Portfolio milestones</p>
            <p className="text-sm text-muted-foreground">When your portfolio reaches significant values</p>
          </div>
          <Switch disabled={!smsEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Social sentiment spikes</p>
            <p className="text-sm text-muted-foreground">Unusual social media activity for your assets</p>
          </div>
          <Switch disabled={!smsEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Urgent notifications</p>
            <p className="text-sm text-muted-foreground">Critical alerts requiring immediate attention</p>
          </div>
          <Switch defaultChecked disabled={!smsEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
