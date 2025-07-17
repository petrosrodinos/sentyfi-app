import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowLeft } from "lucide-react";
import { UserResult } from "./user-result";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";
import { searchTwitterUserByUsername } from "@/features/media/hooks/use-twitter";

interface CreateSubscriptionsProps {
  subscriptions: MediaSubscription[];
  onBack?: () => void;
}

export function CreateSubscriptions({ subscriptions, onBack }: CreateSubscriptionsProps) {
  const [username, setUsername] = useState("");
  const [is_searching, setIsSearching] = useState(false);

  const { mutate: getTwitterUser, data: users, isPending: isLoadingUser, error: errorUser } = searchTwitterUserByUsername(username);

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
    <div className="container mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {onBack && (
          <Button onClick={onBack} variant="outline" size="sm" className="flex items-center space-x-2 w-fit">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}
        <div className="space-y-2 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Add Twitter Subscription</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Enter a Twitter username to view their profile and add them to your subscriptions</p>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            <Search className="w-5 h-5" />
            <span>Enter Twitter Username</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Input placeholder="Twitter username (without @)" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} className="flex-1 text-sm sm:text-base" />
            <div className="flex gap-2 sm:gap-3">
              <Button onClick={handleSearch} disabled={!username.trim()} className="flex-1 sm:flex-none text-sm sm:text-base">
                Search
              </Button>
              {is_searching && (
                <Button onClick={handleClear} variant="outline" className="flex-1 sm:flex-none text-sm sm:text-base">
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {is_searching && username && <UserResult users={users!} isLoadingUsers={isLoadingUser} errorUsers={errorUser!} username={username} subscriptions={subscriptions} />}

      {!is_searching && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-center">Ready to explore?</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md">Enter a Twitter username above to view their profile, explore their following list, and add them to your subscriptions.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
