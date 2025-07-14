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

interface UserCardProps {
  user: TwitterUser;
  enabled: boolean;
  mode?: "create" | "view";
  subscriptionId?: number;
  subscriptions: MediaSubscription[];
}

export function UserCard({ user, enabled, mode = "view", subscriptionId, subscriptions }: UserCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { mutate: upsertSubscription, isPending: isUpsertingSubscription } = useUpsertMediaSubscription();
  const { mutate: deleteSubscription, isPending: isDeletingSubscription } = useDeleteMediaSubscription();

  const queryClient = useQueryClient();

  const { plan_subscription } = useAuthStore();

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

      if (checked && subscriptionsLength >= Privileges[plan_subscription.plan]?.media_subscriptions) {
        toast({
          title: "Free plan limit reached",
          description: "You have reached the limit of your free plan. Please upgrade to a paid plan to continue.",
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
    <Card className="hover:shadow-md transition-shadow group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="relative">
              <img src={user.profile_image_url} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-sm truncate">{user.name}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-2">@{user.screen_name}</p>

              {user.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{user.description}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {isUpsertingSubscription || isDeletingSubscription ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Switch checked={enabled} onCheckedChange={handleToggle} />
                {mode === "view" && subscriptionId && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setShowDeleteConfirm(true)}>
                    <Trash2 className="w-4 h-4" />
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
