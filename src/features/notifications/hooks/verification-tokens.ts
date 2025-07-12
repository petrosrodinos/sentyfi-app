import { useMutation } from "@tanstack/react-query";
import { createVerificationToken, verifyVerificationToken } from "../services/verification-tokens";
import { toast } from "@/hooks/use-toast";
import type { CreateVerificationToken } from "../interfaces/verification-tokens";

export function useCreateVerificationToken() {
    return useMutation({
        mutationFn: (payload: CreateVerificationToken) => createVerificationToken(payload),
        onSuccess: () => {
            toast({
                title: "Verification token created successfully",
                description: "You have successfully created a verification token",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to create verification token",
                description: "Please try again",
                duration: 3000,
            });
        },
    });
}

export function useVerifyVerificationToken() {
    return useMutation({
        mutationFn: (token: string) => verifyVerificationToken(token),
        onSuccess: () => {
            toast({
                title: "Verification token verified successfully",
                description: "You have successfully verified a verification token",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to verify verification token",
                description: "Please try again",
                duration: 3000,
            });
        },
    });
}