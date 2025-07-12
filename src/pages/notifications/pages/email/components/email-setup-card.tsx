import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IconMail, IconCheck, IconSend, IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateNotificationChannel } from "@/features/notifications/hooks/use-notification-channels";
import { useCreateVerificationToken, useVerifyVerificationToken } from "@/features/notifications/hooks/verification-tokens";
import { NotificationChannelTypes, type NotificationChannel } from "@/features/notifications/interfaces/notification-channels";
import { VerificationTokenType } from "@/features/notifications/interfaces/verification-tokens";
import { EmailAddressSchema, VerificationCodeSchema, type EmailAddressFormValues, type VerificationCodeFormValues } from "../validation-schemas/email";
import { useCountdown } from "../../../../../hooks/use-countdown";
import { useAuthStore } from "@/stores/auth";

interface EmailSetupCardProps {
  emailChannel: NotificationChannel;
  emailEnabled: boolean;
  emailVerified: boolean;
}

export default function EmailSetupCard({ emailChannel, emailEnabled, emailVerified }: EmailSetupCardProps) {
  const queryClient = useQueryClient();
  const { countdown, startCountdown } = useCountdown();

  const { email } = useAuthStore();

  const [verificationSent, setVerificationSent] = useState(false);

  const emailForm = useForm<EmailAddressFormValues>({
    resolver: zodResolver(EmailAddressSchema),
    defaultValues: {
      emailAddress: email || "",
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

  const isEmailValid = () => {
    const emailAddress = emailForm.watch("emailAddress");
    return emailAddress.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  };

  const sendVerificationEmail = async (data: EmailAddressFormValues) => {
    createVerificationToken(
      {
        type: VerificationTokenType.email,
        client_identifier: data.emailAddress,
      },
      {
        onSuccess: () => {
          setVerificationSent(true);
          startCountdown(60);
          toast({
            title: "Verification email sent",
            description: `A verification code has been sent to ${data.emailAddress}`,
          });
        },
      }
    );
  };

  const verifyEmail = async (data: VerificationCodeFormValues) => {
    verifyVerificationToken(data.verificationCode, {
      onSuccess: () => {
        toast({
          title: "Email address verified",
          description: "You have successfully verified your email address",
        });
        queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.email] });
      },
    });
  };

  const resendVerificationCode = () => {
    setVerificationSent(false);
    const emailData = emailForm.getValues();
    if (emailData.emailAddress) {
      sendVerificationEmail(emailData);
    }
  };

  const updateNotificationChannel = async (enabled: boolean) => {
    if (emailChannel.id) {
      updateNotificationChannelMutation(
        { id: emailChannel.id, enabled: enabled },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.email] });
          },
        }
      );
    }
  };

  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailForm.handleSubmit(sendVerificationEmail)(e);
  };

  const handleVerificationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verificationForm.handleSubmit(verifyEmail)(e);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <IconMail size={20} className="text-primary" />
          <CardTitle>Email Setup</CardTitle>
        </div>
        {emailVerified ? <CardDescription>Your email address is verified and ready to receive email notifications</CardDescription> : <CardDescription>Verify your email address to receive email notifications</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {!emailVerified ? (
          <div className="space-y-4">
            {!verificationSent ? (
              <Form {...emailForm}>
                <form onSubmit={handleEmailFormSubmit} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input id="email" readOnly type="email" placeholder="Enter your email address" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">Enter your email address to receive notifications.</p>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isCreatingVerificationToken || !isEmailValid()} className="w-full">
                    {isCreatingVerificationToken ? (
                      <>
                        <IconRefresh size={16} className="mr-2 animate-spin" />
                        Sending Email...
                      </>
                    ) : (
                      <>
                        <IconSend size={16} className="mr-2" />
                        Send Verification Email
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <IconAlertCircle size={16} />
                  <span>Verification email sent to {emailForm.watch("emailAddress")}</span>
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
              <span className="text-sm font-medium">Email notifications</span>
              {isUpdatingNotificationChannel ? <Loader2 className="h-4 w-4 animate-spin" /> : <Switch checked={emailEnabled} onCheckedChange={updateNotificationChannel} />}
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                <IconCheck size={12} />
                <span>Email address verified</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Verified email:</span> {emailChannel.client_identifier}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
