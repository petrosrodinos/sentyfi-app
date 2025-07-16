import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { useDeleteTrackedItem, useUpsertTrackedItem } from "@/features/tracking/hooks/use-tracked-items";
import { useQueryClient } from "@tanstack/react-query";
import { TrackedItemTypes, type TrackedItem } from "@/features/tracking/interfaces/tracked-items";
import { Privileges } from "@/constants/privileges";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/hooks/use-toast";
import { PlanTypes } from "@/constants/subscription";

interface KeywordCardProps {
  keyword: TrackedItem;
  keywordsLength: number;
}

export default function KeywordCard({ keyword, keywordsLength }: KeywordCardProps) {
  const { plan_subscription } = useAuthStore();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutate: deleteTrackedItem, isPending: isDeletePending } = useDeleteTrackedItem();
  const { mutate: updateTrackedItem, isPending: isUpdatePending } = useUpsertTrackedItem();

  const handleToggle = (checked: boolean) => {
    try {
      if (checked && keywordsLength >= Privileges[plan_subscription?.plan || PlanTypes.free].tracked_items) {
        toast({
          title: "Free plan limit reached",
          description: "You have reached the limit of your free plan. Please upgrade to a paid plan to add more keywords.",
          variant: "error",
        });
        return;
      }
      updateTrackedItem(
        {
          enabled: checked,
          item_identifier: keyword.item_identifier,
          item_type: TrackedItemTypes.keyword,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tracked-items", TrackedItemTypes.keyword] });
          },
        }
      );
    } catch (error) {
      console.error("Failed to update keyword:", error);
    }
  };

  const handleDelete = () => {
    try {
      deleteTrackedItem(keyword.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tracked-items", TrackedItemTypes.keyword] });
          setShowDeleteDialog(false);
        },
      });
    } catch (error) {
      console.error("Failed to delete keyword:", error);
    }
  };

  return (
    <Card className="group hover:shadow-md transition-shadow relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{keyword.item_identifier}</p>
            <p className="text-xs text-muted-foreground mt-1">{keyword.enabled ? "Active" : "Inactive"}</p>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={keyword.enabled} onCheckedChange={handleToggle} disabled={isUpdatePending} />

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Keyword</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete the keyword "{keyword.item_identifier}"? This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={isDeletePending}>
                      {isDeletePending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
