import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, ExternalLink, Clock } from "lucide-react";
import type { UserAlert } from "@/features/alert/interfaces/alert";
import { useDeleteAlert } from "@/features/alert/hooks/use-alerts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAlertUtils } from "../hooks/use-alert-utils";
import { MediaSubscriptionPlatformTypes } from "@/features/media/interfaces/media-subscriptions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";
import { TrackedItemTypes } from "@/features/tracking/interfaces/tracked-items";

interface AlertCardProps {
  alert: UserAlert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const { mutate: deleteAlert, isPending: isDeleting } = useDeleteAlert();
  const { getPlatformIcon, getPlatformColor, getChannelIcon, getSeverityColor, getSentimentColor, formatTime } = useAlertUtils();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    deleteAlert(alert.id);
    setShowDeleteDialog(false);
  };

  const PlatformIcon = getPlatformIcon(alert.alert.platform_type || MediaSubscriptionPlatformTypes.twitter);

  return (
    <>
      <Card className={`p-6 ${!alert.alert ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge variant={getSeverityColor(alert.alert.severity)}>{alert.alert.severity}</Badge>
              </div>
              <div className="flex items-center gap-2">
                {alert?.alert?.tickers.map((ticker: any) => {
                  return (
                    <div key={ticker.ticker} className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        {(ticker.item_type === TrackedItemTypes.stock || ticker.item_type === TrackedItemTypes.commodity) && (
                          <>
                            <AvatarImage src={`https://assets.parqet.com/logos/symbol/${ticker.ticker}`} alt={ticker.ticker} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{ticker.ticker}</AvatarFallback>
                          </>
                        )}
                        {ticker.item_type === TrackedItemTypes.crypto && (
                          <>
                            <AvatarImage src={`/node_modules/cryptocurrency-icons/svg/color/${ticker.ticker.toLowerCase()}.svg`} alt={ticker.ticker} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{ticker.ticker}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      {ticker.item_type === TrackedItemTypes.keyword && (
                        <>
                          <span className="font-medium">{ticker.ticker}</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className={`text-sm font-medium ${getSentimentColor(alert.alert.sentiment)}`}>{alert.alert.sentiment}</span>
            </div>

            <p className="text-gray-900 mb-3">{alert.alert.description}</p>

            <div className="flex items-center gap-2 mb-3 p-3 bg-gray-100 rounded-lg">
              <PlatformIcon className={`h-4 w-4 ${getPlatformColor(alert.alert.platform_type)}`} />
              <span className="text-sm font-medium">{alert.alert.account_name}</span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">{alert.alert.title}</span>
              <Button variant="ghost" size="sm" className="ml-auto cursor-pointer hover:text-blue-500" onClick={() => window.open(`https://x.com/${alert.alert.account_identifier}`, "_blank")}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-600">Notified via:</span>
              {alert.notification_channels.map((channel, index) => {
                const ChannelIcon = getChannelIcon(channel);
                return (
                  <div key={index} className="flex items-center gap-1">
                    <ChannelIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 capitalize">{channel}</span>
                    {index < alert.notification_channels.length - 1 && <span className="text-gray-400">•</span>}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatTime(alert.created_at)}
              </div>
              <span>{alert.alert.popularity} mentions</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
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
