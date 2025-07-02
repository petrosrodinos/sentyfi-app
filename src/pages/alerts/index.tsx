import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, MessageSquare, Phone, ExternalLink, Filter, Search, Twitter, Youtube, Globe, TrendingUp, TrendingDown, AlertTriangle, Info, Clock } from "lucide-react";

export default function Alerts() {
  // Mock alerts data - in real app this would come from API
  const alerts = [
    {
      id: 1,
      type: "sentiment_shift",
      severity: "high",
      ticker: "BTC",
      asset_name: "Bitcoin",
      message: "Strong negative sentiment detected from crypto influencers",
      social_media: {
        platform: "twitter",
        url: "https://twitter.com/elonmusk/status/123456789",
        author: "@elonmusk",
        content: "Bitcoin looking bearish today...",
        timestamp: "2024-01-15T10:30:00Z",
      },
      notification_channels: ["email", "push"],
      price_impact: "-5.2%",
      mentions_count: 234,
      created_at: "2024-01-15T10:35:00Z",
      read: false,
    },
    {
      id: 2,
      type: "volume_spike",
      severity: "medium",
      ticker: "ETH",
      asset_name: "Ethereum",
      message: "Unusual trading volume spike detected",
      social_media: {
        platform: "reddit",
        url: "https://reddit.com/r/cryptocurrency/comments/123456",
        author: "u/crypto_analyst",
        content: "ETH volume is insane right now!",
        timestamp: "2024-01-15T09:15:00Z",
      },
      notification_channels: ["push", "sms"],
      price_impact: "+3.8%",
      mentions_count: 156,
      created_at: "2024-01-15T09:20:00Z",
      read: true,
    },
    {
      id: 3,
      type: "news_impact",
      severity: "high",
      ticker: "TSLA",
      asset_name: "Tesla",
      message: "Breaking news affecting Tesla stock sentiment",
      social_media: {
        platform: "news",
        url: "https://reuters.com/article/tesla-earnings",
        author: "Reuters",
        content: "Tesla Q4 earnings beat expectations",
        timestamp: "2024-01-15T08:45:00Z",
      },
      notification_channels: ["email", "push", "telegram"],
      price_impact: "+7.1%",
      mentions_count: 892,
      created_at: "2024-01-15T08:50:00Z",
      read: false,
    },
    {
      id: 4,
      type: "influencer_mention",
      severity: "medium",
      ticker: "AAPL",
      asset_name: "Apple",
      message: "Major influencer mentioned Apple in positive context",
      social_media: {
        platform: "youtube",
        url: "https://youtube.com/watch?v=123456",
        author: "TechReview Channel",
        content: "Apple's new product line is revolutionary",
        timestamp: "2024-01-15T07:30:00Z",
      },
      notification_channels: ["push"],
      price_impact: "+1.2%",
      mentions_count: 67,
      created_at: "2024-01-15T07:35:00Z",
      read: true,
    },
    {
      id: 5,
      type: "sentiment_shift",
      severity: "low",
      ticker: "NVDA",
      asset_name: "NVIDIA",
      message: "Gradual shift toward positive sentiment detected",
      social_media: {
        platform: "twitter",
        url: "https://twitter.com/tech_analyst/status/123456",
        author: "@tech_analyst",
        content: "NVDA's AI capabilities are impressive",
        timestamp: "2024-01-15T06:20:00Z",
      },
      notification_channels: ["email"],
      price_impact: "+0.8%",
      mentions_count: 45,
      created_at: "2024-01-15T06:25:00Z",
      read: true,
    },
  ];

  const get_platform_icon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return Twitter;
      case "youtube":
        return Youtube;
      case "reddit":
        return Globe;
      case "news":
        return Globe;
      default:
        return Globe;
    }
  };

  const get_platform_color = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "text-blue-500";
      case "youtube":
        return "text-red-500";
      case "reddit":
        return "text-orange-500";
      case "news":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const get_channel_icon = (channel: string) => {
    switch (channel) {
      case "email":
        return Mail;
      case "push":
        return Bell;
      case "sms":
        return MessageSquare;
      case "phone":
        return Phone;
      case "telegram":
        return MessageSquare;
      case "discord":
        return MessageSquare;
      case "whatsapp":
        return MessageSquare;
      default:
        return Bell;
    }
  };

  const get_severity_color = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const get_type_icon = (type: string) => {
    switch (type) {
      case "sentiment_shift":
        return TrendingUp;
      case "volume_spike":
        return TrendingDown;
      case "news_impact":
        return AlertTriangle;
      case "influencer_mention":
        return Info;
      default:
        return Bell;
    }
  };

  const format_time = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff_in_minutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diff_in_minutes < 1) return "Just now";
    if (diff_in_minutes < 60) return `${diff_in_minutes}m ago`;
    if (diff_in_minutes < 1440) return `${Math.floor(diff_in_minutes / 60)}h ago`;
    return `${Math.floor(diff_in_minutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600 mt-2">Monitor all your portfolio alerts and notifications</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search alerts..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sentiment_shift">Sentiment Shift</SelectItem>
                  <SelectItem value="volume_spike">Volume Spike</SelectItem>
                  <SelectItem value="news_impact">News Impact</SelectItem>
                  <SelectItem value="influencer_mention">Influencer Mention</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const PlatformIcon = get_platform_icon(alert.social_media.platform);
            const TypeIcon = get_type_icon(alert.type);

            return (
              <Card key={alert.id} className={`p-6 ${!alert.read ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-5 w-5 text-gray-600" />
                        <Badge variant={get_severity_color(alert.severity)}>{alert.severity}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-sm">{alert.ticker}</span>
                        </div>
                        <span className="font-medium">{alert.asset_name}</span>
                      </div>
                      <span className={`text-sm font-medium ${alert.price_impact.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{alert.price_impact}</span>
                    </div>

                    <p className="text-gray-900 mb-3">{alert.message}</p>

                    {/* Social Media Source */}
                    <div className="flex items-center gap-2 mb-3 p-3 bg-gray-100 rounded-lg">
                      <PlatformIcon className={`h-4 w-4 ${get_platform_color(alert.social_media.platform)}`} />
                      <span className="text-sm font-medium">{alert.social_media.author}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{alert.social_media.content.substring(0, 50)}...</span>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Notification Channels */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">Notified via:</span>
                      {alert.notification_channels.map((channel, index) => {
                        const ChannelIcon = get_channel_icon(channel);
                        return (
                          <div key={index} className="flex items-center gap-1">
                            <ChannelIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600 capitalize">{channel}</span>
                            {index < alert.notification_channels.length - 1 && <span className="text-gray-400">•</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format_time(alert.created_at)}
                      </div>
                      <span>{alert.mentions_count} mentions</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      Mark as {alert.read ? "Unread" : "Read"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">Load More Alerts</Button>
        </div>
      </div>
    </div>
  );
}
