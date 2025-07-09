import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../../interfaces/notification-channels";
import { useNotificationChannels } from "../../../hooks/use-notification-channels";

export function useSmsNotifications() {
    const { user_uuid } = useAuthStore();
    const [smsEnabled, setSmsEnabled] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);

    const {
        data: smsChannel,
        error,
        isLoading: isLoadingSmsChannel,
    } = useNotificationChannels({
        user_uuid: user_uuid!,
        channel: NotificationChannelTypes.sms,
    });

    useEffect(() => {
        if (smsChannel) {
            setSmsEnabled(smsChannel[0]?.enabled || false);
            setPhoneVerified(smsChannel[0]?.verified || false);
        }
    }, [smsChannel]);

    useEffect(() => {
        if (error) {
            setSmsEnabled(false);
            setPhoneVerified(false);
        }
    }, [error]);

    return {
        smsChannel,
        smsEnabled,
        phoneVerified,
        isLoadingSmsChannel,
        error,
    };
} 