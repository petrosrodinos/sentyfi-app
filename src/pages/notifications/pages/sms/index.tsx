import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconMessageCircle, IconCheck, IconSend, IconAlertCircle, IconPhone } from "@tabler/icons-react";

export default function SmsNotifications() {
  const [phone_verified, set_phone_verified] = useState(false);
  const [phone_number, set_phone_number] = useState("");
  const [verification_sent, set_verification_sent] = useState(false);
  const [sms_enabled, set_sms_enabled] = useState(false);

  const send_verification_sms = () => {
    if (phone_number) {
      set_verification_sent(true);
    }
  };

  const verify_phone = () => {
    set_phone_verified(true);
    set_sms_enabled(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">SMS Notifications</h2>
        <p className="text-muted-foreground">Receive instant text message alerts for critical market events and portfolio updates.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <IconMessageCircle size={20} className="text-primary" />
            <CardTitle>Phone Number Setup</CardTitle>
          </div>
          <CardDescription>Verify your phone number to receive SMS notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!phone_verified ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={phone_number} onChange={(e) => set_phone_number(e.target.value)} />
                <p className="text-xs text-muted-foreground">Standard SMS rates may apply. Enter your full international number.</p>
              </div>

              {!verification_sent ? (
                <Button onClick={send_verification_sms} className="w-full">
                  <IconSend size={16} className="mr-2" />
                  Send Verification SMS
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <IconAlertCircle size={16} />
                    <span>Verification SMS sent to {phone_number}</span>
                  </div>
                  <Button onClick={verify_phone} className="w-full">
                    <IconCheck size={16} className="mr-2" />
                    I've Verified My Phone
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS notifications</span>
                <Switch checked={sms_enabled} onCheckedChange={set_sms_enabled} />
              </div>
              <Badge variant="default" className="flex items-center space-x-1">
                <IconCheck size={12} />
                <span>Phone verified</span>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

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
            <Switch defaultChecked disabled={!sms_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Breaking news</p>
              <p className="text-sm text-muted-foreground">Important market news and events</p>
            </div>
            <Switch disabled={!sms_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Portfolio milestones</p>
              <p className="text-sm text-muted-foreground">When your portfolio reaches significant values</p>
            </div>
            <Switch disabled={!sms_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Social sentiment spikes</p>
              <p className="text-sm text-muted-foreground">Unusual social media activity for your assets</p>
            </div>
            <Switch disabled={!sms_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Urgent notifications</p>
              <p className="text-sm text-muted-foreground">Critical alerts requiring immediate attention</p>
            </div>
            <Switch defaultChecked disabled={!sms_enabled} />
          </div>
        </CardContent>
      </Card>

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
            <Switch defaultChecked disabled={!sms_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Batched alerts</p>
              <p className="text-sm text-muted-foreground">Multiple alerts combined into one SMS</p>
            </div>
            <Switch disabled={!sms_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily summary</p>
              <p className="text-sm text-muted-foreground">One SMS with all daily activity</p>
            </div>
            <Switch disabled={!sms_enabled} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">SMS Charges</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">Standard SMS rates apply. Check with your mobile carrier for any additional charges. We recommend using this for critical alerts only to manage costs.</p>
        </CardContent>
      </Card>
    </div>
  );
}
