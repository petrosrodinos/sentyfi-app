import { useState } from "react";
import { TrackedItemTypes } from "../../interfaces/tracked-items";
import TrackingLayout from "../../layout";
import TrackingList from "./components/tracking-list";
import { CreateTracking } from "./components/create-tracking";
import { useTrackedItems } from "../../hooks/use-tracked-items";
import { useAuthStore } from "@/stores/auth";

export default function Stocks() {
  const [isCreating, setIsCreating] = useState(false);
  const { user_uuid } = useAuthStore();

  const {
    data: tickers,
    isLoading,
    error,
    refetch,
  } = useTrackedItems({
    item_type: TrackedItemTypes.stock,
    user_uuid: user_uuid!,
  });

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleBack = () => {
    setIsCreating(false);
  };

  return <TrackingLayout>{isCreating ? <CreateTracking trackedItems={tickers || []} onBack={handleBack} /> : <TrackingList tickers={tickers || []} isLoading={isLoading} error={error} refetch={refetch} onAddNew={handleAddNew} />}</TrackingLayout>;
}
