import type { MediaSubscriptionPlatformType } from "@/features/media/interfaces/media-subscriptions";
import type { NotificationChannelType } from "@/features/notifications/interfaces/notification-channels";

export interface UserAlert {
    id: number;
    uuid: string;
    user_uuid: string;
    alert_uuid: string;
    alert: Alert;
    notification_channels: NotificationChannelType[];
    created_at: string;
    updated_at: string;
}

export interface Alert {
    id: string;
    uuid: string;
    title: string;
    description: string;
    tickers: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    severity: 'low' | 'medium' | 'high';
    popularity: number;
    post_ids: string[];
    platform_type: MediaSubscriptionPlatformType;
    account_identifier: string;
}