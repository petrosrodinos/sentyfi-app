import { Card } from "@/components/ui/card";
import { IconAlertTriangle, IconChartLine } from "@tabler/icons-react";
import { Search, Bell } from "lucide-react";

interface QuickStatsProps {
  mediaSubscriptionsCount: number;
  trackedItemsCount: number;
  notificationChannelsCount: number;
  totalAlertsCount: number;
}

export function QuickStats({ mediaSubscriptionsCount, trackedItemsCount, notificationChannelsCount, totalAlertsCount }: QuickStatsProps) {
  const quickStats = [
    {
      title: "Total Alerts",
      value: totalAlertsCount.toString(),
      icon: IconAlertTriangle,
    },
    {
      title: "Active Subscriptions",
      value: mediaSubscriptionsCount.toString(),
      icon: Search,
    },
    {
      title: "Tracked Assets",
      value: trackedItemsCount.toString(),
      icon: IconChartLine,
    },
    {
      title: "Notification Channels",
      value: notificationChannelsCount.toString(),
      icon: Bell,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
            <stat.icon className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      ))}
    </div>
  );
}
