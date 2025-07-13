import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IconCheck, IconX, IconSettings } from "@tabler/icons-react";
import { type NotificationChannelData, NotificationChannelTypes } from "../../../../../features/notifications/interfaces/notification-channels";
import { useNavigate } from "react-router-dom";
import { useUpdateNotificationChannel } from "../../../../../features/notifications/hooks/use-notification-channels";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface ChannelCardProps {
  channel: NotificationChannelData;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();

  const getChannelColor = (channelType?: string) => {
    switch (channelType) {
      case NotificationChannelTypes.telegram:
        return "bg-blue-500/10 text-blue-600";
      case NotificationChannelTypes.email:
        return "bg-red-500/10 text-red-600";
      case NotificationChannelTypes.sms:
        return "bg-green-500/10 text-green-600";
      case NotificationChannelTypes.push:
        return "bg-purple-500/10 text-purple-600";
      case NotificationChannelTypes.web:
        return "bg-orange-500/10 text-orange-600";
      case NotificationChannelTypes.whatsapp:
        return "bg-emerald-500/10 text-emerald-600";
      case NotificationChannelTypes.discord:
        return "bg-indigo-500/10 text-indigo-600";
      case NotificationChannelTypes.phone:
        return "bg-pink-500/10 text-pink-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const handleToggleChannel = () => {
    updateNotificationChannelMutation(
      { id: channel.id!, enabled: !channel.enabled },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notification-channels"] });
        },
      }
    );
  };

  const handleSetupChannel = () => {
    navigate(channel.url);
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
          <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 bg-orange-50">
            <IconX size={12} className="mr-1" />
            Not Setup
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${channel.disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getChannelColor(channel.channel)}`}>{channel.icon}</div>

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

            <Button variant="outline" size="sm" onClick={handleSetupChannel} disabled={channel.disabled}>
              <IconSettings size={16} className="mr-2" />
              {channel.verified ? "Configure" : "Setup"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
