import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { Ticker } from "../../../features/tracking/interfaces/tickers";
import { type CreateTrackedItem } from "../../../features/tracking/interfaces/tracked-items";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTrackedItem, useUpsertTrackedItem } from "@/features/tracking/hooks/use-tracked-items";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Privileges } from "@/constants/privileges";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { PlanTypes } from "@/constants/subscription";
import TickerIcon from "@/components/ticker-icon";
import { RoleTypes } from "@/features/user/interfaces/user";

interface TickerCardProps {
  ticker: Ticker;
  enabled: boolean;
  mode?: "create" | "view";
  trackedItemId?: number;
  trackedItemsLength: number;
}

export default function TickerCard({ ticker, enabled, mode = "view", trackedItemId, trackedItemsLength }: TickerCardProps) {
  const queryClient = useQueryClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate: upsertTrackedItem, isPending: isUpsertingTrackedItem } = useUpsertTrackedItem();
  const { mutate: deleteTrackedItem, isPending: isDeletingTrackedItem } = useDeleteTrackedItem();
  const { plan_subscription, role } = useAuthStore();

  const handleToggle = async (checked: boolean) => {
    try {
      const trackedItem_data: CreateTrackedItem = {
        item_type: ticker.market!,
        item_identifier: ticker.ticker,
        enabled: checked,
        meta: {
          ...ticker,
        },
      };

      if (role !== RoleTypes.admin && checked && trackedItemsLength >= Privileges[plan_subscription?.plan ?? PlanTypes.free]?.tracked_items) {
        toast({
          title: "Free plan limit reached",
          description: "You have reached the limit of your free plan. Please upgrade to a paid plan to add more tickers.",
          variant: "error",
        });
        return;
      }

      upsertTrackedItem(trackedItem_data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tracked-items"] });
        },
      });
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  const handleDelete = async () => {
    if (!trackedItemId) return;
    deleteTrackedItem(trackedItemId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tracked-items"] });
        setShowDeleteConfirm(false);
      },
    });
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <TickerIcon ticker={ticker.ticker} market={ticker.market!} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 truncate">{ticker.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{ticker.ticker}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <>
                {isUpsertingTrackedItem || isDeletingTrackedItem ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Switch checked={enabled} onCheckedChange={handleToggle} />}
                {mode === "view" && trackedItemId && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive p-2 h-8 w-8" onClick={() => setShowDeleteConfirm(true)}>
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                )}
              </>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} title="Delete Tracked Item" desc={`Are you sure you want to delete ${ticker.name} (${ticker.ticker}) from your tracked items? This action cannot be undone.`} confirmText="Delete" destructive handleConfirm={handleDelete} isLoading={isDeletingTrackedItem} />
    </>
  );
}
