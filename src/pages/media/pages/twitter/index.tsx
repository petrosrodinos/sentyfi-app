import { SubscriptionsList } from "./components/subscriptions-list";
import { CreateSubscriptions } from "./components/create-subscriptions";
import { MediaSubscriptionPlatformTypes } from "@/features/media/interfaces/media-subscriptions";
import { useState } from "react";
import { useMediaSubscriptions } from "@/features/media/hooks/use-media-subscriptions";

export default function Twitter() {
  const [isCreating, setIsCreating] = useState(false);

  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useMediaSubscriptions({
    platform_type: MediaSubscriptionPlatformTypes.twitter,
  });

  return <>{isCreating ? <CreateSubscriptions subscriptions={subscriptions || []} onBack={() => setIsCreating(false)} /> : <SubscriptionsList subscriptions={subscriptions || []} isLoading={isLoadingSubscriptions} onAddNew={() => setIsCreating(true)} />}</>;
}
