import KeywordCard from "./keyword-card";
import type { TrackedItem } from "@/features/tracking/interfaces/tracked-items";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

interface KeywordsListProps {
  keywords: TrackedItem[];
  keywordsLength: number;
  isLoading: boolean;
  onAddNew: (open: boolean) => void;
}

export default function KeywordsList({ keywords, keywordsLength, isLoading, onAddNew }: KeywordsListProps) {
  if (isLoading) {
    return <Loader length={4} />;
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
        <KeywordCard key={keyword.id} keyword={keyword} keywordsLength={keywordsLength} />
      ))}
    </div>
  );
}
