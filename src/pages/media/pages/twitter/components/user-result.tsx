import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { UserCard } from "./user-card";
import { useMemo, useState } from "react";
import { FollowingList } from "./following-list";
import type { MediaSubscription } from "../../../../../features/media/interfaces/media-subscriptions";
import type { TwitterUser } from "@/features/media/interfaces/twitter";
import { useFollowingsData } from "../hooks/use-followings-data";

interface UserResultProps {
  users: TwitterUser[];
  isLoadingUsers: boolean;
  errorUsers: Error;
  username: string;
  subscriptions: MediaSubscription[];
}

export function UserResult({ users, isLoadingUsers, errorUsers, username, subscriptions }: UserResultProps) {
  const [getFollowings, setGetFollowings] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TwitterUser | null>(null);

  const twitterUsers = useFollowingsData(users, subscriptions);

  const handleGetFollowings = () => {
    setGetFollowings(true);
  };

  const handleUserSelect = (e: any, user: TwitterUser) => {
    e.stopPropagation();
    setSelectedUser(user);
  };

  const isUserSelected = useMemo(() => {
    return selectedUser && subscriptions.find((subscription) => subscription.account_identifier === selectedUser?.id)?.enabled;
  }, [selectedUser, subscriptions]);

  if (isLoadingUsers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Users</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
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
              <span>Users</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!users || users.length === 0 || !!errorUsers ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found for @{username}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {!selectedUser &&
                twitterUsers.map((user) => (
                  <div key={user.id} className={`cursor-pointer transition-colors`}>
                    <UserCard user={user} enabled={user.enabled || false} checkbox_visible={false} mode="create" subscriptions={subscriptions} onSelect={handleUserSelect} />
                  </div>
                ))}

              {selectedUser && (
                <>
                  <UserCard user={selectedUser} enabled={isUserSelected || false} mode="create" subscriptions={subscriptions} />

                  <Button disabled={getFollowings} onClick={handleGetFollowings} variant="outline" className="mt-4 w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Get Followings for @{selectedUser.screen_name}
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {getFollowings && selectedUser && <FollowingList user={selectedUser} subscriptions={subscriptions} />}
    </>
  );
}
