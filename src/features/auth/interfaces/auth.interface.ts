export interface SignInUser {
    email: string;
    password: string;
}

export interface SignUpUser {
    email: string;
    password: string;
}

export interface AuthUser {
    user_uuid: string | null;
    email: string | null;
    role: RoleType | null;
    access_token: string | null;
    expires_at: number | null;
    avatar?: string | null;
    full_name?: string | null;
    isNewUser?: boolean | null;
    isLoggedIn?: boolean | null;
}


export const RoleTypes = {
    user: "user",
    admin: "admin",
    super_admin: "super_admin",
    support: "support",
} as const;

export type RoleType = (typeof RoleTypes)[keyof typeof RoleTypes];