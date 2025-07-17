import { useTrackedItems } from "@/features/tracking/hooks/use-tracked-items";
import { TrackedItemTypes } from "@/features/tracking/interfaces/tracked-items";
import { KeywordsList, AddKeywordModal } from "./components";
import { useMemo, useState } from "react";

export default function Keywords() {
  const [open, setOpen] = useState(false);
  const { data: trackedItems, isLoading } = useTrackedItems({ item_type: TrackedItemTypes.keyword });

  const enabledkeywords = useMemo(() => {
    return trackedItems?.filter((keyword) => keyword.enabled) || [];
  }, [trackedItems]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground">Track keywords to monitor mentions and sentiment analysis across social media.</p>
        </div>
        <AddKeywordModal open={open} setOpen={setOpen} keywordsLength={enabledkeywords?.length || 0} />
      </div>

      <KeywordsList keywords={trackedItems || []} keywordsLength={enabledkeywords?.length || 0} isLoading={isLoading} onAddNew={setOpen} />
    </div>
  );
}
