import { TrackedItemTypes } from "../../interfaces/tracked-items";
import TrackingLayout from "../../layout";
import TrackingList from "./components/tracking-list";
import { useTrackedItems } from "../../hooks/use-tracked-items";
import { useAuthStore } from "@/stores/auth";

export default function Stocks() {
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
    // TODO: Implement add new ticker functionality
    console.log("Add new ticker");
  };

  return (
    <TrackingLayout>
      <TrackingList tickers={tickers || []} isLoading={isLoading} error={error} refetch={refetch} onAddNew={handleAddNew} />
    </TrackingLayout>
  );
}
