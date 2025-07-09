import { Separator } from "@/components/ui/separator";
import { ChannelCard } from "./components/channel-card";
import { useNotificationChannelsData } from "./hooks/use-notification-channels-data";
import Loader from "@/components/ui/loader";

export default function NotificationChannels() {
  const { notificationChannels, isLoading } = useNotificationChannelsData();

  if (isLoading) return <Loader length={4} />;

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
