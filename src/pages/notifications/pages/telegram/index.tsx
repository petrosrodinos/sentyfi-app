import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconBrandTelegram, IconCheck, IconBolt, IconCopy, IconRefresh } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";

export default function TelegramNotifications() {
  const [bot_connected, set_bot_connected] = useState(false);
  const [telegram_enabled, set_telegram_enabled] = useState(false);
  const [generated_code, set_generated_code] = useState<string | null>(null);
  const [is_generating, set_is_generating] = useState(false);

  const generate_code = async () => {
    set_is_generating(true);
    try {
      // Simulate API call to generate code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      set_generated_code(code);
      toast({
        title: "Code generated",
        description: "Copy the code and enter it in the Telegram bot",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
    } finally {
      set_is_generating(false);
    }
  };

  const copy_code = async () => {
    if (generated_code) {
      try {
        await navigator.clipboard.writeText(generated_code);
        toast({
          title: "Code copied",
          description: "Code copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy code",
          variant: "destructive",
        });
      }
    }
  };

  const connect_bot = () => {
    set_bot_connected(true);
    set_telegram_enabled(true);
    set_generated_code(null);
    toast({
      title: "Bot connected",
      description: "Your Telegram bot is now connected",
    });
  };

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
          <CardDescription>Generate a code to connect to our Telegram bot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!bot_connected ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">How to connect:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Click "Generate Code" below</li>
                  <li>2. Copy the generated code</li>
                  <li>3. Open Telegram and search for @SentyfiBot</li>
                  <li>4. Start a conversation with the bot</li>
                  <li>5. Enter the code when prompted</li>
                  <li>6. Click "I've Connected" once done</li>
                </ol>
              </div>

              {!generated_code ? (
                <Button onClick={generate_code} disabled={is_generating} className="w-full">
                  {is_generating ? (
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
                        <p className="text-2xl font-mono font-bold tracking-wider">{generated_code}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={copy_code} className="ml-2">
                        <IconCopy size={16} className="mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={connect_bot} className="flex-1">
                      <IconCheck size={16} className="mr-2" />
                      I've Connected the Bot
                    </Button>
                    <Button variant="outline" onClick={generate_code} disabled={is_generating} className="flex-1">
                      {is_generating ? (
                        <>
                          <IconRefresh size={16} className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <IconRefresh size={16} className="mr-2" />
                          Generate New Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Telegram notifications</span>
                <Switch checked={telegram_enabled} onCheckedChange={set_telegram_enabled} />
              </div>
              <Badge variant="default" className="flex items-center space-x-1 bg-blue-100 text-blue-800">
                <IconCheck size={12} />
                <span>Bot connected</span>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {bot_connected && (
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
                <Switch defaultChecked disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Price alerts</p>
                  <p className="text-sm text-muted-foreground">Significant price movements and trends</p>
                </div>
                <Switch defaultChecked disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Market news</p>
                  <p className="text-sm text-muted-foreground">Breaking news and market events</p>
                </div>
                <Switch disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Social sentiment</p>
                  <p className="text-sm text-muted-foreground">Social media sentiment analysis</p>
                </div>
                <Switch disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trading signals</p>
                  <p className="text-sm text-muted-foreground">AI-generated trading recommendations</p>
                </div>
                <Switch disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly reports</p>
                  <p className="text-sm text-muted-foreground">Comprehensive weekly market analysis</p>
                </div>
                <Switch disabled={!telegram_enabled} />
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
                <Switch defaultChecked disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Hourly summaries</p>
                  <p className="text-sm text-muted-foreground">Consolidated updates every hour</p>
                </div>
                <Switch disabled={!telegram_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily digest</p>
                  <p className="text-sm text-muted-foreground">One message with all daily activity</p>
                </div>
                <Switch disabled={!telegram_enabled} />
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
    </div>
  );
}
