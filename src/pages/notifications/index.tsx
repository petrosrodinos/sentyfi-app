import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { IconBell, IconMail, IconMessageCircle, IconBrandWhatsapp, IconBrandTelegram, IconBrandDiscord, IconPhone, IconSettings, IconCheck, IconX } from "@tabler/icons-react";

interface NotificationChannel {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  requirements: string[];
  requirements_met: boolean;
  action_required: string | null;
  setup_status: "not_setup" | "partially_setup" | "fully_setup";
  last_used?: string;
  notification_count?: number;
}

export default function NotificationsList() {
  const [notification_channels, set_notification_channels] = useState<NotificationChannel[]>([
    {
      id: "push",
      title: "Push Notifications",
      description: "Receive instant notifications on your device",
      icon: <IconBell size={20} />,
      enabled: false,
      requirements: ["Download mobile app", "Accept push notification permissions"],
      requirements_met: false,
      action_required: "Download app and enable notifications",
      setup_status: "not_setup",
    },
    {
      id: "web",
      title: "Web Notifications",
      description: "Get browser notifications when you're online",
      icon: <IconBell size={20} />,
      enabled: true,
      requirements: ["Enable browser notifications", "Stay on website"],
      requirements_met: true,
      action_required: null,
      setup_status: "fully_setup",
      last_used: "2 hours ago",
      notification_count: 12,
    },
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive detailed notifications via email",
      icon: <IconMail size={20} />,
      enabled: true,
      requirements: ["Verify email address", "Check spam folder"],
      requirements_met: true,
      action_required: null,
      setup_status: "fully_setup",
      last_used: "1 day ago",
      notification_count: 5,
    },
    {
      id: "sms",
      title: "SMS Notifications",
      description: "Get text message alerts on your phone",
      icon: <IconMessageCircle size={20} />,
      enabled: false,
      requirements: ["Verify phone number", "Standard SMS rates apply"],
      requirements_met: true,
      action_required: null,
      setup_status: "partially_setup",
    },
    {
      id: "whatsapp",
      title: "WhatsApp Notifications",
      description: "Receive notifications via WhatsApp",
      icon: <IconBrandWhatsapp size={20} />,
      enabled: false,
      requirements: ["Verify phone number", "Have WhatsApp installed"],
      requirements_met: false,
      action_required: "Verify phone and connect WhatsApp",
      setup_status: "not_setup",
    },
    {
      id: "telegram",
      title: "Telegram Notifications",
      description: "Get notifications through Telegram bot",
      icon: <IconBrandTelegram size={20} />,
      enabled: false,
      requirements: ["Start bot conversation", "Have Telegram installed"],
      requirements_met: false,
      action_required: "Start conversation with our bot",
      setup_status: "not_setup",
    },
    {
      id: "discord",
      title: "Discord Notifications",
      description: "Receive alerts in your Discord server",
      icon: <IconBrandDiscord size={20} />,
      enabled: false,
      requirements: ["Join our Discord server", "Configure webhook"],
      requirements_met: false,
      action_required: "Join Discord server and configure",
      setup_status: "not_setup",
    },
    {
      id: "phone_call",
      title: "Phone Call Alerts",
      description: "Get urgent notifications via phone calls",
      icon: <IconPhone size={20} />,
      enabled: false,
      requirements: ["Verify phone number", "Premium feature"],
      requirements_met: false,
      action_required: "Upgrade to premium and verify phone",
      setup_status: "not_setup",
    },
  ]);

  const handle_toggle_channel = (channel_id: string) => {
    set_notification_channels((prev) => prev.map((channel) => (channel.id === channel_id ? { ...channel, enabled: !channel.enabled } : channel)));
  };

  const handle_setup_channel = (channel_id: string) => {
    set_notification_channels((prev) =>
      prev.map((channel) =>
        channel.id === channel_id
          ? {
              ...channel,
              requirements_met: true,
              action_required: null,
              setup_status: "fully_setup" as const,
            }
          : channel
      )
    );
  };

  const get_setup_status_badge = (status: string) => {
    switch (status) {
      case "fully_setup":
        return (
          <Badge variant="default" className="text-xs">
            <IconCheck size={12} className="mr-1" />
            Setup
          </Badge>
        );
      case "partially_setup":
        return (
          <Badge variant="secondary" className="text-xs">
            <IconSettings size={12} className="mr-1" />
            Partial
          </Badge>
        );
      case "not_setup":
        return (
          <Badge variant="destructive" className="text-xs">
            <IconX size={12} className="mr-1" />
            Not Setup
          </Badge>
        );
      default:
        return null;
    }
  };

  const get_status_color = (status: string) => {
    switch (status) {
      case "fully_setup":
        return "text-green-600";
      case "partially_setup":
        return "text-yellow-600";
      case "not_setup":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notification Channels</h2>
        <p className="text-muted-foreground">Manage all your notification channels and their settings.</p>
      </div>

      <div className="space-y-4">
        {notification_channels.map((channel) => (
          <Card key={channel.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">{channel.icon}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-lg truncate">{channel.title}</h3>
                      {get_setup_status_badge(channel.setup_status)}
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {channel.last_used && <span>Last used: {channel.last_used}</span>}
                      {channel.notification_count !== undefined && <span>{channel.notification_count} notifications sent</span>}
                      {!channel.requirements_met && <span className={get_status_color(channel.setup_status)}>{channel.requirements.length} requirements pending</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Switch checked={channel.enabled} onCheckedChange={() => handle_toggle_channel(channel.id)} disabled={!channel.requirements_met} />
                      <span className="text-sm font-medium">{channel.enabled ? "Enabled" : "Disabled"}</span>
                    </div>

                    {!channel.requirements_met && <p className="text-xs text-muted-foreground mt-1">Setup required</p>}
                  </div>

                  <Button variant="outline" size="sm" onClick={() => handle_setup_channel(channel.id)} disabled={channel.requirements_met}>
                    <IconSettings size={16} className="mr-2" />
                    {channel.requirements_met ? "Configure" : "Setup"}
                  </Button>
                </div>
              </div>

              {!channel.requirements_met && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="text-xs">
                        Setup Required
                      </Badge>
                    </div>

                    <ul className="text-sm text-muted-foreground space-y-1">
                      {channel.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>

                    {channel.action_required && (
                      <div className="pt-2">
                        <Button size="sm" onClick={() => handle_setup_channel(channel.id)} className="w-full">
                          {channel.action_required}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Notification Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Active channels:</span>
            <span className="ml-2 font-medium">{notification_channels.filter((c) => c.enabled && c.requirements_met).length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Setup required:</span>
            <span className="ml-2 font-medium">{notification_channels.filter((c) => !c.requirements_met).length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total channels:</span>
            <span className="ml-2 font-medium">{notification_channels.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
