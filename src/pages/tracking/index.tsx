import { useState } from "react";
import { type TrackedItemType } from "./interfaces/tracked-items";
import TrackingList from "./components/tracking-list";
import { CreateTracking } from "./components/create-tracking";
import { useTrackedItems } from "./hooks/use-tracked-items";
import { useAuthStore } from "@/stores/auth";

interface TrackingProps {
  market: TrackedItemType;
}

export default function Tracking({ market }: TrackingProps) {
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
