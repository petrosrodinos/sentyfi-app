import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, RefreshCw } from "lucide-react";
import { useTwitterFollowings } from "@/features/media/hooks/use-twitter";
import { UserCard } from "./user-card";
import type { TwitterUser } from "@/features/media/interfaces/twitter";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";
import { useFollowingsData } from "../hooks/use-followings-data";
import Loader from "@/components/ui/loader";

interface FollowingListProps {
  user: TwitterUser;
  subscriptions: MediaSubscription[];
}

export function FollowingList({ user, subscriptions }: FollowingListProps) {
  const { data: followings, isLoading: isLoadingFollowings, isError: isErrorFollowings, error: errorFollowings, refetch: refetchFollowings } = useTwitterFollowings(user.id);

  const twitterUsers = useFollowingsData(followings, subscriptions);

  if (isLoadingFollowings) {
    return <Loader length={5} />;
  }

  if (isErrorFollowings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Following List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">{errorFollowings?.message || "Failed to load following list"}</p>
            <Button onClick={() => refetchFollowings()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="pb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Following List</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {followings?.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No following found for @{user.screen_name}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {twitterUsers?.map((user: TwitterUser) => (
                <UserCard key={user.id} user={user} enabled={user.enabled || false} mode="view" subscriptions={subscriptions} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
