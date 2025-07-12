import { signIn } from "../services/auth";
import { type AuthUser, type SignInUser } from "../interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";
import type { SignUpUser } from "../interfaces/auth.interface";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";


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
                    duration: 2000,
                });
                navigate("/dashboard");
            }
        },
        onError: (error: any) => {
            toast({
                title: "Could not sign in",
                description: error?.message || "An unexpected error occurred",
                duration: 3000,
                variant: "error",
            });
        },
    });
}


export function useSignup() {
    const { login } = useAuthStore((state) => state);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: SignUpUser) => signUp(data),
        onSuccess: (data) => {
            login(data);
            toast({
                title: "Register successful",
                description: "You have successfully registered in",
                duration: 2000,
            });
            navigate("/dashboard");
        },
        onError: (error) => {
            toast({
                title: "Could not sign up",
                description: error.message,
                duration: 3000,
                variant: "error",
            });
        },
    });
} 