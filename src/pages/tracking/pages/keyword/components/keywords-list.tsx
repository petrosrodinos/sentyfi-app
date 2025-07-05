import { Skeleton } from "@/components/ui/skeleton";
import KeywordCard from "./keyword-card";
import type { TrackedItem } from "@/pages/tracking/interfaces/tracked-items";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeywordsListProps {
  keywords: TrackedItem[];
  isLoading: boolean;
  onAddNew: (open: boolean) => void;
}

export default function KeywordsList({ keywords, isLoading, onAddNew }: KeywordsListProps) {
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

  if (!keywords.length) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Search className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No keywords yet</h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">You haven't added any keywords to track yet. Click the button below to start adding keywords.</p>
          <Button onClick={() => onAddNew(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Your First Keyword</span>
          </Button>
        </CardContent>
      </Card>
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
