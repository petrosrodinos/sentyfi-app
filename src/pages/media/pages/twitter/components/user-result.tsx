import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, RefreshCw } from "lucide-react";
import { useTwitterUser } from "@/features/media/hooks/use-twitter";
import { UserCard } from "./user-card";
import { useMemo, useState } from "react";
import { FollowingList } from "./following-list";
import type { MediaSubscription } from "../../../../../features/media/interfaces/media-subscriptions";

interface UserResultProps {
  username: string;
  subscriptions: MediaSubscription[];
}

export function UserResult({ username, subscriptions }: UserResultProps) {
  const [getFollowings, setGetFollowings] = useState(false);

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser, refetch: refetchUser } = useTwitterUser(username);

  const handleGetFollowings = () => {
    setGetFollowings(true);
  };

  const isUserEnabled = useMemo(() => {
    return subscriptions.find((subscription) => subscription.account_identifier === user?.id)?.enabled;
  }, [subscriptions, user]);

  if (isLoadingUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>User</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="w-9 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isErrorUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>User</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">{errorUser?.message || "Failed to load user"}</p>
            <Button onClick={() => refetchUser()} variant="outline">
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
              <span>User</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!user ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No user found for @{username}</p>
            </div>
          ) : (
            <>
              <UserCard user={user!} enabled={isUserEnabled || false} mode="create" subscriptionsLength={subscriptions.length} />

              <Button disabled={getFollowings} onClick={handleGetFollowings} variant="outline" className="mt-4">
                <Users className="w-4 h-4 mr-2" />
                Get Followings
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {getFollowings && <FollowingList username={username} subscriptions={subscriptions} />}
    </>
  );
}
