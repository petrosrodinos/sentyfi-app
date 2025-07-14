import type { PlanType } from "@/constants/subscription";

export interface PlanSubscription {
    id?: string;
    user_uuid?: string;
    plan: PlanType;
    start_date?: string;
    end_date?: string;
    status?: "active" | "inactive" | "expired";
    created_at?: string;
}