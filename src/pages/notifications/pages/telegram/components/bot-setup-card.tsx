import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IconBrandTelegram, IconCheck, IconBolt, IconCopy, IconRefresh } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { useCreateVerificationToken } from "../../../../../features/notifications/hooks/verification-tokens";
import { VerificationTokenType } from "../../../../../features/notifications/interfaces/verification-tokens";
import { NotificationChannelTypes, type NotificationChannel } from "../../../../../features/notifications/interfaces/notification-channels";
import { useGetNotificationChannels, useUpdateNotificationChannel } from "../../../../../features/notifications/hooks/use-notification-channels";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface BotSetupCardProps {
  user_uuid: string;
  telegramChannel: NotificationChannel[] | undefined;
  botConnected: boolean;
  telegramEnabled: boolean;
}

export default function BotSetupCard({ user_uuid, telegramChannel, botConnected, telegramEnabled }: BotSetupCardProps) {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const { mutate: createVerificationToken, isPending: isCreatingVerificationToken } = useCreateVerificationToken();
  const { mutate: getNotificationChannels, isPending: isLoadingNotificationChannels } = useGetNotificationChannels();
  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();
  const queryClient = useQueryClient();

  const generateCode = async () => {
    createVerificationToken(
      {
        type: VerificationTokenType.telegram,
      },
      {
        onSuccess: (data) => {
          setGeneratedCode(data.token!);
        },
      }
    );
  };

  const connectBot = async () => {
    getNotificationChannels(
      { user_uuid, channel: NotificationChannelTypes.telegram },
      {
        onSuccess: (data) => {
          if (data?.length === 0) {
            toast({
              title: "Could not connect bot",
              description: "Please try again",
              duration: 3000,
              variant: "error",
            });
          } else {
            toast({
              title: "Bot connected",
              description: "You have successfully connected the bot",
            });
            queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.telegram] });
          }
        },
        onError: () => {
          toast({
            title: "Failed to connect bot",
            description: "Please try again",
            variant: "destructive",
          });
        },
      }
    );
  };

  const updateNotificationChannel = async (enabled: boolean) => {
    if (telegramChannel) {
      updateNotificationChannelMutation(
        { id: telegramChannel[0].id, enabled: enabled },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.telegram] });
          },
        }
      );
    }
  };

  const copyCode = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Code copied",
        description: "Code copied to clipboard",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <IconBrandTelegram size={20} className="text-primary" />
          <CardTitle>Telegram Bot Setup</CardTitle>
        </div>
        {botConnected ? <CardDescription>You can now start receiving notifications</CardDescription> : <CardDescription>Generate a code to connect to our Telegram bot</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {!botConnected ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">How to connect:</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Click "Generate Code" below</li>
                <li>2. Copy the generated code</li>
                <li>3. Open Telegram and search for @SentyfiBot</li>
                <li>4. Start a conversation with the bot</li>
                <li>
                  5. Enter <code className="text-sm bg-muted px-2 py-1 rounded">/start {generatedCode || "your_code_here"}</code>
                </li>
                <li>6. Click "I've Connected the Bot" once done</li>
              </ol>
            </div>

            {!generatedCode ? (
              <Button onClick={generateCode} disabled={isCreatingVerificationToken} className="w-full">
                {isCreatingVerificationToken ? (
                  <>
                    <IconRefresh size={16} className="mr-2 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  <>
                    <IconBolt size={16} className="mr-2" />
                    Generate Code
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="bg-muted border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Your connection code:</p>
                      <p className="text-2xl font-mono font-bold tracking-wider">{generatedCode}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={copyCode} className="ml-2">
                      <IconCopy size={16} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {/* <Button onClick={() => window.open(`https://t.me/SentifyBot?start=${generatedCode}`, "_blank")} variant="outline" className="flex-1">
                    <IconBrandTelegram size={16} className="mr-2" />
                    Open Telegram Bot
                  </Button> */}
                  <Button onClick={connectBot} className="flex-1" disabled={isLoadingNotificationChannels} loading={isLoadingNotificationChannels}>
                    <IconCheck size={16} className="mr-2" />
                    I've Connected the Bot
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Telegram notifications</span>
              {isUpdatingNotificationChannel ? <Loader2 className="h-4 w-4 animate-spin" /> : <Switch checked={telegramEnabled} onCheckedChange={(enabled) => updateNotificationChannel(enabled)} />}
            </div>
            <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
              <IconCheck size={12} />
              <span>Bot connected</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
