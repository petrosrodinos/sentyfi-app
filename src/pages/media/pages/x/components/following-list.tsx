import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, RefreshCw } from "lucide-react";
import { useTwitterFollowings } from "../hooks/use-twitter";
import { UserCard } from "./user-card";
import type { TwitterUser } from "../interfaces/twitter";
import type { MediaSubscription } from "@/pages/media/interfaces/media-subscriptions";
import { useEffect, useState } from "react";

interface FollowingListProps {
  username: string;
  subscriptions: MediaSubscription[];
}

export function FollowingList({ username, subscriptions }: FollowingListProps) {
  const [twitterData, setTwitterData] = useState<TwitterUser[]>([]);

  const { data: followings, isLoading: isLoadingFollowings, isError: isErrorFollowings, error: errorFollowings, refetch: refetchFollowings } = useTwitterFollowings(username);

  useEffect(() => {
    if (!followings?.length) return;
    const items = followings?.map((user) => {
      const isEnabled = subscriptions.find((subscription) => subscription.account_identifier === user.id);
      return { ...user, enabled: isEnabled ? isEnabled.enabled : false };
    });
    setTwitterData(items || []);
  }, [followings, subscriptions]);

  if (isLoadingFollowings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Following List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                  <Skeleton className="w-9 h-5" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
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
              <p className="text-muted-foreground">No following found for @{username}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {twitterData?.map((user: TwitterUser) => (
                <UserCard key={user.id} user={user} enabled={user.enabled || false} mode="view" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
