import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";
import { UserCard } from "./user-card";
import type { MediaSubscription } from "@/pages/media/interfaces/media-subscriptions";

interface SubscriptionsDisplayProps {
  subscriptions: MediaSubscription[];
  onAddNew: () => void;
}

export function SubscriptionsDisplay({ subscriptions, onAddNew }: SubscriptionsDisplayProps) {
  return (
    <div className="container mx-auto p-3 space-y-3 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Twitter Subscriptions</h1>
          <p className="text-muted-foreground">Manage your Twitter user subscriptions and track their activities</p>
        </div>
        <Button onClick={onAddNew} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No subscriptions yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">You haven't added any Twitter users to track yet. Click the button above to start adding subscriptions.</p>
            <Button onClick={onAddNew} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Your First Subscription</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Your Subscriptions ({subscriptions.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subscriptions.map((subscription) => {
                const user_data = {
                  id: subscription.account_identifier,
                  name: subscription.meta?.name || subscription.account_identifier,
                  screen_name: subscription.meta?.screen_name || "",
                  profile_image_url: subscription.meta?.profile_image_url || "",
                  description: subscription.meta?.description || "",
                };
                return <UserCard key={subscription.id} user={user_data} subscriptions={subscriptions} />;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
