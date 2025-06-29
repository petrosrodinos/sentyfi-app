import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import TickerCard from "./ticker-card";
import { type TrackedItem } from "@/pages/tracking/interfaces/tracked-items";
import { Plus, Users } from "lucide-react";

interface TrackingListProps {
  tickers: TrackedItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  onAddNew: () => void;
}

export default function TrackingList({ tickers, isLoading, error, refetch, onAddNew }: TrackingListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="cursor-pointer transition-all duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="pt-8 pb-8">
          <div className="text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <IconAlertCircle size={32} className="text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-destructive mb-2">Failed to Load Tickers</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{error.message}</p>
            <Button onClick={() => refetch?.()} variant="outline" className="border-destructive/20 hover:bg-destructive/10 hover:border-destructive/30">
              <IconRefresh size={16} className="mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-3 space-y-3 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Stocks</h1>
          <p className="text-muted-foreground">Manage your stocks and track their activities</p>
        </div>
        <Button onClick={onAddNew} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Ticker</span>
        </Button>
      </div>
      {tickers?.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tickers yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">You haven't added any tickers to track yet. Click the button above to start adding tickers.</p>
            <Button onClick={onAddNew} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Your First Ticker</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Your Stocks ({tickers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-4 w-full">
                {tickers?.map((ticker: TrackedItem) => (
                  <TickerCard key={ticker.uuid} ticker={ticker} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
