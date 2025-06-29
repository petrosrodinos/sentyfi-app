import { useAuthStore } from "@/stores/auth";
import { useMediaSubscriptions } from "../../hooks/use-media-subscriptions";
import MediaLayout from "../../layout";
import { SubscriptionsDisplay } from "./components/subscriptions-display";
import { CreateSubscriptions } from "./components/create-subscriptions";
import { MediaSubscriptionPlatformTypes } from "../../interfaces/media-subscriptions";
import { useState } from "react";

export default function Twitter() {
  const { user_uuid } = useAuthStore();
  const [show_create, setShowCreate] = useState(false);

  const { data: subscriptions } = useMediaSubscriptions({
    user_uuid: user_uuid!,
    platform_type: MediaSubscriptionPlatformTypes.twitter,
  });

  return <MediaLayout>{show_create ? <CreateSubscriptions subscriptions={subscriptions || []} onBack={() => setShowCreate(false)} /> : <SubscriptionsDisplay subscriptions={subscriptions || []} onAddNew={() => setShowCreate(true)} />}</MediaLayout>;
}
