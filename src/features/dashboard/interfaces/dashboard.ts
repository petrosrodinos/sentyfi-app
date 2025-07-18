import type { UserAlert } from "@/features/alert/interfaces/alert";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";
import type { NotificationChannel } from "@/features/notifications/interfaces/notification-channels";
import type { TrackedItem } from "@/features/tracking/interfaces/tracked-items";

export interface UserDashboardResponse {
    user: {
        alerts: UserAlert[];
        tracked_items: Partial<TrackedItem>[];
        media_subscriptions: Partial<MediaSubscription>[];
        notification_channels: Partial<NotificationChannel>[];
        counts: {
            user_alerts_count: number;
        };
    };
}