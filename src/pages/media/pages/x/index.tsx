import { useAuthStore } from "@/stores/auth";
import { useMediaSubscriptions } from "../../hooks/use-media-subscriptions";
import MediaLayout from "../../layout";
import { SubscriptionsList } from "./components/subscriptions-list";
import { CreateSubscriptions } from "./components/create-subscriptions";
import { MediaSubscriptionPlatformTypes } from "../../interfaces/media-subscriptions";
import { useState } from "react";

export default function Twitter() {
  const { user_uuid } = useAuthStore();
  const [isCreating, setIsCreating] = useState(false);

  const { data: subscriptions } = useMediaSubscriptions({
    user_uuid: user_uuid!,
    platform_type: MediaSubscriptionPlatformTypes.twitter,
  });

  return <MediaLayout>{isCreating ? <CreateSubscriptions subscriptions={subscriptions || []} onBack={() => setIsCreating(false)} /> : <SubscriptionsList subscriptions={subscriptions || []} onAddNew={() => setIsCreating(true)} />}</MediaLayout>;
}
