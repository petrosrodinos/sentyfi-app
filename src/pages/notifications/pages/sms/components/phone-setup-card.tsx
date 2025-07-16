import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IconMessageCircle, IconCheck, IconSend, IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateNotificationChannel } from "@/features/notifications/hooks/use-notification-channels";
import { useCreateVerificationToken, useVerifyVerificationToken } from "@/features/notifications/hooks/verification-tokens";
import { NotificationChannelTypes, type NotificationChannel } from "@/features/notifications/interfaces/notification-channels";
import { VerificationTokenType } from "@/features/notifications/interfaces/verification-tokens";
import { PhoneNumberSchema, VerificationCodeSchema, type PhoneNumberFormValues, type VerificationCodeFormValues } from "../validation-schemas/phone";
import { useCountdown } from "../../../../../hooks/use-countdown";

interface PhoneSetupCardProps {
  smsChannel: NotificationChannel;
  smsEnabled: boolean;
  phoneVerified: boolean;
}

export default function PhoneSetupCard({ smsChannel, smsEnabled, phoneVerified }: PhoneSetupCardProps) {
  const [verificationSent, setVerificationSent] = useState(false);

  const queryClient = useQueryClient();
  const { countdown, startCountdown } = useCountdown();

  const phoneForm = useForm<PhoneNumberFormValues>({
    resolver: zodResolver(PhoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const verificationForm = useForm<VerificationCodeFormValues>({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: {
      verificationCode: "",
    },
    mode: "onChange",
  });

  const { mutate: createVerificationToken, isPending: isCreatingVerificationToken } = useCreateVerificationToken();
  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();
  const { mutate: verifyVerificationToken, isPending: isVerifyingVerificationToken } = useVerifyVerificationToken();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phoneNumber = value.replace(/[^\d+]/g, "");

    if (phoneNumber.startsWith("+")) {
      phoneForm.setValue("phoneNumber", phoneNumber);
    } else if (phoneNumber.length > 0) {
      phoneForm.setValue("phoneNumber", "+" + phoneNumber);
    } else {
      phoneForm.setValue("phoneNumber", "");
    }
  };

  const isPhoneNumberValid = () => {
    const phoneNumber = phoneForm.watch("phoneNumber");
    return phoneNumber.length >= 8 && /^\+[1-9]\d{1,14}$/.test(phoneNumber);
  };

  const sendVerificationSms = async (data: PhoneNumberFormValues) => {
    createVerificationToken(
      {
        type: VerificationTokenType.sms,
        client_identifier: data.phoneNumber,
      },
      {
        onSuccess: () => {
          setVerificationSent(true);
          startCountdown(60);
          toast({
            title: "Verification SMS sent",
            description: `A verification code has been sent to ${data.phoneNumber}`,
          });
        },
        onError: () => {
          toast({
            title: "Failed to send verification SMS",
            description: "Please try again",
            variant: "error",
          });
        },
      }
    );
  };

  const verifyPhone = async (data: VerificationCodeFormValues) => {
    verifyVerificationToken(data.verificationCode, {
      onSuccess: () => {
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
    const phoneData = phoneForm.getValues();
    if (phoneData.phoneNumber) {
      sendVerificationSms(phoneData);
    }
  };

  const updateNotificationChannel = async (enabled: boolean) => {
    if (smsChannel.id) {
      updateNotificationChannelMutation(
        { id: smsChannel.id, enabled: enabled },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.sms] });
          },
        }
      );
    }
  };

  const handlePhoneFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    phoneForm.handleSubmit(sendVerificationSms)(e);
  };

  const handleVerificationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verificationForm.handleSubmit(verifyPhone)(e);
  };

  return (
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
            {!verificationSent ? (
              <Form {...phoneForm}>
                <form onSubmit={handlePhoneFormSubmit} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <FormControl>
                          <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={field.value} onChange={handlePhoneNumberChange} onBlur={field.onBlur} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">Enter your full international number.</p>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isCreatingVerificationToken || !isPhoneNumberValid()} className="w-full">
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
                </form>
              </Form>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <IconAlertCircle size={16} />
                  <span>Verification SMS sent to {phoneForm.watch("phoneNumber")}</span>
                </div>

                <Form {...verificationForm}>
                  <form onSubmit={handleVerificationFormSubmit} className="space-y-3">
                    <FormField
                      control={verificationForm.control}
                      name="verificationCode"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="otp">Enter 6-character verification code</FormLabel>
                          <FormControl>
                            <Input
                              id="otp"
                              type="text"
                              placeholder="Enter 6-character code"
                              maxLength={6}
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                                field.onChange(value);
                              }}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-2">
                      <Button type="submit" className="flex-1" disabled={!verificationForm.watch("verificationCode") || verificationForm.watch("verificationCode").length !== 6}>
                        <IconCheck size={16} className="mr-2" />
                        {isVerifyingVerificationToken ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Code"}
                      </Button>
                      <Button onClick={resendVerificationCode} variant="outline" disabled={isCreatingVerificationToken || isVerifyingVerificationToken || countdown > 0}>
                        <IconRefresh size={16} className="mr-2" />
                        {isCreatingVerificationToken ? <Loader2 className="h-4 w-4 animate-spin" /> : countdown > 0 ? `Resend (${countdown}s)` : "Resend"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">SMS notifications</span>
              {isUpdatingNotificationChannel ? <Loader2 className="h-4 w-4 animate-spin" /> : <Switch checked={smsEnabled} onCheckedChange={updateNotificationChannel} />}
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                <IconCheck size={12} />
                <span>Phone number verified</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Verified number:</span> {smsChannel.client_identifier}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
