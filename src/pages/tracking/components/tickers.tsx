import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/auth";
import type { TrackedItem, TrackedItemType } from "../interfaces/tracked-items";
import { useTrackedItems } from "../hooks/use-tracked-items";
import TrackingList from "./tracking-list";
import { CreateTracking } from "./create-tracking";
import type { Ticker } from "../interfaces/tickers";

interface TrackingProps {
  market: TrackedItemType;
}

export default function Tickers({ market }: TrackingProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { user_uuid } = useAuthStore();
  const [trackedItemsData, setTrackedItemsData] = useState<TrackedItem[]>([]);

  const {
    data: trackedItems,
    isLoading,
    error,
  } = useTrackedItems({
    item_type: market,
    user_uuid: user_uuid!,
  });

  useEffect(() => {
    if (!trackedItems?.length) return;
    const items = trackedItems?.map((item) => {
      return {
        ...item,
        meta: item.meta as Ticker,
      };
    });
    setTrackedItemsData(items || []);
  }, [trackedItems]);

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleBack = () => {
    setIsCreating(false);
  };

  return <>{isCreating ? <CreateTracking trackedItems={trackedItemsData || []} onBack={handleBack} market={market} /> : <TrackingList trackedItems={trackedItemsData || []} isLoading={isLoading} error={error} onAddNew={handleAddNew} market={market} />}</>;
}
