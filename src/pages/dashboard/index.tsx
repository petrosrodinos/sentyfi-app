import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, Bell, BarChart3, Twitter, DollarSign, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  // Mock data - in real app this would come from API
  const sentiment_data = {
    positive: 68,
    negative: 22,
    neutral: 10,
    total_mentions: 1247,
  };

  const tracked_assets = [
    { symbol: "BTC", name: "Bitcoin", sentiment: "positive", change: "+5.2%", mentions: 234 },
    { symbol: "ETH", name: "Ethereum", sentiment: "negative", change: "-2.1%", mentions: 189 },
    { symbol: "TSLA", name: "Tesla", sentiment: "positive", change: "+3.8%", mentions: 156 },
    { symbol: "AAPL", name: "Apple", sentiment: "neutral", change: "+0.5%", mentions: 98 },
  ];

  const recent_alerts = [
    { type: "sentiment", asset: "BTC", message: "Strong positive sentiment detected from crypto influencers", time: "2 min ago" },
    { type: "volume", asset: "ETH", message: "Unusual trading volume spike detected", time: "15 min ago" },
    { type: "news", asset: "TSLA", message: "Breaking news affecting Tesla stock sentiment", time: "1 hour ago" },
  ];

  const quick_stats = [
    { title: "Active Subscriptions", value: "24", icon: Bell, change: "+3", trend: "up" },
    { title: "Tracked Assets", value: "18", icon: DollarSign, change: "+2", trend: "up" },
    { title: "Total Mentions", value: "1,247", icon: Twitter, change: "+156", trend: "up" },
    { title: "Alert Accuracy", value: "94%", icon: BarChart3, change: "+2%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sentyfi Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time sentiment analysis for your portfolio assets</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quick_stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === "up" ? <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> : <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>{stat.change}</span>
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sentiment Overview */}
          <Card className="p-6 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Sentiment Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Positive</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentiment_data.positive}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{sentiment_data.positive}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Negative</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentiment_data.negative}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{sentiment_data.negative}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Neutral</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${sentiment_data.neutral}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{sentiment_data.neutral}%</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  Total mentions analyzed: <span className="font-medium">{sentiment_data.total_mentions}</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Tracked Assets */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Tracked Assets
            </h3>
            <div className="space-y-3">
              {tracked_assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="font-semibold text-sm">{asset.symbol}</span>
                    </div>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-600">{asset.mentions} mentions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={asset.sentiment === "positive" ? "default" : asset.sentiment === "negative" ? "destructive" : "secondary"}>{asset.sentiment}</Badge>
                    <span className={`text-sm font-medium ${asset.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{asset.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {recent_alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Bell className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                </div>
                <Badge variant="outline">{alert.asset}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add Asset</h3>
            <p className="text-gray-600 mb-4">Track new cryptocurrency or stock for sentiment analysis</p>
            <Button className="w-full">Add New Asset</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Manage Subscriptions</h3>
            <p className="text-gray-600 mb-4">Configure Twitter accounts and keywords to monitor</p>
            <Button variant="outline" className="w-full">
              View Subscriptions
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <p className="text-gray-600 mb-4">Customize your alert preferences and delivery methods</p>
            <Button variant="outline" className="w-full">
              Configure Alerts
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
