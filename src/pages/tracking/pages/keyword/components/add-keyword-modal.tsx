import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCreateTrackedItem } from "@/pages/tracking/hooks/use-tracked-items";
import { useQueryClient } from "@tanstack/react-query";
import { TrackedItemTypes } from "@/pages/tracking/interfaces/tracked-items";

interface AddKeywordModalProps {
  children?: React.ReactNode;
}

export default function AddKeywordModal({ children }: AddKeywordModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: createTrackedItem, isPending } = useCreateTrackedItem();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    try {
      await createTrackedItem(
        {
          item_type: TrackedItemTypes.keyword,
          item_identifier: keyword.trim(),
          enabled: true,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tracked-items", TrackedItemTypes.keyword] });
            setKeyword("");
            setOpen(false);
          },
        }
      );
    } catch (error) {
      console.error("Failed to create keyword:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setKeyword("");
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Keyword
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Keyword</DialogTitle>
          <DialogDescription>Enter a keyword to track. This will be used to monitor mentions and sentiment analysis.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="keyword">Keyword</Label>
              <Input id="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword (e.g., Trump, AI)" disabled={isPending} autoFocus />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={!keyword.trim() || isPending} loading={isPending}>
              {isPending ? "Adding..." : "Add Keyword"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
