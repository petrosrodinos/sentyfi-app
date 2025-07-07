import { useState } from "react";

import { useAuthStore } from "@/stores/auth";
import type { TrackedItemType } from "../interfaces/tracked-items";
import { useTrackedItems } from "../hooks/use-tracked-items";
import TrackingList from "./tracking-list";
import { CreateTracking } from "./create-tracking";

interface TrackingProps {
  market: TrackedItemType;
}

export default function Tickers({ market }: TrackingProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { user_uuid } = useAuthStore();

  const {
    data: trackedItems,
    isLoading,
    error,
  } = useTrackedItems({
    item_type: market,
    user_uuid: user_uuid!,
  });

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleBack = () => {
    setIsCreating(false);
  };

  return <>{isCreating ? <CreateTracking trackedItems={trackedItems || []} onBack={handleBack} market={market} /> : <TrackingList trackedItems={trackedItems || []} isLoading={isLoading} error={error} onAddNew={handleAddNew} market={market} />}</>;
}
