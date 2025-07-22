import type { NotificationChannel } from "@/features/notifications/interfaces/notification-channels";
import type { PlanSubscription } from "@/features/subscriptions/interfaces/subscription";

export interface User {
    id: string;
    uuid: string;
    email: string;
    role: RoleType;
    ref_code?: string;
    identities?: Identity[];
    notification_channels?: NotificationChannel[];
    created_at: string;
    updated_at: string;
}

export interface UserQuery {
    id?: string;
    page?: number;
    limit?: number;
    search?: string;
    order_by?: string;
    email?: string;
    ref_code?: string;
}

export interface LoggedInUser {
    user_uuid: string | null;
    email: string | null;
    role: RoleType | null;
    plan_subscription?: PlanSubscription;
    identities?: Identity[] | null;
    access_token: string | null;
    expires_in: number | null;
    avatar?: string | null;
    full_name?: string | null;
    isNewUser?: boolean | null;
    isLoggedIn?: boolean | null;
}


export interface Identity {
    uuid: string;
    provider: string;
    provider_id: string;
    verified: boolean;
    created_at: string;
}


export const RoleTypes = {
    user: "user",
    admin: "admin",
    super_admin: "super_admin",
    support: "support",
} as const;

export type RoleType = (typeof RoleTypes)[keyof typeof RoleTypes];