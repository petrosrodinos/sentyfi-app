import { AlertTriangle } from "lucide-react";
import { useApolloQuery } from "@/hooks/graphql/use-apollo";
import type { UserDashboardResponse } from "@/features/dashboard/interfaces/dashboard";
import { GET_USER_DASHBOARD } from "@/features/dashboard/queries/dashboard.queries";
import { calculateSentimentData, calculateSeverityData, calculateTrackedAssets, calculateRecentAlerts } from "./utils/dashboard-utils";
import { QuickStats } from "./components/quick-stats";
import { TrackedAssets } from "./components/tracked-assets";
import { SentimentOverview } from "./components/sentiment-overview";
import { RecentAlerts } from "./components/recent-alerts";
import { ActionCards } from "./components/action-cards";
import { DashboardSkeleton } from "./components/dashboard-skeleton";

export default function Dashboard() {
  const { data: dashboardResponse, isLoading, error } = useApolloQuery(GET_USER_DASHBOARD, {}) as { data: UserDashboardResponse | undefined; isLoading: boolean; error: any };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground">Failed to load dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const userData = dashboardResponse?.user;
  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Data Available</h2>
          <p className="text-muted-foreground">No dashboard data found. Start by adding some tracked items.</p>
        </div>
      </div>
    );
  }

  const alerts = userData.alerts || [];
  const trackedItems = userData.tracked_items || [];
  const mediaSubscriptions = userData.media_subscriptions || [];
  const notificationChannels = userData.notification_channels || [];

  const sentimentData = calculateSentimentData(alerts);
  const severityData = calculateSeverityData(alerts);
  const trackedAssets = calculateTrackedAssets(trackedItems, alerts);
  const recentAlerts = calculateRecentAlerts(alerts);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Sentyfi Dashboard</h1>
          <p className="text-muted-foreground mt-2">Real-time sentiment analysis for your portfolio assets</p>
        </div>

        <QuickStats mediaSubscriptionsCount={mediaSubscriptions.length} trackedItemsCount={trackedItems.length} notificationChannelsCount={notificationChannels.length} totalAlertsCount={userData.counts.user_alerts_count} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SentimentOverview sentimentData={sentimentData} severityData={severityData} />
          <TrackedAssets trackedAssets={trackedAssets} />
        </div>

        <RecentAlerts recentAlerts={recentAlerts} trackedItems={trackedItems} />
        <ActionCards />
      </div>
    </div>
  );
}
