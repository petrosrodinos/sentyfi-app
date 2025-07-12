import type { Privileges as PrivilegesType } from "@/interfaces/privileges";
import { NotificationChannelTypes } from "@/features/notifications/interfaces/notification-channels";

const MAX = 100;

export const Privileges: PrivilegesType = {
    free: {
        access: {
            analytics: false,
        },
        media_subscriptions: 3,
        tracked_items: 3,
        notifications_channels: [NotificationChannelTypes.telegram, NotificationChannelTypes.email, NotificationChannelTypes.sms],
    },
    basic: {
        access: {
            analytics: true,
        },
        media_subscriptions: MAX,
        tracked_items: MAX,
        notifications_channels: [NotificationChannelTypes.telegram, NotificationChannelTypes.email, NotificationChannelTypes.sms],
    },
    professional: {
        access: {
            analytics: true,
        },
        media_subscriptions: MAX,
        tracked_items: MAX,
        notifications_channels: [NotificationChannelTypes.telegram, NotificationChannelTypes.email, NotificationChannelTypes.sms],
    },
};