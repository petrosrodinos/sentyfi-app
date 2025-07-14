import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { type AlertQuery, type AlertSentiment, type AlertSeverity } from "@/features/alert/interfaces/alert";
import { MediaSubscriptionPlatformTypes } from "@/features/media/interfaces/media-subscriptions";
import type { UserAlert } from "@/features/alert/interfaces/alert";
import type { TrackedItem } from "@/features/tracking/interfaces/tracked-items";

interface AlertFiltersProps {
  alerts: UserAlert[];
  trackedItems: TrackedItem[];
  alertFilters: AlertQuery;
  onAlertFiltersChange: (filters: AlertQuery) => void;
}

export function AlertFilters({ alerts, trackedItems, alertFilters, onAlertFiltersChange }: AlertFiltersProps) {
  return (
    <Card className="p-6 border-border shadow-sm bg-card">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-foreground">Filters</h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={alertFilters.severity || "all"} onValueChange={(value) => onAlertFiltersChange({ ...alertFilters, severity: value === "all" ? undefined : (value as AlertSeverity) })}>
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
          <Select value={alertFilters.sentiment || "all"} onValueChange={(value) => onAlertFiltersChange({ ...alertFilters, sentiment: value === "all" ? undefined : (value as AlertSentiment) })}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiments</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
          <Select value={alertFilters.platform_type || "all"} onValueChange={(value) => onAlertFiltersChange({ ...alertFilters, platform_type: value === "all" ? undefined : (value as any) })}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value={MediaSubscriptionPlatformTypes.twitter}>Twitter</SelectItem>
              <SelectItem value={MediaSubscriptionPlatformTypes.youtube}>YouTube</SelectItem>
              <SelectItem value={MediaSubscriptionPlatformTypes.reddit}>Reddit</SelectItem>
              <SelectItem value={MediaSubscriptionPlatformTypes.news}>News</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={alertFilters.account_identifier || "all"} onValueChange={(value) => onAlertFiltersChange({ ...alertFilters, account_identifier: value === "all" ? undefined : (value as string) })}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {alerts.map((alert) => (
                <SelectItem key={alert.alert.account_identifier} value={alert.alert.account_identifier}>
                  {alert.alert.account_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={Array.isArray(alertFilters.tickers) ? alertFilters.tickers[0] || "all" : alertFilters.tickers || "all"} onValueChange={(value) => onAlertFiltersChange({ ...alertFilters, tickers: value === "all" ? undefined : [value] })}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by tickers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickers</SelectItem>
              {trackedItems.map((item) => (
                <SelectItem key={item.item_identifier} value={item.item_identifier}>
                  {item.item_identifier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={alertFilters.order_by || "desc"} onValueChange={(value) => onAlertFiltersChange({ ...alertFilters, order_by: value as "asc" | "desc" })}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
