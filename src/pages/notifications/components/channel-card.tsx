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
    if (channel.channel === NotificationChannelTypes.telegram) {
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

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">{channel.verified && <span>Verified</span>}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Switch checked={channel.enabled} onCheckedChange={handle_toggle_channel} disabled={!channel.verified} />
                <span className="text-sm font-medium">{channel.enabled ? "Enabled" : "Disabled"}</span>
              </div>

              {!channel.verified && <p className="text-xs text-muted-foreground mt-1">Setup required</p>}
            </div>

            <Button variant="outline" size="sm" onClick={handle_setup_channel} disabled={channel.verified}>
              <IconSettings size={16} className="mr-2" />
              {channel.verified ? "Configure" : "Setup"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
