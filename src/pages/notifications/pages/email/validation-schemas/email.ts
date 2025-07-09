import { z } from "zod";

export const EmailAddressSchema = z.object({
    emailAddress: z
        .string()
        .min(1, { message: "Please enter your email address" })
        .email({ message: "Please enter a valid email address" }),
});

export const VerificationCodeSchema = z.object({
    verificationCode: z
        .string()
        .min(1, { message: "Please enter the verification code" })
        .length(6, { message: "Verification code must be exactly 6 characters long" })
        .regex(/^[A-Za-z0-9]{6}$/, {
            message: "Please enter a valid 6-character verification code (letters and numbers only)",
        }),
});

export type EmailAddressFormValues = z.infer<typeof EmailAddressSchema>;
export type VerificationCodeFormValues = z.infer<typeof VerificationCodeSchema>; 