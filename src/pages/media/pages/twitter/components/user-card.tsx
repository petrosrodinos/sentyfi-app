import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useDeleteMediaSubscription, useUpsertMediaSubscription } from "@/features/media/hooks/use-media-subscriptions";
import { useQueryClient } from "@tanstack/react-query";
import type { TwitterUser } from "../../../../../features/media/interfaces/twitter";
import type { CreateMediaSubscription } from "../../../../../features/media/interfaces/media-subscriptions";
import { MediaSubscriptionPlatformTypes } from "../../../../../features/media/interfaces/media-subscriptions";
import { LoaderCircle, Trash2 } from "lucide-react";

interface UserCardProps {
  user: TwitterUser;
  enabled: boolean;
  mode?: "create" | "view";
  subscriptionId?: number;
}

export function UserCard({ user, enabled, mode = "view", subscriptionId }: UserCardProps) {
  const { mutate: upsertSubscription, isPending: isUpsertingSubscription } = useUpsertMediaSubscription();
  const { mutate: deleteSubscription, isPending: isDeletingSubscription } = useDeleteMediaSubscription();

  const queryClient = useQueryClient();

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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to delete your subscription to @{user.screen_name}? This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
