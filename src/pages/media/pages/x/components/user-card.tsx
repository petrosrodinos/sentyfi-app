import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useUpsertMediaSubscription } from "../../../hooks/use-media-subscriptions";
import { useQueryClient } from "@tanstack/react-query";
import type { TwitterUser } from "../interfaces/twitter";
import type { CreateMediaSubscription } from "../../../interfaces/media-subscriptions";
import { MediaSubscriptionPlatformTypes } from "../../../interfaces/media-subscriptions";
import { LoaderCircle } from "lucide-react";

interface UserCardProps {
  user: TwitterUser;
  enabled: boolean;
}

export function UserCard({ user, enabled }: UserCardProps) {
  const { mutate: upsertSubscription, isPending: isUpsertingSubscription } = useUpsertMediaSubscription();
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

          <div className="flex items-center space-x-2 ml-4">{isUpsertingSubscription ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Switch checked={enabled} onCheckedChange={handleToggle} />}</div>
        </div>
      </CardContent>
    </Card>
  );
}
