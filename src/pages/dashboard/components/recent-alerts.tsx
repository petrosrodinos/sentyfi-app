import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bell } from "lucide-react";
import type { RecentAlert } from "../interfaces/dashboard";

interface RecentAlertsProps {
  recentAlerts: RecentAlert[];
  trackedItems: Array<{ item_identifier?: string }>;
}

export function RecentAlerts({ recentAlerts, trackedItems }: RecentAlertsProps) {
  return (
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
                  .map((ticker, tickerIndex) => {
                    return (
                      <Badge key={tickerIndex} variant="outline">
                        {ticker.ticker}
                      </Badge>
                    );
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
  );
}
