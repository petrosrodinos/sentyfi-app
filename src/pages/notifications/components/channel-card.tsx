import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IconCheck, IconX, IconSettings } from "@tabler/icons-react";
import { type NotificationChannelData } from "../interfaces/notification-channels";
import { useNavigate } from "react-router-dom";
import { useUpdateNotificationChannel } from "../hooks/use-notification-channels";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface ChannelCardProps {
  channel: NotificationChannelData;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateNotificationChannelMutation, isPending: isUpdatingNotificationChannel } = useUpdateNotificationChannel();

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
