import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, ExternalLink, Clock } from "lucide-react";
import type { UserAlert } from "@/features/alert/interfaces/alert";
import { useDeleteAlert } from "@/features/alert/hooks/use-alerts";
import { useAlertUtils } from "../hooks/use-alert-utils";
import { MediaSubscriptionPlatformTypes } from "@/features/media/interfaces/media-subscriptions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";
import { type TrackedItem } from "@/features/tracking/interfaces/tracked-items";
import TickerIcon from "@/components/ticker-icon";

interface AlertCardProps {
  alert: UserAlert;
  trackedItems: TrackedItem[];
}

export function AlertCard({ alert, trackedItems }: AlertCardProps) {
  const { mutate: deleteAlert, isPending: isDeleting } = useDeleteAlert();
  const { getPlatformIcon, getPlatformColor, getChannelIcon, getSeverityColor, getSentimentColor, formatTime } = useAlertUtils();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [accuracy, setAccuracy] = useState<"accurate" | "inaccurate" | "unsure" | null>(null);

  const handleDelete = () => {
    deleteAlert(alert.id);
    setShowDeleteDialog(false);
  };

  // const handleAccuracySelect = (value: "accurate" | "inaccurate" | "unsure") => {
  //   setAccuracy(value);
  // };

  // const mockAccuracy = 85;

  const PlatformIcon = getPlatformIcon(alert.alert.platform_type || MediaSubscriptionPlatformTypes.twitter);

  return (
    <>
      <Card className={`p-6 ${!alert.alert ? "border-l-4 border-l-primary bg-card/50" : ""}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Badge variant={getSeverityColor(alert.alert.severity)}>{alert.alert.severity}</Badge>
              </div>
              <div className="flex items-center gap-2">
                {alert?.alert?.tickers
                  .filter((ticker: any) => trackedItems.some((item) => item.item_identifier === ticker.ticker))
                  .map((ticker: any) => {
                    return (
                      <div key={ticker.ticker} className="flex items-center gap-2">
                        <TickerIcon ticker={ticker.ticker} market={ticker.item_type!} width={6} height={6} />
                      </div>
                    );
                  })}
              </div>
              <span className={`text-sm font-medium ${getSentimentColor(alert.alert.sentiment)}`}>{alert.alert.sentiment}</span>
            </div>

            <p className="text-foreground mb-3">{alert.alert.description}</p>

            <div className="flex items-center gap-2 mb-3 p-3 bg-muted/50 rounded-lg">
              <PlatformIcon className={`h-4 w-4 ${getPlatformColor(alert.alert.platform_type)}`} />
              <span className="text-sm font-medium text-foreground">{alert.alert.account_name}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{alert.alert.title}</span>
              <Button variant="ghost" size="sm" className="ml-auto cursor-pointer hover:text-primary" onClick={() => alert?.alert?.screen_name && window.open(`https://x.com/${alert.alert.screen_name}`, "_blank")}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-muted-foreground">Notified via:</span>
              {alert.notification_channels.map((channel, index) => {
                const ChannelIcon = getChannelIcon(channel);
                return (
                  <div key={index} className="flex items-center gap-1">
                    <ChannelIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground capitalize">{channel}</span>
                    {index < alert.notification_channels.length - 1 && <span className="text-muted-foreground/50">•</span>}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatTime(alert.created_at)}
              </div>
              {/* <span>{alert.alert.popularity} mentions</span> */}
            </div>

            {/* <div className="mt-3 flex items-center gap-3 p-2 bg-muted/30 rounded-md">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <span className={`text-sm font-medium ${getAccuracyColor(mockAccuracy)}`}>{mockAccuracy}%</span>
            </div> */}
          </div>

          <div className="flex flex-col gap-2 ml-4">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  {accuracy ? React.createElement(getAccuracyIcon(accuracy), { className: "h-4 w-4" }) : <HelpCircle className="h-4 w-4" />}
                  <span className="text-xs">{getAccuracyText(accuracy)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAccuracySelect("accurate")} className="flex items-center gap-2">
                  {React.createElement(getAccuracyIcon("accurate"), { className: "h-4 w-4 text-green-500" })}
                  <span>Accurate</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAccuracySelect("inaccurate")} className="flex items-center gap-2">
                  {React.createElement(getAccuracyIcon("inaccurate"), { className: "h-4 w-4 text-red-500" })}
                  <span>Inaccurate</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAccuracySelect("unsure")} className="flex items-center gap-2">
                  {React.createElement(getAccuracyIcon("unsure"), { className: "h-4 w-4 text-yellow-500" })}
                  <span>Unsure</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Button variant="ghost" size="sm" onClick={() => setShowDeleteDialog(true)} disabled={isDeleting}>
              Dismiss
            </Button>
          </div>
        </div>
      </Card>

      <ConfirmDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} title="Dismiss Alert" desc="Are you sure you want to dismiss this alert? This action cannot be undone." confirmText="Dismiss" cancelBtnText="Cancel" destructive={true} handleConfirm={handleDelete} isLoading={isDeleting} />
    </>
  );
}
