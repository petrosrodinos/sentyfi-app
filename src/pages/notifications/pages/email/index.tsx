import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconMail, IconCheck, IconSend, IconAlertCircle } from "@tabler/icons-react";

export default function EmailNotifications() {
  const [email_verified, set_email_verified] = useState(false);
  const [email_address, set_email_address] = useState("");
  const [verification_sent, set_verification_sent] = useState(false);
  const [email_enabled, set_email_enabled] = useState(false);

  const send_verification_email = () => {
    if (email_address) {
      set_verification_sent(true);
    }
  };

  const verify_email = () => {
    set_email_verified(true);
    set_email_enabled(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Email Notifications</h2>
        <p className="text-muted-foreground">Receive detailed notifications and market insights directly to your email inbox.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <IconMail size={20} className="text-primary" />
            <CardTitle>Email Setup</CardTitle>
          </div>
          <CardDescription>Verify your email address to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!email_verified ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" value={email_address} onChange={(e) => set_email_address(e.target.value)} />
              </div>

              {!verification_sent ? (
                <Button onClick={send_verification_email} className="w-full">
                  <IconSend size={16} className="mr-2" />
                  Send Verification Email
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <IconAlertCircle size={16} />
                    <span>Verification email sent to {email_address}</span>
                  </div>
                  <Button onClick={verify_email} className="w-full">
                    <IconCheck size={16} className="mr-2" />
                    I've Verified My Email
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email notifications</span>
                <Switch checked={email_enabled} onCheckedChange={set_email_enabled} />
              </div>
              <Badge variant="default" className="flex items-center space-x-1">
                <IconCheck size={12} />
                <span>Email verified</span>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

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
            <Switch defaultChecked disabled={!email_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly reports</p>
              <p className="text-sm text-muted-foreground">Detailed weekly analysis and insights</p>
            </div>
            <Switch defaultChecked disabled={!email_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Breaking news alerts</p>
              <p className="text-sm text-muted-foreground">Immediate notifications for important market events</p>
            </div>
            <Switch disabled={!email_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Portfolio performance</p>
              <p className="text-sm text-muted-foreground">Regular updates on your portfolio performance</p>
            </div>
            <Switch defaultChecked disabled={!email_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Social sentiment reports</p>
              <p className="text-sm text-muted-foreground">Analysis of social media sentiment for your assets</p>
            </div>
            <Switch disabled={!email_enabled} />
          </div>
        </CardContent>
      </Card>

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
            <Switch disabled={!email_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hourly summaries</p>
              <p className="text-sm text-muted-foreground">Consolidated updates every hour</p>
            </div>
            <Switch disabled={!email_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily summaries</p>
              <p className="text-sm text-muted-foreground">One comprehensive email per day</p>
            </div>
            <Switch defaultChecked disabled={!email_enabled} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
