import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconBrandWhatsapp, IconCheck, IconSend, IconAlertCircle, IconQrcode, IconLink } from "@tabler/icons-react";

export default function WhatsAppNotifications() {
  const [phone_verified, set_phone_verified] = useState(false);
  const [whatsapp_connected, set_whatsapp_connected] = useState(false);
  const [phone_number, set_phone_number] = useState("");
  const [verification_sent, set_verification_sent] = useState(false);
  const [whatsapp_enabled, set_whatsapp_enabled] = useState(false);

  const send_verification_sms = () => {
    if (phone_number) {
      set_verification_sent(true);
    }
  };

  const verify_phone = () => {
    set_phone_verified(true);
  };

  const connect_whatsapp = () => {
    set_whatsapp_connected(true);
    set_whatsapp_enabled(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">WhatsApp Notifications</h2>
        <p className="text-muted-foreground">Receive instant notifications via WhatsApp for market updates and portfolio alerts.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <IconBrandWhatsapp size={20} className="text-primary" />
            <CardTitle>Phone Number Setup</CardTitle>
          </div>
          <CardDescription>Verify your phone number to connect WhatsApp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!phone_verified ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={phone_number} onChange={(e) => set_phone_number(e.target.value)} />
                <p className="text-xs text-muted-foreground">Enter the phone number associated with your WhatsApp account.</p>
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
              <Badge variant="default" className="flex items-center space-x-1">
                <IconCheck size={12} />
                <span>Phone verified</span>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {phone_verified && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <IconBrandWhatsapp size={20} className="text-green-600" />
              <CardTitle>WhatsApp Connection</CardTitle>
            </div>
            <CardDescription>Connect your WhatsApp account to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!whatsapp_connected ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">How to connect:</h4>
                  <ol className="text-sm text-green-700 space-y-1">
                    <li>1. Open WhatsApp on your phone</li>
                    <li>2. Search for our business number: +1 (555) 123-4567</li>
                    <li>3. Send "START" to begin receiving notifications</li>
                    <li>4. Follow the setup instructions</li>
                  </ol>
                </div>

                <Button onClick={connect_whatsapp} className="w-full">
                  <IconLink size={16} className="mr-2" />
                  I've Connected WhatsApp
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">WhatsApp notifications</span>
                  <Switch checked={whatsapp_enabled} onCheckedChange={set_whatsapp_enabled} />
                </div>
                <Badge variant="default" className="flex items-center space-x-1 bg-green-100 text-green-800">
                  <IconCheck size={12} />
                  <span>WhatsApp connected</span>
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Separator />

      {whatsapp_connected && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Alert Types</CardTitle>
              <CardDescription>Choose what types of WhatsApp messages you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Portfolio updates</p>
                  <p className="text-sm text-muted-foreground">Daily portfolio performance summaries</p>
                </div>
                <Switch defaultChecked disabled={!whatsapp_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Price alerts</p>
                  <p className="text-sm text-muted-foreground">Significant price movements in your assets</p>
                </div>
                <Switch defaultChecked disabled={!whatsapp_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Market news</p>
                  <p className="text-sm text-muted-foreground">Breaking news and market events</p>
                </div>
                <Switch disabled={!whatsapp_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Social sentiment</p>
                  <p className="text-sm text-muted-foreground">Social media sentiment changes for your assets</p>
                </div>
                <Switch disabled={!whatsapp_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly reports</p>
                  <p className="text-sm text-muted-foreground">Comprehensive weekly market analysis</p>
                </div>
                <Switch disabled={!whatsapp_enabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Frequency</CardTitle>
              <CardDescription>Control how often you receive WhatsApp messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Real-time alerts</p>
                  <p className="text-sm text-muted-foreground">Messages sent immediately when events occur</p>
                </div>
                <Switch defaultChecked disabled={!whatsapp_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily digest</p>
                  <p className="text-sm text-muted-foreground">One message with all daily activity</p>
                </div>
                <Switch disabled={!whatsapp_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly summary</p>
                  <p className="text-sm text-muted-foreground">Comprehensive weekly report</p>
                </div>
                <Switch disabled={!whatsapp_enabled} />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">WhatsApp Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Free messaging (uses your data plan)</li>
            <li>• Rich media support (images, charts)</li>
            <li>• Interactive responses and commands</li>
            <li>• End-to-end encryption for privacy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
