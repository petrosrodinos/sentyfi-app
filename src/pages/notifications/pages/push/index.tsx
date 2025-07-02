import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconBell, IconDownload, IconDeviceMobile, IconBrowser } from "@tabler/icons-react";

export default function PushNotifications() {
  const [mobile_app_installed, set_mobile_app_installed] = useState(false);
  const [browser_permissions_granted, set_browser_permissions_granted] = useState(false);
  const [push_enabled, set_push_enabled] = useState(false);

  const request_browser_permissions = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        set_browser_permissions_granted(true);
        set_push_enabled(true);
      }
    }
  };

  const download_mobile_app = () => {
    set_mobile_app_installed(true);
    set_push_enabled(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Push Notifications</h2>
        <p className="text-muted-foreground">Receive instant notifications on your devices when important market events occur.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <IconDeviceMobile size={20} className="text-primary" />
              <CardTitle>Mobile App</CardTitle>
            </div>
            <CardDescription>Get notifications on your mobile device</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mobile notifications</span>
              <Switch checked={mobile_app_installed && push_enabled} disabled={!mobile_app_installed} />
            </div>

            {!mobile_app_installed ? (
              <div className="space-y-3">
                <Badge variant="destructive">Requires mobile app</Badge>
                <Button onClick={download_mobile_app} className="w-full">
                  <IconDownload size={16} className="mr-2" />
                  Download Mobile App
                </Button>
              </div>
            ) : (
              <Badge variant="default">Mobile app installed</Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <IconBrowser size={20} className="text-primary" />
              <CardTitle>Browser Notifications</CardTitle>
            </div>
            <CardDescription>Get notifications in your web browser</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Browser notifications</span>
              <Switch checked={browser_permissions_granted && push_enabled} disabled={!browser_permissions_granted} />
            </div>

            {!browser_permissions_granted ? (
              <div className="space-y-3">
                <Badge variant="destructive">Permissions required</Badge>
                <Button onClick={request_browser_permissions} className="w-full">
                  <IconBell size={16} className="mr-2" />
                  Enable Browser Notifications
                </Button>
              </div>
            ) : (
              <Badge variant="default">Permissions granted</Badge>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Customize what types of notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Portfolio alerts</p>
              <p className="text-sm text-muted-foreground">Price changes and portfolio updates</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Market news</p>
              <p className="text-sm text-muted-foreground">Breaking news and market events</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Social sentiment alerts</p>
              <p className="text-sm text-muted-foreground">Significant social media sentiment changes</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Urgent notifications</p>
              <p className="text-sm text-muted-foreground">Critical market movements and alerts</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
