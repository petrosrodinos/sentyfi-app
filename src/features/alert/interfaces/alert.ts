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

export interface AlertQuery {
    platform_type: MediaSubscriptionPlatformType;
    account_identifier: string;
    sentiment: AlertSentiment;
    severity: AlertSeverity;
    popularity: number;
    tickers: string[];
}

export const AlertSentiments = {
    positive: 'positive',
    negative: 'negative',
    neutral: 'neutral',
} as const;

export const AlertSeverities = {
    low: 'low',
    medium: 'medium',
    high: 'high',
} as const;

export type AlertSentiment = (typeof AlertSentiments)[keyof typeof AlertSentiments];
export type AlertSeverity = (typeof AlertSeverities)[keyof typeof AlertSeverities];