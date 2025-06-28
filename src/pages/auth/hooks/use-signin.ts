import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/auth";
import { toast } from "@/hooks/use-toast";
import { type AuthUser, type SignInUser } from "../interfaces/auth";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";

export function useSignin() {
    const { login } = useAuthStore((state) => state);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: SignInUser) => signIn(data),
        onSuccess: (data: AuthUser) => {
            if (data.isNewUser) {
                login({
                    ...data,
                });
                navigate("/dashboard");
            } else {
                login({
                    ...data,
                    isLoggedIn: true,
                });
                toast({
                    title: "Login successful",
                    description: "You have successfully logged in",
                    duration: 3000,
                });
                navigate("/dashboard");
            }
        },
        onError: (error: any) => {
            toast({
                title: "Could not sign in",
                description: error?.message || "An unexpected error occurred",
                duration: 3000,
                variant: "destructive",
            });
        },
    });
} 