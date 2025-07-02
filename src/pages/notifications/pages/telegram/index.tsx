import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconBrandTelegram, IconCheck, IconExternalLink, IconQrcode, IconBolt } from "@tabler/icons-react";

export default function TelegramNotifications() {
  const [bot_connected, set_bot_connected] = useState(false);
  const [telegram_enabled, set_telegram_enabled] = useState(false);

  const connect_bot = () => {
    set_bot_connected(true);
    set_telegram_enabled(true);
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
          <CardDescription>Connect to our Telegram bot to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!bot_connected ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">How to connect:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Open Telegram on your phone or desktop</li>
                  <li>2. Search for our bot: @SentyfiBot</li>
                  <li>3. Click "Start" to begin the conversation</li>
                  <li>4. Follow the setup instructions in the chat</li>
                  <li>5. Use the command /connect to link your account</li>
                </ol>
              </div>

              <div className="flex space-x-2">
                <Button onClick={connect_bot} className="flex-1">
                  <IconBolt size={16} className="mr-2" />
                  I've Connected the Bot
                </Button>
                <Button variant="outline" className="flex-1">
                  <IconExternalLink size={16} className="mr-2" />
                  Open Telegram
                </Button>
              </div>
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
