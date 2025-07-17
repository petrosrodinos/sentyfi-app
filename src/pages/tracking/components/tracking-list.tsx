import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TickerCard from "./ticker-card";
import { type TrackedItem, type TrackedItemType } from "../../../features/tracking/interfaces/tracked-items";
import { Plus, Users } from "lucide-react";
import type { Ticker } from "../../../features/tracking/interfaces/tickers";
import { MarketLabels } from "../constants";
import Loader from "@/components/ui/loader";

interface TrackingListProps {
  trackedItems: TrackedItem[];
  isLoading: boolean;
  error: Error | null;
  market: TrackedItemType;
  trackedItemsLength: number;
  onAddNew: () => void;
}

export default function TrackingList({ trackedItems, isLoading, onAddNew, market, trackedItemsLength }: TrackingListProps) {
  if (isLoading) {
    return <Loader length={8} />;
  }

  return (
    <div className="container mx-auto p-3 space-y-3 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{MarketLabels[market]}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your {MarketLabels[market]} and track their activities</p>
        </div>
        <Button onClick={onAddNew} className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add {MarketLabels[market]}</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {!trackedItems?.length && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">No tickers yet</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mb-4">You haven't added any tickers to track yet. Click the button below to start adding tickers.</p>
            <Button onClick={onAddNew} className="flex items-center space-x-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Your First Ticker</span>
              <span className="sm:hidden">Add First Ticker</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {trackedItems?.length > 0 && (
        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>
                Your {MarketLabels[market]} ({trackedItems.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="space-y-3 sm:space-y-4 w-full">
                {trackedItems?.map((ticker: TrackedItem) => (
                  <TickerCard key={ticker.uuid} ticker={ticker.meta as Ticker} enabled={ticker.enabled} trackedItemId={ticker.id} mode="view" trackedItemsLength={trackedItemsLength} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
