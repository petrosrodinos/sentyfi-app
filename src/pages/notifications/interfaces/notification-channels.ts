export interface NotificationChannelData {
    id: string;
    channel?: NotificationChannelType;
    title: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
    verified: boolean;
    setup_status: "not_setup" | "partially_setup" | "fully_setup";
}

export interface NotificationChannel {
    id: string;
    uuid: string;
    user_uuid: string;
    channel: NotificationChannelType;
    enabled: boolean;
    verified: boolean;
}

export interface NotificationChannelQuery {
    user_uuid?: string;
    channel?: NotificationChannelType;
    verified?: boolean;
    enabled?: boolean;
}

export const NotificationChannelTypes = {
    email: "email",
    phone_call: "phone_call",
    push: "push",
    web: "web",
    telegram: "telegram",
    whatsapp: "whatsapp",
    discord: "discord",
    sms: "sms",
} as const;

export type NotificationChannelType = (typeof NotificationChannelTypes)[keyof typeof NotificationChannelTypes];