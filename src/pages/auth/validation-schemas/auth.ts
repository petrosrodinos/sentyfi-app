import { z } from "zod";

export const SignInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(1, {
            message: "Please enter your password",
        })
        .min(6, {
            message: "Password must be at least 6 characters long",
        }),
});

export const SignUpSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Please enter your email" })
            .email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(1, {
                message: "Please enter your password",
            })
            .min(6, {
                message: "Password must be at least 6 characters long",
            }),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match.",
        path: ["confirm_password"],
    });

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match.",
    path: ["confirm_password"],
});

export const UpdatePasswordSchema = z.object({
    old_password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match.",
    path: ["confirm_password"],
});
export type SignInFormValues = z.infer<typeof SignInSchema>;
export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
export type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordSchema>;
