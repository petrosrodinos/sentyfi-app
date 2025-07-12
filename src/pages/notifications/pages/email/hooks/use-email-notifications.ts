import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../../../../features/notifications/interfaces/notification-channels";
import { useNotificationChannels } from "../../../../../features/notifications/hooks/use-notification-channels";

export function useEmailNotifications() {
    const { user_uuid } = useAuthStore();
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const {
        data: emailChannel,
        error,
        isLoading: isLoadingEmailChannel,
    } = useNotificationChannels({
        user_uuid: user_uuid!,
        channel: NotificationChannelTypes.email,
    });

    useEffect(() => {
        if (emailChannel) {
            setEmailEnabled(emailChannel[0]?.enabled || false);
            setEmailVerified(emailChannel[0]?.verified || false);
        }
    }, [emailChannel]);

    useEffect(() => {
        if (error) {
            setEmailEnabled(false);
            setEmailVerified(false);
        }
    }, [error]);

    return {
        emailChannel,
        emailEnabled,
        emailVerified,
        isLoadingEmailChannel,
        error,
    };
} 