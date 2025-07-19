import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCreateTrackedItem } from "@/features/tracking/hooks/use-tracked-items";
import { useQueryClient } from "@tanstack/react-query";
import { TrackedItemTypes } from "@/features/tracking/interfaces/tracked-items";
import { toast } from "@/hooks/use-toast";
import { PlanTypes } from "@/constants/subscription";
import { Privileges } from "@/constants/privileges";
import { useAuthStore } from "@/stores/auth";

interface AddKeywordModalProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  keywordsLength: number;
}

export default function AddKeywordModal({ children, open, setOpen, keywordsLength }: AddKeywordModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: createTrackedItem, isPending } = useCreateTrackedItem();
  const [keyword, setKeyword] = useState("");
  const { plan_subscription } = useAuthStore();

  const validateKeyword = (value: string) => {
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;
    return !specialCharsRegex.test(value);
  };

  const isKeywordValid = keyword.trim() === "" || validateKeyword(keyword.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    if (!validateKeyword(keyword.trim())) {
      toast({
        title: "Invalid keyword",
        description: "Keywords cannot contain special characters. Please use only letters, numbers, and spaces.",
        variant: "error",
      });
      return;
    }

    if (keywordsLength >= Privileges[plan_subscription?.plan || PlanTypes.free].tracked_items) {
      toast({
        title: "Free plan limit reached",
        description: "You have reached the limit of your free plan. Please upgrade to a paid plan to add more keywords.",
        variant: "error",
      });
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
              <Input id="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword (e.g., Trump, AI)" disabled={isPending} autoFocus className={!isKeywordValid ? "border-red-500 focus:border-red-500" : ""} />
              {!isKeywordValid && <p className="text-sm text-red-500">Keywords cannot contain special characters. Use only letters, numbers, and spaces.</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={!keyword.trim() || !isKeywordValid || isPending} loading={isPending}>
              {isPending ? "Adding..." : "Add Keyword"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
