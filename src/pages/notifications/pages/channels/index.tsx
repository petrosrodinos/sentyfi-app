import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ChannelCard } from "../../components/channel-card";
import { type NotificationChannelData } from "../../interfaces/notification-channels";
import { useNotificationChannels } from "../../hooks/use-notification-channels";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelsData } from "./data";
import SkeletonLoader from "../../components/skeleton-loader";

export default function NotificationChannels() {
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannelData[]>(NotificationChannelsData);

  const { user_uuid } = useAuthStore();

  const { data, isLoading } = useNotificationChannels({ user_uuid: user_uuid! });

  useEffect(() => {
    if (data?.length) {
      const channels = NotificationChannelsData.map((channel) => {
        const channel_data = data.find((c) => c.channel === channel.channel);
        if (!channel_data) {
          return channel;
        }
        return {
          ...channel,
          id: channel_data.id,
          enabled: channel_data.enabled,
          verified: channel_data.verified,
          setup_status: channel_data.verified ? "fully_setup" : "not_setup",
        };
      });
      console.log("channels", channels);
      setNotificationChannels(channels as unknown as NotificationChannelData[]);
    }
  }, [data]);

  if (isLoading) return <SkeletonLoader className="h-full" />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notification Channels</h2>
        <p className="text-muted-foreground">Manage all your notification channels and their settings.</p>
      </div>

      <div className="space-y-4">
        {notificationChannels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      <Separator />

      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Notification Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Active channels:</span>
            <span className="ml-2 font-medium">{notificationChannels?.filter((c) => c.enabled && c.verified).length || 0}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Setup required:</span>
            <span className="ml-2 font-medium">{notificationChannels?.filter((c) => !c.verified).length || 0}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total channels:</span>
            <span className="ml-2 font-medium">{notificationChannels?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
