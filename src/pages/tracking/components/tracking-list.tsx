import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TickerCard from "./ticker-card";
import { type TrackedItem, type TrackedItemType } from "../interfaces/tracked-items";
import { Plus, Users } from "lucide-react";
import type { Ticker } from "../interfaces/tickers";
import { MarketLabels } from "../constants";
import Loader from "@/components/ui/loader";

interface TrackingListProps {
  trackedItems: TrackedItem[];
  isLoading: boolean;
  error: Error | null;
  onAddNew: () => void;
  market: TrackedItemType;
}

export default function TrackingList({ trackedItems, isLoading, onAddNew, market }: TrackingListProps) {
  if (isLoading) {
    return <Loader length={8} />;
  }

  return (
    <div className="container mx-auto p-3 space-y-3 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{MarketLabels[market]}</h1>
          <p className="text-muted-foreground">Manage your {MarketLabels[market]} and track their activities</p>
        </div>
        <Button onClick={onAddNew} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add {MarketLabels[market]}</span>
        </Button>
      </div>
      {!trackedItems?.length && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tickers yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">You haven't added any tickers to track yet. Click the button below to start adding tickers.</p>
            <Button onClick={onAddNew} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Your First Ticker</span>
            </Button>
          </CardContent>
        </Card>
      )}
      {trackedItems?.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>
                Your {MarketLabels[market]} ({trackedItems.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-4 w-full">
                {trackedItems?.map((ticker: TrackedItem) => (
                  <TickerCard key={ticker.uuid} ticker={ticker.meta as Ticker} enabled={ticker.enabled} trackedItemId={ticker.id} mode="view" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
