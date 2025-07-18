import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Bell, Twitter, DollarSign, AlertTriangle, Loader2, Search } from "lucide-react";
import { useApolloQuery } from "@/hooks/graphql/use-apollo";
import type { UserDashboardResponse } from "@/features/dashboard/interfaces/dashboard";
import { GET_USER_DASHBOARD } from "@/features/dashboard/queries/dashboard.queries";
import { Routes } from "@/routes/routes";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrackedItemTypes } from "@/features/tracking/interfaces/tracked-items";

export default function Dashboard() {
  const { data: dashboardResponse, isLoading, error } = useApolloQuery(GET_USER_DASHBOARD, {}) as { data: UserDashboardResponse | undefined; isLoading: boolean; error: any };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
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

  const sentimentData = alerts.reduce(
    (acc, alert) => {
      const sentiment = alert.alert?.sentiment;
      if (sentiment && (sentiment === "positive" || sentiment === "negative" || sentiment === "neutral")) {
        acc[sentiment]++;
        acc.total++;
      }
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0, total: 0 }
  );

  const severityData = alerts.reduce(
    (acc, alert) => {
      const severity = alert.alert?.severity;
      if (severity && (severity === "low" || severity === "medium" || severity === "high")) {
        acc[severity]++;
        acc.total++;
      }
      return acc;
    },
    { low: 0, medium: 0, high: 0, total: 0 }
  );

  const sentimentPercentages = {
    positive: sentimentData.total > 0 ? Math.round((sentimentData.positive / sentimentData.total) * 100) : 0,
    negative: sentimentData.total > 0 ? Math.round((sentimentData.negative / sentimentData.total) * 100) : 0,
    neutral: sentimentData.total > 0 ? Math.round((sentimentData.neutral / sentimentData.total) * 100) : 0,
    total_mentions: sentimentData.total,
  };

  const severityPercentages = {
    low: severityData.total > 0 ? Math.round((severityData.low / severityData.total) * 100) : 0,
    medium: severityData.total > 0 ? Math.round((severityData.medium / severityData.total) * 100) : 0,
    high: severityData.total > 0 ? Math.round((severityData.high / severityData.total) * 100) : 0,
    total: severityData.total,
  };

  const trackedAssets = trackedItems.map((item) => {
    const assetTicker = item.item_identifier || "N/A";

    const assetAlerts = alerts.filter((alert) => alert.alert?.tickers?.some((ticker) => ticker.ticker === assetTicker));

    const sentimentCounts = assetAlerts.reduce(
      (acc, alert) => {
        const sentiment = alert.alert?.sentiment;
        if (sentiment && (sentiment === "positive" || sentiment === "negative" || sentiment === "neutral")) {
          acc[sentiment]++;
          acc.total++;
        }
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0, total: 0 }
    );

    const severityCounts = assetAlerts.reduce(
      (acc, alert) => {
        const severity = alert.alert?.severity;
        if (severity && (severity === "low" || severity === "medium" || severity === "high")) {
          acc[severity]++;
          acc.total++;
        }
        return acc;
      },
      { low: 0, medium: 0, high: 0, total: 0 }
    );

    const dominantSentiment =
      sentimentCounts.total > 0
        ? (Object.entries(sentimentCounts)
            .filter(([key]) => key !== "total")
            .sort(([, a], [, b]) => b - a)[0][0] as "positive" | "negative" | "neutral")
        : "neutral";

    const dominantSeverity =
      severityCounts.total > 0
        ? (Object.entries(severityCounts)
            .filter(([key]) => key !== "total")
            .sort(([, a], [, b]) => b - a)[0][0] as "low" | "medium" | "high")
        : "low";

    const sentimentPercentage = sentimentCounts.total > 0 ? Math.round((sentimentCounts[dominantSentiment as keyof typeof sentimentCounts] / sentimentCounts.total) * 100) : 0;

    const severityPercentage = severityCounts.total > 0 ? Math.round((severityCounts[dominantSeverity as keyof typeof severityCounts] / severityCounts.total) * 100) : 0;

    return {
      ticker: assetTicker,
      name: item?.meta?.name,
      sentiment: dominantSentiment,
      severity: dominantSeverity,
      sentimentPercentage,
      severityPercentage,
      alertCount: assetAlerts.length,
      type: item.item_type,
    };
  });

  const recentAlerts = alerts.slice(0, 5).map((alert) => ({
    type: alert.alert?.severity || "medium",
    tickers: alert.alert?.tickers,
    message: alert.alert?.title,
    time: new Date(alert.created_at).toLocaleTimeString(),
    sentiment: alert.alert?.sentiment,
  }));

  const quickStats = [
    {
      title: "Active Subscriptions",
      value: mediaSubscriptions.length.toString(),
      icon: Search,
    },
    {
      title: "Tracked Assets",
      value: trackedItems.length.toString(),
      icon: DollarSign,
    },
    {
      title: "Notification Channels",
      value: notificationChannels.length.toString(),
      icon: Bell,
    },
    {
      title: "Total Alerts",
      value: userData.counts.user_alerts_count.toString(),
      icon: Twitter,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Sentyfi Dashboard</h1>
          <p className="text-muted-foreground mt-2">Real-time sentiment analysis for your portfolio assets</p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
              <Activity className="h-5 w-5 mr-2" />
              Sentiment & Severity Overview
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Sentiment</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Positive</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentimentPercentages.positive}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{sentimentPercentages.positive}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Negative</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentimentPercentages.negative}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{sentimentPercentages.negative}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Neutral</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-gray-400 dark:bg-gray-500 h-2 rounded-full" style={{ width: `${sentimentPercentages.neutral}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{sentimentPercentages.neutral}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Severity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">High</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${severityPercentages.high}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{severityPercentages.high}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Medium</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${severityPercentages.medium}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{severityPercentages.medium}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Low</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: `${severityPercentages.low}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{severityPercentages.low}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Total mentions: <span className="font-medium text-foreground">{sentimentPercentages.total_mentions}</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
              <DollarSign className="h-5 w-5 mr-2" />
              Tracked Assets
            </h3>
            <div className="space-y-3">
              {trackedAssets.length > 0 ? (
                <div className="h-[300px] overflow-y-auto pr-2">
                  {trackedAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              {(asset.type === TrackedItemTypes.stock || asset.type === TrackedItemTypes.commodity) && (
                                <>
                                  <AvatarImage src={`https://assets.parqet.com/logos/symbol/${asset.ticker}`} alt={asset.ticker} />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{asset.ticker}</AvatarFallback>
                                </>
                              )}
                              {asset.type === TrackedItemTypes.crypto && (
                                <>
                                  <AvatarImage src={`/node_modules/cryptocurrency-icons/svg/color/${asset.ticker.toLowerCase()}.svg`} alt={asset.ticker} />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{asset.ticker}</AvatarFallback>
                                </>
                              )}
                            </Avatar>
                            {asset.type === TrackedItemTypes.keyword && (
                              <>
                                <span className="font-medium">{asset.ticker}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{asset.name || asset.ticker}</p>
                          <p className="text-sm text-muted-foreground">{asset.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant={asset.sentiment === "positive" ? "default" : asset.sentiment === "negative" ? "destructive" : "secondary"} className="text-xs">
                              {asset.sentiment}
                            </Badge>
                            <Badge variant={asset.severity === "high" ? "destructive" : asset.severity === "medium" ? "default" : "secondary"} className="text-xs">
                              {asset.severity}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Alerts</div>
                          <div className="text-sm font-medium text-foreground">{asset.alertCount}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No tracked assets yet</p>
                  <p className="text-sm text-muted-foreground">Start tracking cryptocurrencies, stocks, or keywords</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link to={Routes.tracking.stocks}>Add Assets</Link>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                      <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.sentiment === "positive" ? "default" : alert.sentiment === "negative" ? "destructive" : "secondary"}>{alert.sentiment}</Badge>
                    {alert.tickers
                      ?.filter((ticker) => trackedItems.some((item) => item.item_identifier === ticker.ticker))
                      .map((ticker) => {
                        return <Badge variant="outline">{ticker.ticker}</Badge>;
                      })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent alerts</p>
                <p className="text-sm text-muted-foreground">Alerts will appear here when sentiment changes are detected</p>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Add Asset</h3>
            <p className="text-muted-foreground mb-4">Track new cryptocurrency or stock for sentiment analysis</p>
            <Button className="w-full" asChild>
              <Link to={Routes.tracking.stocks}>Add New Asset</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Manage Subscriptions</h3>
            <p className="text-muted-foreground mb-4">Configure Twitter accounts and keywords to monitor</p>
            <Button variant="outline" className="w-full" asChild>
              <Link to={Routes.media.twitter}>View Subscriptions</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Notification Settings</h3>
            <p className="text-muted-foreground mb-4">Customize your alert preferences and delivery methods</p>
            <Button variant="outline" className="w-full" asChild>
              <Link to={Routes.notifications.root}>Configure Alerts</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
