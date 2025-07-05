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
    data: tickers,
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

  return <>{isCreating ? <CreateTracking trackedItems={tickers || []} onBack={handleBack} market={market} /> : <TrackingList tickers={tickers || []} isLoading={isLoading} error={error} onAddNew={handleAddNew} market={market} />}</>;
}
