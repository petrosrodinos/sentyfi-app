import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface EmailFrequencyCardProps {
  emailEnabled: boolean;
}

export default function EmailFrequencyCard({ emailEnabled }: EmailFrequencyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Frequency</CardTitle>
        <CardDescription>Control how often you receive email notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Real-time alerts</p>
            <p className="text-sm text-muted-foreground">Immediate notifications for critical events</p>
          </div>
          <Switch disabled={!emailEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Hourly summaries</p>
            <p className="text-sm text-muted-foreground">Consolidated updates every hour</p>
          </div>
          <Switch disabled={!emailEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Daily summaries</p>
            <p className="text-sm text-muted-foreground">One comprehensive email per day</p>
          </div>
          <Switch defaultChecked disabled={!emailEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
