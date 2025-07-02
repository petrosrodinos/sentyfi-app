import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconBrandDiscord, IconCheck, IconExternalLink, IconLink, IconServer, IconWebhook } from "@tabler/icons-react";

export default function DiscordNotifications() {
  const [server_joined, set_server_joined] = useState(false);
  const [webhook_configured, set_webhook_configured] = useState(false);
  const [webhook_url, set_webhook_url] = useState("");
  const [discord_enabled, set_discord_enabled] = useState(false);

  const join_server = () => {
    set_server_joined(true);
  };

  const configure_webhook = () => {
    if (webhook_url) {
      set_webhook_configured(true);
      set_discord_enabled(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Discord Notifications</h2>
        <p className="text-muted-foreground">Receive notifications in your Discord server through webhooks and our community server.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <IconBrandDiscord size={20} className="text-primary" />
            <CardTitle>Discord Server</CardTitle>
          </div>
          <CardDescription>Join our Discord community server for notifications and discussions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!server_joined ? (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-medium text-indigo-800 mb-2">Join our Discord server:</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Real-time market discussions</li>
                  <li>• Community alerts and insights</li>
                  <li>• Direct access to our team</li>
                  <li>• Exclusive trading signals</li>
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button onClick={join_server} className="flex-1">
                  <IconServer size={16} className="mr-2" />
                  Join Discord Server
                </Button>
                <Button variant="outline" className="flex-1">
                  <IconExternalLink size={16} className="mr-2" />
                  Open Discord
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Badge variant="default" className="flex items-center space-x-1 bg-indigo-100 text-indigo-800">
                <IconCheck size={12} />
                <span>Server joined</span>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <IconWebhook size={20} className="text-primary" />
            <CardTitle>Webhook Setup</CardTitle>
          </div>
          <CardDescription>Configure a webhook to send notifications to your own Discord server</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!webhook_configured ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input id="webhook" type="url" placeholder="https://discord.com/api/webhooks/..." value={webhook_url} onChange={(e) => set_webhook_url(e.target.value)} />
                <p className="text-xs text-muted-foreground">Create a webhook in your Discord server settings and paste the URL here.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">How to create a webhook:</h4>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. Go to your Discord server settings</li>
                  <li>2. Navigate to Integrations → Webhooks</li>
                  <li>3. Click "New Webhook"</li>
                  <li>4. Choose a channel and name</li>
                  <li>5. Copy the webhook URL</li>
                </ol>
              </div>

              <Button onClick={configure_webhook} className="w-full" disabled={!webhook_url}>
                <IconLink size={16} className="mr-2" />
                Configure Webhook
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Discord notifications</span>
                <Switch checked={discord_enabled} onCheckedChange={set_discord_enabled} />
              </div>
              <Badge variant="default" className="flex items-center space-x-1 bg-green-100 text-green-800">
                <IconCheck size={12} />
                <span>Webhook configured</span>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {webhook_configured && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Discord Alert Types</CardTitle>
              <CardDescription>Choose what types of Discord messages you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Portfolio updates</p>
                  <p className="text-sm text-muted-foreground">Real-time portfolio performance updates</p>
                </div>
                <Switch defaultChecked disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Price alerts</p>
                  <p className="text-sm text-muted-foreground">Significant price movements and trends</p>
                </div>
                <Switch defaultChecked disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Market news</p>
                  <p className="text-sm text-muted-foreground">Breaking news and market events</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Social sentiment</p>
                  <p className="text-sm text-muted-foreground">Social media sentiment analysis</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trading signals</p>
                  <p className="text-sm text-muted-foreground">AI-generated trading recommendations</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly reports</p>
                  <p className="text-sm text-muted-foreground">Comprehensive weekly market analysis</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Format</CardTitle>
              <CardDescription>Customize how notifications appear in Discord</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rich embeds</p>
                  <p className="text-sm text-muted-foreground">Use Discord embeds with colors and formatting</p>
                </div>
                <Switch defaultChecked disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Include charts</p>
                  <p className="text-sm text-muted-foreground">Attach price charts and graphs</p>
                </div>
                <Switch defaultChecked disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mention roles</p>
                  <p className="text-sm text-muted-foreground">Mention specific roles for urgent alerts</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Frequency</CardTitle>
              <CardDescription>Control how often you receive Discord notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Real-time alerts</p>
                  <p className="text-sm text-muted-foreground">Messages sent immediately when events occur</p>
                </div>
                <Switch defaultChecked disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Batched updates</p>
                  <p className="text-sm text-muted-foreground">Multiple alerts combined into one message</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily summary</p>
                  <p className="text-sm text-muted-foreground">One comprehensive message per day</p>
                </div>
                <Switch disabled={!discord_enabled} />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="bg-indigo-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-800">Discord Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>• Free notifications and community access</li>
            <li>• Rich message formatting and embeds</li>
            <li>• Role-based notifications</li>
            <li>• Community discussions and insights</li>
            <li>• Cross-platform availability</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
