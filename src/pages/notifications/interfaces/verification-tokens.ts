
export interface VerificationToken extends CreateVerificationToken {
    id: string;
    uuid: string;
    token: string;
    state?: string;
    identity_uuid?: string;
    expires_at?: Date;
}

export interface CreateVerificationToken {
    type: VerificationTokenType;
    user_uuid: string;
}

export interface VerificationTokenQuery {
    user_uuid?: string;
    type?: VerificationTokenType;
    state?: string;
    identity_uuid?: string;
}

export const VerificationTokenType = {
    telegram: "telegram",
    email: "email",
    phone: "phone",
    whatsapp: "whatsapp",
    twitter: "twitter",
    facebook: "facebook",
    google: "google",
} as const;

export type VerificationTokenType = (typeof VerificationTokenType)[keyof typeof VerificationTokenType];

