import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../../../../features/notifications/interfaces/notification-channels";
import { useNotificationChannels } from "../../../../../features/notifications/hooks/use-notification-channels";

export function useTelegramNotifications() {
    const { user_uuid } = useAuthStore();
    const [telegramConnected, setTelegramConnected] = useState(false);
    const [telegramEnabled, setTelegramEnabled] = useState(false);

    const {
        data: telegramChannel,
        error,
        isLoading: isLoadingTelegramChannel,
    } = useNotificationChannels({
        user_uuid: user_uuid!,
        channel: NotificationChannelTypes.telegram,
    });

    useEffect(() => {
        if (telegramChannel) {
            setTelegramConnected(telegramChannel[0]?.verified || false);
            setTelegramEnabled(telegramChannel[0]?.enabled || false);
        }
    }, [telegramChannel]);

    useEffect(() => {
        if (error) {
            setTelegramConnected(false);
            setTelegramEnabled(false);
        }
    }, [error]);

    return {
        telegramChannel,
        telegramConnected,
        telegramEnabled,
        isLoadingTelegramChannel,
        error,
        user_uuid,
    };
} 