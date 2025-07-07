export interface MediaSubscription extends CreateMediaSubscription {
    id: number;
    uuid: string;
    user_uuid: string;
}


export interface CreateMediaSubscription {
    platform_type: MediaSubscriptionPlatformType;
    account_identifier: string;
    enabled: boolean;
    meta?: {
        [key: string]: any;
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