import { useState, useMemo } from "react";
import { groupBy } from "lodash";
import type { TrackedItemType } from "../../../features/tracking/interfaces/tracked-items";
import { useTrackedItems } from "@/features/tracking/hooks/use-tracked-items";
import TrackingList from "./tracking-list";
import { CreateTracking } from "./create-tracking";

interface TrackingProps {
  market: TrackedItemType;
}

export default function Tickers({ market }: TrackingProps) {
  const [isCreating, setIsCreating] = useState(false);

  const { data: trackedItems, isLoading, error } = useTrackedItems({});

  const groupedTrackedItems = useMemo(() => {
    if (!trackedItems) return {};
    return groupBy(trackedItems, "item_type");
  }, [trackedItems]);

  const marketTrackedItems = useMemo(() => {
    return groupedTrackedItems[market] || [];
  }, [groupedTrackedItems, market]);

  const enabledTrackedItemsLength = useMemo(() => {
    return trackedItems?.filter((item) => item.enabled).length || 0;
  }, [trackedItems]);

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleBack = () => {
    setIsCreating(false);
  };

  return <>{isCreating ? <CreateTracking trackedItems={marketTrackedItems} trackedItemsLength={enabledTrackedItemsLength} onBack={handleBack} market={market} /> : <TrackingList trackedItems={marketTrackedItems} isLoading={isLoading} error={error} onAddNew={handleAddNew} market={market} trackedItemsLength={enabledTrackedItemsLength} />}</>;
}
