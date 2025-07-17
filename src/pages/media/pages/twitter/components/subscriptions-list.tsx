import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";
import { UserCard } from "./user-card";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";
import Loader from "@/components/ui/loader";

interface SubscriptionsListProps {
  subscriptions: MediaSubscription[];
  isLoading: boolean;
  onAddNew: () => void;
}

export function SubscriptionsList({ subscriptions, isLoading, onAddNew }: SubscriptionsListProps) {
  return (
    <div className="container mx-auto p-2 sm:p-3 lg:p-4 space-y-3 w-full max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Twitter Subscriptions</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your Twitter user subscriptions and track their activities</p>
        </div>
        <Button onClick={onAddNew} className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </Button>
      </div>

      {isLoading && <Loader length={8} />}

      {!subscriptions.length && !isLoading ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">No subscriptions yet</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mb-4">You haven't added any Twitter users to track yet. Click the button above to start adding subscriptions.</p>
            <Button onClick={onAddNew} className="flex items-center space-x-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              <span>Add Your First Subscription</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Your Subscriptions ({subscriptions.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3">
              {subscriptions.map((subscription) => {
                const user_data = {
                  id: subscription.account_identifier,
                  name: subscription.meta?.name || subscription.account_identifier,
                  screen_name: subscription.meta?.screen_name || "",
                  profile_image_url: subscription.meta?.profile_image_url || "",
                  description: subscription.meta?.description || "",
                };
                return <UserCard key={subscription.id} user={user_data} enabled={subscription.enabled} subscriptionId={subscription.id} subscriptions={subscriptions} />;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
