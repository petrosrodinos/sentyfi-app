import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowLeft } from "lucide-react";
import { UserResult } from "./user-result";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";
import { getTwitterUserByUsername } from "@/features/media/hooks/use-twitter";

interface CreateSubscriptionsProps {
  subscriptions: MediaSubscription[];
  onBack?: () => void;
}

export function CreateSubscriptions({ subscriptions, onBack }: CreateSubscriptionsProps) {
  const [username, setUsername] = useState("");
  const [is_searching, setIsSearching] = useState(false);

  // const { data: user, isLoading: isLoadingUser, error: errorUser, refetch: refetchUser } = useTwitterUser(username);

  const { mutate: getTwitterUser, data: user, isPending: isLoadingUser, error: errorUser } = getTwitterUserByUsername(username);

  const handleSearch = () => {
    if (username.trim()) {
      getTwitterUser();
      setIsSearching(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setUsername("");
    setIsSearching(false);
  };

  return (
    <div className="container mx-auto p-3 space-y-3 w-full">
      <div className="flex items-center space-x-4">
        {onBack && (
          <Button onClick={onBack} variant="outline" size="sm" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        )}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Add Twitter Subscription</h1>
          <p className="text-muted-foreground">Enter a Twitter username to view their profile and add them to your subscriptions</p>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Enter Twitter Username</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Twitter username (without @)" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} className="flex-1" />
            <Button onClick={handleSearch} disabled={!username.trim()}>
              Search
            </Button>
            {is_searching && (
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {is_searching && username && <UserResult user={user!} isLoadingUser={isLoadingUser} errorUser={errorUser!} username={username} subscriptions={subscriptions} />}

      {!is_searching && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to explore?</h3>
            <p className="text-muted-foreground text-center max-w-md">Enter a Twitter username above to view their profile, explore their following list, and add them to your subscriptions.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
