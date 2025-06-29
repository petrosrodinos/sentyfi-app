import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useCreateMediaSubscription, useDeleteMediaSubscription } from "../../../hooks/use-media-subscriptions";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TwitterUser } from "../interfaces/twitter";
import type { CreateMediaSubscription, MediaSubscription } from "../../../interfaces/media-subscriptions";
import { MediaSubscriptionPlatformTypes } from "../../../interfaces/media-subscriptions";
import { LoaderCircle } from "lucide-react";

interface UserCardProps {
  user: TwitterUser;
  subscriptions: MediaSubscription[];
}

export function UserCard({ user, subscriptions }: UserCardProps) {
  const [enabledSubscriptionIds, setEnabledSubscriptionIds] = useState<string[]>([]);
  const createSubscription = useCreateMediaSubscription();
  const deleteSubscription = useDeleteMediaSubscription();
  const queryClient = useQueryClient();

  useEffect(() => {
    setEnabledSubscriptionIds(subscriptions.map((subscription) => subscription.account_identifier));
  }, [subscriptions]);

  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        const subscription_data: CreateMediaSubscription = {
          platform_type: MediaSubscriptionPlatformTypes.twitter,
          account_identifier: user.id,
          enabled: true,
          meta: {
            ...user,
          },
        };

        await createSubscription.mutateAsync(subscription_data, {
          onSuccess: () => {
            setEnabledSubscriptionIds([...enabledSubscriptionIds, user.id]);
            queryClient.invalidateQueries({ queryKey: ["media-subscriptions"] });
          },
        });
      } else {
        const subscription = subscriptions.find((subscription) => subscription.account_identifier === user.id);

        await deleteSubscription.mutateAsync(subscription?.id || 0, {
          onSuccess: () => {
            setEnabledSubscriptionIds(enabledSubscriptionIds.filter((id) => id !== user.id));
            queryClient.invalidateQueries({ queryKey: ["media-subscriptions"] });
          },
        });
      }
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
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

          <div className="flex items-center space-x-2 ml-4">{createSubscription.isPending || deleteSubscription.isPending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Switch checked={enabledSubscriptionIds.includes(user.id)} onCheckedChange={handleToggle} />}</div>
        </div>
      </CardContent>
    </Card>
  );
}
