import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IconPhone } from "@tabler/icons-react";

export default function PhoneCallNotifications() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Phone Call Notifications</h2>
        <p className="text-muted-foreground">Configure phone call alerts for urgent notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <IconPhone size={20} className="text-primary" />
            <CardTitle>Phone Call Settings</CardTitle>
          </div>
          <CardDescription>Set up phone call notifications for critical alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="phone-calls">Enable Phone Calls</Label>
              <p className="text-sm text-muted-foreground">Receive urgent notifications via phone calls</p>
            </div>
            <Switch id="phone-calls" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <Input id="phone-number" type="tel" placeholder="+1 (555) 123-4567" />
            <p className="text-sm text-muted-foreground">Enter the phone number for call notifications</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="call-frequency">Call Frequency</Label>
            <select id="call-frequency" className="w-full p-2 border rounded-md">
              <option value="immediate">Immediate (for critical alerts)</option>
              <option value="hourly">Hourly summary</option>
              <option value="daily">Daily summary</option>
            </select>
          </div>

          <div className="pt-4">
            <Button className="w-full">Save Phone Call Settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Premium Feature</CardTitle>
          <CardDescription>Phone call notifications are a premium feature</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Upgrade to premium to enable phone call notifications for urgent market alerts and portfolio updates.</p>
          <Button variant="outline" className="w-full">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
