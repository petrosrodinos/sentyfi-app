import { useEffect, useState } from "react";
import { useNotificationChannels } from "../../../../../features/notifications/hooks/use-notification-channels";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelsData } from "../data";
import type { NotificationChannelData } from "../../../../../features/notifications/interfaces/notification-channels";

export function useNotificationChannelsData() {
    const [notificationChannels, setNotificationChannels] = useState<NotificationChannelData[]>(NotificationChannelsData);
    const { user_uuid } = useAuthStore();
    const { data, isLoading } = useNotificationChannels({ user_uuid: user_uuid! });

    useEffect(() => {
        if (data?.length) {
            const channels = NotificationChannelsData.map((channel) => {
                const channel_data = data.find((c) => c.channel === channel.channel);
                if (!channel_data) {
                    return channel;
                }
                return {
                    ...channel,
                    id: channel_data.id,
                    enabled: channel_data.enabled,
                    verified: channel_data.verified,
                    setup_status: channel_data.verified ? "fully_setup" : "not_setup",
                };
            });

            const sortedChannels = channels.sort((a, b) => {
                if (a.verified && !b.verified) return -1;
                if (!a.verified && b.verified) return 1;
                return 0;
            });

            setNotificationChannels(sortedChannels as unknown as NotificationChannelData[]);
        }
    }, [data]);

    return {
        notificationChannels,
        isLoading,
    };
} 