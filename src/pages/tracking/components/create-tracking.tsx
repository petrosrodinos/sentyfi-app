import { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowLeft, TrendingUp } from "lucide-react";
import { useTickers } from "@/features/tracking/hooks/use-tickers";
import type { Ticker } from "../../../features/tracking/interfaces/tickers";
import { TrackedItemTypes, type TrackedItem, type TrackedItemType } from "../../../features/tracking/interfaces/tracked-items";
import TickerCard from "./ticker-card";
import { MarketLabels } from "../constants";

interface CreateTrackingProps {
  trackedItems: TrackedItem[];
  trackedItemsLength: number;
  onBack?: () => void;
  market: TrackedItemType;
}

export function CreateTracking({ trackedItems, trackedItemsLength, onBack, market = TrackedItemTypes.stock }: CreateTrackingProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [tickersData, setTickersData] = useState<Ticker[]>([]);

  const {
    data: searchResults,
    isLoading,
    refetch,
  } = useTickers({
    market,
    search: searchQuery.trim().toUpperCase(),
  });

  const debouncedSearch = useMemo(() => {
    return debounce((query: string) => {
      setSearchQuery(query);
      setIsSearching(true);
    }, 800);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (value.trim()) {
        debouncedSearch(value);
      } else {
        debouncedSearch.cancel();
        setSearchQuery("");
        setIsSearching(false);
        setTickersData([]);
      }
    },
    [debouncedSearch]
  );

  const handleClear = useCallback(() => {
    debouncedSearch.cancel();
    setInputValue("");
    setSearchQuery("");
    setIsSearching(false);
    setTickersData([]);
  }, [debouncedSearch]);

  const handleSearch = useCallback(() => {
    if (inputValue.trim()) {
      debouncedSearch.cancel();
      setSearchQuery(inputValue);
      setIsSearching(true);
      refetch();
    }
  }, [inputValue, refetch, debouncedSearch]);

  useEffect(() => {
    setTickersData([]);
    if (!searchResults?.length) return;
    const items = searchResults?.map((ticker) => {
      const isEnabled = trackedItems.find((item) => item.item_identifier === ticker.ticker);
      return { ...ticker, enabled: isEnabled ? isEnabled.enabled : false };
    });
    setTickersData(items || []);
  }, [searchResults, trackedItems]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="container mx-auto p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-4 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        {onBack && (
          <Button onClick={onBack} variant="outline" size="sm" className="flex items-center space-x-2 w-fit">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}
        <div className="space-y-1 sm:space-y-2 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Add {MarketLabels[market]} Ticker</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Search for {MarketLabels[market]} tickers to add to your tracking list</p>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Search {MarketLabels[market]} Tickers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input placeholder="AAPL" value={inputValue} onChange={handleInputChange} className="flex-1 text-sm sm:text-base" />
            <div className="flex space-x-2">
              <Button onClick={handleSearch} disabled={!searchQuery.trim() || isLoading} className="flex-1 sm:flex-none text-sm sm:text-base">
                {isLoading ? "Searching..." : "Search"}
              </Button>
              {isSearching && (
                <Button onClick={handleClear} variant="outline" className="text-sm sm:text-base">
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isSearching && (
        <Card className="w-full">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Search Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="h-3 sm:h-4 bg-muted rounded animate-pulse" />
                      <div className="h-2 sm:h-3 bg-muted rounded w-2/3 animate-pulse" />
                    </div>
                    <div className="w-16 h-6 sm:w-20 sm:h-8 bg-muted rounded animate-pulse flex-shrink-0" />
                  </div>
                ))}
              </div>
            ) : searchResults && searchResults?.length > 0 ? (
              <div className="space-y-3">
                {tickersData?.map((ticker: Ticker) => (
                  <TickerCard key={ticker.ticker} ticker={ticker} enabled={ticker.enabled || false} mode="create" trackedItemsLength={trackedItemsLength} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-muted-foreground">No tickers found for "{searchQuery}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!isSearching && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">Ready to track {MarketLabels[market]}?</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md">Enter a {MarketLabels[market]} ticker symbol above to search for companies and add them to your tracking list.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
