import type { NotificationChannelType } from "@/features/notifications/interfaces/notification-channels";

type AccessPermissions = {
    analytics: boolean;
};

type PrivilegeTier = {
    access: AccessPermissions;
    media_subscriptions: number;
    tracked_items: number;
    notifications_channels: NotificationChannelType[];
};

export interface Privileges {
    free: PrivilegeTier;
    basic: PrivilegeTier;
    professional: PrivilegeTier;
}