import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IconCheck, IconX, IconSettings } from "@tabler/icons-react";
import { NotificationChannelTypes, type NotificationChannelData } from "../interfaces/notification-channels";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/routes/routes";

interface ChannelCardProps {
  channel: NotificationChannelData;
  on_channel_update: (updated_channel: NotificationChannelData) => void;
}

export function ChannelCard({ channel, on_channel_update }: ChannelCardProps) {
  const navigate = useNavigate();

  const handle_toggle_channel = () => {
    const updated_channel = { ...channel, enabled: !channel.enabled };
    on_channel_update(updated_channel);
  };

  const handle_setup_channel = () => {
    if (channel.type === NotificationChannelTypes.telegram) {
      navigate(Routes.notifications.telegram);
      return;
    }

    const updated_channel = {
      ...channel,
      requirements_met: true,
      action_required: null,
      setup_status: "fully_setup" as const,
    };
    on_channel_update(updated_channel);
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
    <Card className="hover:shadow-md transition-shadow">
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
                <Switch checked={channel.enabled} onCheckedChange={handle_toggle_channel} disabled={!channel.requirements_met} />
                <span className="text-sm font-medium">{channel.enabled ? "Enabled" : "Disabled"}</span>
              </div>

              {!channel.requirements_met && <p className="text-xs text-muted-foreground mt-1">Setup required</p>}
            </div>

            <Button variant="outline" size="sm" onClick={handle_setup_channel} disabled={channel.requirements_met}>
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
                  <Button size="sm" onClick={handle_setup_channel} className="w-full">
                    {channel.action_required}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
