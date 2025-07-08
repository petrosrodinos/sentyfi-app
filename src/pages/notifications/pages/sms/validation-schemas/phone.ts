import { z } from "zod";

export const PhoneNumberSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, { message: "Please enter your phone number" })
        .min(8, { message: "Phone number must be at least 8 characters long" })
        .regex(/^\+[1-9]\d{1,14}$/, {
            message: "Please enter a valid international phone number (e.g., +1234567890)",
        }),
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

export type PhoneNumberFormValues = z.infer<typeof PhoneNumberSchema>;
export type VerificationCodeFormValues = z.infer<typeof VerificationCodeSchema>; 