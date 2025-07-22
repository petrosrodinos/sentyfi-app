import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useDeleteMediaSubscription, useUpsertMediaSubscription } from "@/features/media/hooks/use-media-subscriptions";
import { useQueryClient } from "@tanstack/react-query";
import type { TwitterUser } from "../../../../../features/media/interfaces/twitter";
import type { CreateMediaSubscription, MediaSubscription } from "../../../../../features/media/interfaces/media-subscriptions";
import { MediaSubscriptionPlatformTypes } from "../../../../../features/media/interfaces/media-subscriptions";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Privileges } from "@/constants/privileges";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { PlanTypes } from "@/constants/subscription";
import { RoleTypes } from "@/features/user/interfaces/user";

interface UserCardProps {
  user: TwitterUser;
  enabled: boolean;
  mode?: "create" | "view";
  checkbox_visible?: boolean;
  subscriptionId?: number;
  subscriptions: MediaSubscription[];

  onSelect?: (e: any, user: TwitterUser) => void;
}

export function UserCard({ user, enabled, mode = "view", subscriptionId, subscriptions, checkbox_visible = true, onSelect }: UserCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();
  const { plan_subscription, role } = useAuthStore();

  const { mutate: upsertSubscription, isPending: isUpsertingSubscription } = useUpsertMediaSubscription();
  const { mutate: deleteSubscription, isPending: isDeletingSubscription } = useDeleteMediaSubscription();

  const subscriptionsLength = useMemo(() => subscriptions?.filter((subscription) => subscription.enabled).length, [subscriptions]);

  const handleToggle = async (checked: boolean) => {
    try {
      const subscription_data: CreateMediaSubscription = {
        platform_type: MediaSubscriptionPlatformTypes.twitter,
        account_identifier: user.id,
        enabled: checked,
        meta: {
          ...user,
        },
      };

      if (role !== RoleTypes.admin && checked && subscriptionsLength >= Privileges[plan_subscription?.plan ?? PlanTypes.free]?.media_subscriptions) {
        toast({
          title: "Free plan limit reached",
          description: "You have reached the limit of your free plan. Please upgrade to a paid plan to add more users.",
          variant: "error",
        });
        return;
      }

      upsertSubscription(subscription_data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["media-subscriptions", MediaSubscriptionPlatformTypes.twitter] });
        },
      });
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  const handleDelete = async () => {
    if (!subscriptionId) return;

    try {
      deleteSubscription(subscriptionId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["media-subscriptions", MediaSubscriptionPlatformTypes.twitter] });
        },
      });
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow group" onClick={(e) => onSelect?.(e, user)}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <img src={user.profile_image_url} alt={user.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-sm truncate">{user.name}</h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-2">@{user.screen_name}</p>

              {user.description && <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">{user.description}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-2 sm:ml-4 flex-shrink-0">
            {isUpsertingSubscription || isDeletingSubscription ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {checkbox_visible ? (
                  <Switch checked={enabled} onCheckedChange={handleToggle} />
                ) : (
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={(e) => onSelect?.(e, user)}>
                    Select
                  </Button>
                )}
                {mode === "view" && subscriptionId && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2" onClick={() => setShowDeleteConfirm(true)}>
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
      <ConfirmDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} title="Delete Tracked Item" desc={`Are you sure you want to delete your subscription to @${user.screen_name}? This action cannot be undone.`} confirmText="Delete" destructive handleConfirm={handleDelete} isLoading={isDeletingSubscription} />
    </Card>
  );
}
