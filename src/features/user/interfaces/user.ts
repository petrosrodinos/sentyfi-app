import type { PlanSubscription } from "@/features/subscriptions/interfaces/subscription";

export interface User {
    user_uuid: string | null;
    email: string | null;
    role: RoleType | null;
    plan_subscription?: PlanSubscription | null;
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