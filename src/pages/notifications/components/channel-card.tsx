import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IconCheck, IconX, IconSettings } from "@tabler/icons-react";
import { NotificationChannelTypes, type NotificationChannelData, type NotificationChannelType } from "../interfaces/notification-channels";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/routes/routes";
import { useUpdateNotificationChannel } from "../hooks/use-notification-channels";
import { Loader2 } from "lucide-react";

interface ChannelCardProps {
  channel: NotificationChannelData;
  on_channel_update: (updated_channel: NotificationChannelData) => void;
}

export function ChannelCard({ channel, on_channel_update }: ChannelCardProps) {
  const navigate = useNavigate();

  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();

  const channelsToSetup: Record<NotificationChannelType, string> = {
    [NotificationChannelTypes.telegram]: Routes.notifications.telegram,
    [NotificationChannelTypes.email]: Routes.notifications.email,
    [NotificationChannelTypes.phone]: Routes.notifications.phone,
    [NotificationChannelTypes.push]: Routes.notifications.push,
    [NotificationChannelTypes.sms]: Routes.notifications.sms,
    [NotificationChannelTypes.discord]: Routes.notifications.discord,
    [NotificationChannelTypes.web]: Routes.notifications.root,
    [NotificationChannelTypes.whatsapp]: Routes.notifications.whatsapp,
  };

  const handleToggleChannel = () => {
    updateNotificationChannelMutation(
      { id: channel.id!, enabled: !channel.enabled },
      {
        onSuccess: () => {
          on_channel_update({ ...channel, enabled: !channel.enabled });
        },
      }
    );
  };

  const handleSetupChannel = () => {
    if (channelsToSetup[channel.channel!]) {
      navigate(channelsToSetup[channel.channel!]);
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

  const getSetupStatusBadge = (status: string) => {
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
                {getSetupStatusBadge(channel.setup_status)}
              </div>

              <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">{channel.verified && <span>Verified</span>}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                {isUpdatingNotificationChannel ? <Loader2 className="h-4 w-4 animate-spin" /> : <Switch checked={channel.enabled} onCheckedChange={handleToggleChannel} disabled={!channel.verified} />}

                <span className="text-sm font-medium">{channel.enabled ? "Enabled" : "Disabled"}</span>
              </div>

              {!channel.verified && <p className="text-xs text-muted-foreground mt-1">Setup required</p>}
            </div>

            <Button variant="outline" size="sm" onClick={handleSetupChannel}>
              <IconSettings size={16} className="mr-2" />
              {channel.verified ? "Configure" : "Setup"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
