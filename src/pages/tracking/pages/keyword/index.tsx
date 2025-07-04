import { useTrackedItems } from "@/pages/tracking/hooks/use-tracked-items";
import { TrackedItemTypes } from "@/pages/tracking/interfaces/tracked-items";
import { KeywordsList, AddKeywordModal } from "./components";
import { useAuthStore } from "@/stores/auth";

export default function Keywords() {
  const { user_uuid } = useAuthStore();
  const { data: trackedItems, isLoading } = useTrackedItems({ item_type: TrackedItemTypes.keyword, user_uuid: user_uuid || "" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground">Track keywords to monitor mentions and sentiment analysis across social media.</p>
        </div>
        <AddKeywordModal />
      </div>

      <KeywordsList keywords={trackedItems || []} isLoading={isLoading} />
    </div>
  );
}
