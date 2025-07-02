export interface NotificationChannelData {
    id: string;
    type?: NotificationChannelType;
    title: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
    requirements: string[];
    requirements_met: boolean;
    action_required: string | null;
    setup_status: "not_setup" | "partially_setup" | "fully_setup";
    last_used?: string;
    notification_count?: number;
}

export interface NotificationChannelQuery {
    user_uuid?: string;
    channel?: string;
    verified?: boolean;
    enabled?: boolean;
}

export const NotificationChannelTypes = {
    email: "email",
    phone: "phone",
    push: "push",
    web: "web",
    telegram: "telegram",
    whatsapp: "whatsapp",
    slack: "slack",
    discord: "discord",
} as const;

export type NotificationChannelType = (typeof NotificationChannelTypes)[keyof typeof NotificationChannelTypes];