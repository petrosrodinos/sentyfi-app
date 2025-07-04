export interface NotificationChannel extends CreateNotificationChannel {
    id: string;
    uuid: string;
    verified: boolean;
}

export interface CreateNotificationChannel {
    user_uuid: string;
    channel: NotificationChannelType;
    enabled: boolean;
}

export interface UpdateNotificationChannel {
    id: string;
    enabled: boolean;
}

export interface NotificationChannelQuery {
    user_uuid?: string;
    channel?: NotificationChannelType;
    verified?: boolean;
    enabled?: boolean;
}

export interface NotificationChannelData {
    id: string | null;
    channel?: NotificationChannelType;
    title: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
    verified: boolean;
    setup_status: "not_setup" | "partially_setup" | "fully_setup";
}

export const NotificationChannelTypes = {
    email: "email",
    phone: "phone",
    push: "push",
    web: "web",
    telegram: "telegram",
    whatsapp: "whatsapp",
    discord: "discord",
    sms: "sms",
} as const;

export type NotificationChannelType = (typeof NotificationChannelTypes)[keyof typeof NotificationChannelTypes];