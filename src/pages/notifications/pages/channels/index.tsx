import { Separator } from "@/components/ui/separator";
import { ChannelCard } from "./components/channel-card";
import { useNotificationChannelsData } from "./hooks/use-notification-channels-data";
import Loader from "@/components/ui/loader";

export default function NotificationChannels() {
  const { notificationChannels, isLoading } = useNotificationChannelsData();

  if (isLoading) return <Loader length={4} />;

  const activeChannels = notificationChannels?.filter((c) => c.enabled && c.verified).length || 0;
  const setupRequired = notificationChannels?.filter((c) => !c.verified).length || 0;
  const totalChannels = notificationChannels?.length || 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Notification Channels</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Manage all your notification channels and their settings.</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {notificationChannels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      <Separator className="my-4 sm:my-6" />

      <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
        <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Notification Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-background/50 rounded-md">
            <span className="text-muted-foreground text-xs sm:text-sm">Active channels:</span>
            <span className="font-medium text-base sm:text-lg text-green-600">{activeChannels}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-background/50 rounded-md">
            <span className="text-muted-foreground text-xs sm:text-sm">Setup required:</span>
            <span className="font-medium text-base sm:text-lg text-orange-600">{setupRequired}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-background/50 rounded-md sm:col-span-2 lg:col-span-1">
            <span className="text-muted-foreground text-xs sm:text-sm">Total channels:</span>
            <span className="font-medium text-base sm:text-lg">{totalChannels}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
