import { Skeleton } from "@/components/ui/skeleton";
import KeywordCard from "./keyword-card";
import type { TrackedItem } from "@/pages/tracking/interfaces/tracked-items";

interface KeywordsListProps {
  keywords: TrackedItem[];
  isLoading: boolean;
}

export default function KeywordsList({ keywords, isLoading }: KeywordsListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!keywords || keywords.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground mb-4">
          <p className="text-lg font-medium">No keywords found</p>
          <p className="text-sm">Start by adding your first keyword to track mentions and sentiment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {keywords.map((keyword) => (
        <KeywordCard key={keyword.id} keyword={keyword} />
      ))}
    </div>
  );
}
