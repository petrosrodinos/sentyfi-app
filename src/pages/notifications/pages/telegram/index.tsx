import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { IconBrandTelegram, IconCheck, IconBolt, IconCopy, IconRefresh, IconTrash } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { useCreateVerificationToken } from "../../hooks/verification-tokens";
import { useAuthStore } from "@/stores/auth";
import { VerificationTokenType } from "../../interfaces/verification-tokens";
import { NotificationChannelTypes, type NotificationChannel } from "../../interfaces/notification-channels";
import { useNotificationChannels, useGetNotificationChannels, useUpdateNotificationChannel, useDeleteNotificationChannel } from "../../hooks/use-notification-channels";
import { useEffect } from "react";
import SkeletonLoader from "../../components/skeleton-loader";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/confirm-dialog";

export default function TelegramNotifications() {
  const { user_uuid } = useAuthStore();
  const [botConnected, setBotConnected] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: telegramChannel, isLoading: isLoadingTelegramChannel } = useNotificationChannels({ user_uuid: user_uuid!, channel: NotificationChannelTypes.telegram });

  const { mutate: createVerificationToken, isPending: isCreatingVerificationToken } = useCreateVerificationToken();

  const { mutate: getNotificationChannels, isPending: isLoadingNotificationChannels } = useGetNotificationChannels();

  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();

  const { mutate: deleteNotificationChannelMutation, isPending: isDeletingNotificationChannel } = useDeleteNotificationChannel();

  useEffect(() => {
    if (telegramChannel) {
      setBotConnected(telegramChannel[0].verified);
      setTelegramEnabled(telegramChannel[0].enabled);
    }
  }, [telegramChannel]);

  const generateCode = async () => {
    createVerificationToken(
      {
        type: VerificationTokenType.telegram,
        user_uuid: user_uuid!,
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
      { user_uuid: user_uuid!, channel: NotificationChannelTypes.telegram },
      {
        onSuccess: (data: NotificationChannel[]) => {
          toast({
            title: "Bot connected",
            description: "You have successfully connected the bot",
          });
          setBotConnected(data[0].verified);
          setTelegramEnabled(data[0].enabled);
        },
        onError: () => {
          toast({
            title: "Failed to connect bot",
            description: "Please try again",
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
            setTelegramEnabled(enabled);
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

  const handleDeleteChannel = () => {
    if (telegramChannel && telegramChannel[0]) {
      deleteNotificationChannelMutation(telegramChannel[0].id.toString(), {
        onSuccess: () => {
          setBotConnected(false);
          setTelegramEnabled(false);
          setShowDeleteDialog(false);
        },
      });
    }
  };

  if (isLoadingTelegramChannel) {
    return <SkeletonLoader className="h-full" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Telegram Notifications</h2>
        <p className="text-muted-foreground">Receive instant notifications through our Telegram bot for market updates and portfolio alerts.</p>
      </div>

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
                    5. Enter <code className="text-sm bg-muted px-2 py-1 rounded">/start {generatedCode}</code>
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

      <Separator />

      {botConnected && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Telegram Alert Types</CardTitle>
              <CardDescription>Choose what types of Telegram messages you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Portfolio updates</p>
                  <p className="text-sm text-muted-foreground">Real-time portfolio performance updates</p>
                </div>
                <Switch defaultChecked disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Price alerts</p>
                  <p className="text-sm text-muted-foreground">Significant price movements and trends</p>
                </div>
                <Switch defaultChecked disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Market news</p>
                  <p className="text-sm text-muted-foreground">Breaking news and market events</p>
                </div>
                <Switch disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Social sentiment</p>
                  <p className="text-sm text-muted-foreground">Social media sentiment analysis</p>
                </div>
                <Switch disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trading signals</p>
                  <p className="text-sm text-muted-foreground">AI-generated trading recommendations</p>
                </div>
                <Switch disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly reports</p>
                  <p className="text-sm text-muted-foreground">Comprehensive weekly market analysis</p>
                </div>
                <Switch disabled={!telegramEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bot Commands</CardTitle>
              <CardDescription>Available commands you can use in the Telegram chat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <code className="text-sm bg-muted px-2 py-1 rounded">/portfolio</code>
                  <span className="text-sm text-muted-foreground">View your portfolio</span>
                </div>
                <div className="flex justify-between items-center">
                  <code className="text-sm bg-muted px-2 py-1 rounded">/alerts</code>
                  <span className="text-sm text-muted-foreground">Manage your alerts</span>
                </div>
                <div className="flex justify-between items-center">
                  <code className="text-sm bg-muted px-2 py-1 rounded">/news</code>
                  <span className="text-sm text-muted-foreground">Latest market news</span>
                </div>
                <div className="flex justify-between items-center">
                  <code className="text-sm bg-muted px-2 py-1 rounded">/settings</code>
                  <span className="text-sm text-muted-foreground">Bot settings</span>
                </div>
                <div className="flex justify-between items-center">
                  <code className="text-sm bg-muted px-2 py-1 rounded">/help</code>
                  <span className="text-sm text-muted-foreground">Show all commands</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Frequency</CardTitle>
              <CardDescription>Control how often you receive Telegram messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Real-time alerts</p>
                  <p className="text-sm text-muted-foreground">Messages sent immediately when events occur</p>
                </div>
                <Switch defaultChecked disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Hourly summaries</p>
                  <p className="text-sm text-muted-foreground">Consolidated updates every hour</p>
                </div>
                <Switch disabled={!telegramEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily digest</p>
                  <p className="text-sm text-muted-foreground">One message with all daily activity</p>
                </div>
                <Switch disabled={!telegramEnabled} />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Telegram Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Free messaging and notifications</li>
            <li>• Interactive bot commands</li>
            <li>• Rich media support (charts, images)</li>
            <li>• Cross-platform availability</li>
            <li>• End-to-end encryption</li>
          </ul>
        </CardContent>
      </Card>

      {botConnected && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Danger Zone</CardTitle>
            <CardDescription>Remove Telegram notification channel</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">This will permanently remove your Telegram notification channel. You will no longer receive notifications through Telegram.</p>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isDeletingNotificationChannel}>
              {isDeletingNotificationChannel ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <IconTrash className="h-4 w-4 mr-2" />
                  Remove Telegram Channel
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} title="Remove Telegram Channel" desc="Are you sure you want to remove your Telegram notification channel? This action cannot be undone and you will no longer receive notifications through Telegram." confirmText="Remove Channel" destructive isLoading={isDeletingNotificationChannel} handleConfirm={handleDeleteChannel} />
    </div>
  );
}
