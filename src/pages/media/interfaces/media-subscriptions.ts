export interface MediaSubscription extends CreateMediaSubscription {
    id: number;
}


export interface CreateMediaSubscription {
    platform_type: MediaSubscriptionPlatformType;
    account_identifier: string;
    enabled: boolean;
    meta?: {
        [key: string]: string;
    }
}

export interface MediaSubscriptionQuery {
    user_uuid?: string;
    platform_type?: MediaSubscriptionPlatformType;
    account_identifier?: string;
    enabled?: boolean;
}

export const MediaSubscriptionPlatformTypes = {
    twitter: "twitter",
    youtube: "youtube",
    reddit: "reddit",
    news: "news",
} as const;

export type MediaSubscriptionPlatformType = (typeof MediaSubscriptionPlatformTypes)[keyof typeof MediaSubscriptionPlatformTypes];