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
          <Badge variant="default" className="text-[10px] px-1.5 py-0.5 h-5 flex items-center">
            <IconCheck size={10} className="mr-0.5" />
            Setup
          </Badge>
        );
      case "partially_setup":
        return (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 h-5 flex items-center">
            <IconSettings size={10} className="mr-0.5" />
            Partial
          </Badge>
        );
      case "not_setup":
        return (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-5 flex items-center text-orange-600 border-orange-200 bg-orange-50">
            <IconX size={10} className="mr-0.5" />
            Not Setup
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${channel.disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0 ${getChannelColor(channel.channel)}`}>{channel.icon}</div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col space-y-1 mb-2">
                <h3 className="font-semibold text-base sm:text-lg truncate">{channel.title}</h3>
                <div className="flex">{getSetupStatusBadge(channel.setup_status)}</div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{channel.description}</p>

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">{channel.verified && <span>Verified</span>}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center justify-between sm:justify-end sm:text-right">
              <div className="flex items-center space-x-2">
                {isUpdatingNotificationChannel ? <Loader2 className="h-4 w-4 animate-spin" /> : <Switch checked={channel.enabled} onCheckedChange={handleToggleChannel} disabled={!channel.verified} />}
                <span className="text-xs sm:text-sm font-medium">{channel.enabled ? "Enabled" : "Disabled"}</span>
              </div>
            </div>

            {!channel.verified && <p className="text-xs text-muted-foreground sm:hidden">Setup required</p>}

            <Button variant="outline" size="sm" onClick={handleSetupChannel} disabled={channel.disabled} className="w-full sm:w-auto">
              <IconSettings size={16} className="mr-2" />
              {channel.verified ? "Configure" : "Setup"}
            </Button>
          </div>
        </div>

        {!channel.verified && <p className="text-xs text-muted-foreground mt-2 sm:hidden">Setup required</p>}
      </CardContent>
    </Card>
  );
}
