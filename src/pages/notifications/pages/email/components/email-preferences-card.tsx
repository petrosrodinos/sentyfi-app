import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface EmailPreferencesCardProps {
  emailEnabled: boolean;
}

export default function EmailPreferencesCard({ emailEnabled }: EmailPreferencesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Preferences</CardTitle>
        <CardDescription>Choose what types of emails you want to receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Daily digest</p>
            <p className="text-sm text-muted-foreground">Summary of market activity and portfolio changes</p>
          </div>
          <Switch defaultChecked disabled={!emailEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Weekly reports</p>
            <p className="text-sm text-muted-foreground">Detailed weekly analysis and insights</p>
          </div>
          <Switch defaultChecked disabled={!emailEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Breaking news alerts</p>
            <p className="text-sm text-muted-foreground">Immediate notifications for important market events</p>
          </div>
          <Switch disabled={!emailEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Portfolio performance</p>
            <p className="text-sm text-muted-foreground">Regular updates on your portfolio performance</p>
          </div>
          <Switch defaultChecked disabled={!emailEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Social sentiment reports</p>
            <p className="text-sm text-muted-foreground">Analysis of social media sentiment for your assets</p>
          </div>
          <Switch disabled={!emailEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
