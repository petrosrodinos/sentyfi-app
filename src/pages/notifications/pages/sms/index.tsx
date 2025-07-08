import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconMessageCircle, IconCheck, IconSend, IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../interfaces/notification-channels";
import { useNotificationChannels } from "../../hooks/use-notification-channels";
import { useCreateVerificationToken, useVerifyVerificationToken } from "../../hooks/verification-tokens";
import { VerificationTokenType, type VerificationToken } from "../../interfaces/verification-tokens";
import { useUpdateNotificationChannel } from "../../hooks/use-notification-channels";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function SmsNotifications() {
  const { user_uuid } = useAuthStore();
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const queryClient = useQueryClient();

  const { data: smsChannel, isLoading: isLoadingSmsChannel } = useNotificationChannels({
    user_uuid: user_uuid!,
    channel: NotificationChannelTypes.sms,
  });

  const { mutate: createVerificationToken, isPending: isCreatingVerificationToken } = useCreateVerificationToken();
  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();
  const { mutate: verifyVerificationToken, isPending: isVerifyingVerificationToken } = useVerifyVerificationToken();

  useEffect(() => {
    if (smsChannel) {
      setPhoneVerified(smsChannel[0]?.verified || false);
      setSmsEnabled(smsChannel[0]?.enabled || false);
    }
  }, [smsChannel]);

  const sendVerificationSms = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
      });
      return;
    }

    createVerificationToken(
      {
        type: VerificationTokenType.sms,
        user_uuid: user_uuid!,
        client_identifier: phoneNumber,
      },
      {
        onSuccess: () => {
          setVerificationSent(true);
          toast({
            title: "Verification SMS sent",
            description: `A verification code has been sent to ${phoneNumber}`,
          });
        },
        onError: () => {
          toast({
            title: "Failed to send verification SMS",
            description: "Please try again",
          });
        },
      }
    );
  };

  const verifyPhone = async () => {
    verifyVerificationToken(verificationCode, {
      onSuccess: (data: VerificationToken) => {
        toast({
          title: "Phone number verified",
          description: "You have successfully verified your phone number",
        });
        queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.sms] });
      },
      onError: () => {
        toast({
          title: "Failed to verify phone number",
          description: "Please try again",
        });
      },
    });
  };

  const resendVerificationCode = () => {
    setVerificationSent(false);
    sendVerificationSms();
  };

  const updateNotificationChannel = async (enabled: boolean) => {
    if (smsChannel) {
      updateNotificationChannelMutation({ id: smsChannel[0].id, enabled: enabled }, {});
    }
  };

  if (isLoadingSmsChannel) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SMS Notifications</h2>
          <p className="text-muted-foreground">Receive instant text message alerts for critical market events and portfolio updates.</p>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

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
          {phoneVerified ? <CardDescription>Your phone number is verified and ready to receive SMS notifications</CardDescription> : <CardDescription>Verify your phone number to receive SMS notifications</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          {!phoneVerified ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <p className="text-xs text-muted-foreground">Standard SMS rates may apply. Enter your full international number.</p>
              </div>

              {!verificationSent ? (
                <Button onClick={sendVerificationSms} disabled={isCreatingVerificationToken || !phoneNumber} className="w-full">
                  {isCreatingVerificationToken ? (
                    <>
                      <IconRefresh size={16} className="mr-2 animate-spin" />
                      Sending SMS...
                    </>
                  ) : (
                    <>
                      <IconSend size={16} className="mr-2" />
                      Send Verification SMS
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <IconAlertCircle size={16} />
                    <span>Verification SMS sent to {phoneNumber}</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter verification code</Label>
                    <Input id="otp" type="text" placeholder="Enter 6-digit code" maxLength={6} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={verifyPhone} className="flex-1">
                      <IconCheck size={16} className="mr-2" />
                      {isVerifyingVerificationToken ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Code"}
                    </Button>
                    <Button onClick={resendVerificationCode} variant="outline" disabled={isCreatingVerificationToken || isVerifyingVerificationToken}>
                      <IconRefresh size={16} className="mr-2" />
                      {isCreatingVerificationToken ? <Loader2 className="h-4 w-4 animate-spin" /> : "Resend"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS notifications</span>
                {isUpdatingNotificationChannel ? <Loader2 className="h-4 w-4 animate-spin" /> : <Switch checked={smsEnabled} onCheckedChange={updateNotificationChannel} />}
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
