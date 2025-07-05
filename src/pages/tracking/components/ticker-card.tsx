import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Ticker } from "../interfaces/tickers";
import { type CreateTrackedItem, type TrackedItem } from "../interfaces/tracked-items";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTrackedItem, useUpdateTrackedItem } from "../hooks/use-tracked-items";
import { useEffect, useState } from "react";

interface TickerCardProps {
  ticker: Ticker;
  trackedItems: TrackedItem[];
}

export default function TickerCard({ ticker, trackedItems }: TickerCardProps) {
  const queryClient = useQueryClient();
  const createTrackedItem = useCreateTrackedItem();
  const updateTrackedItem = useUpdateTrackedItem();

  const [enabledSubscriptionIds, setEnabledSubscriptionIds] = useState<string[]>([]);

  useEffect(() => {
    setEnabledSubscriptionIds(trackedItems.map((subscription) => subscription.item_identifier));
  }, [trackedItems, setEnabledSubscriptionIds]);

  const get_ticker_fallback = () => {
    return ticker.ticker.substring(0, 2).toUpperCase();
  };

  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        const trackedItem_data: CreateTrackedItem = {
          item_type: ticker.market!,
          item_identifier: ticker.ticker,
          enabled: true,
          meta: {
            ...ticker,
          },
        };

        await createTrackedItem.mutateAsync(trackedItem_data, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tracked-items"] });
          },
        });
      } else {
        const trackedItem = trackedItems.find((subscription) => subscription.item_identifier === ticker.ticker);

        if (trackedItem) {
          await updateTrackedItem.mutateAsync(
            {
              id: trackedItem.id,
              enabled: false,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["tracked-items"] });
              },
            }
          );
        }
      }
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={ticker.icon_url} alt={ticker.ticker} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{get_ticker_fallback()}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-2">{ticker.name}</p>
              <p className="text-sm text-muted-foreground">{ticker.ticker}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Switch checked={enabledSubscriptionIds.includes(ticker.ticker)} onCheckedChange={handleToggle} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
