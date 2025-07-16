import { useEffect, useState } from "react";
import type { TwitterUser } from "@/features/media/interfaces/twitter";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";

export function useFollowingsData(
    users: TwitterUser[] | undefined,
    subscriptions: MediaSubscription[]
) {
    const [twitterData, setTwitterData] = useState<TwitterUser[]>([]);

    useEffect(() => {
        if (!users?.length) return;

        const items = users.map((user: TwitterUser) => {
            const isEnabled = subscriptions.find((subscription) => subscription.account_identifier === user.id);
            return { ...user, enabled: isEnabled ? isEnabled.enabled : false };
        });

        setTwitterData(items || []);
    }, [users, subscriptions]);

    return twitterData;
} 