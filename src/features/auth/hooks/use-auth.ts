import { signIn } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type { LoggedInUser } from "@/features/user/interfaces/user";
import type { SignInUser, SignUpUser } from "../interfaces/auth.interface";
import { Routes } from "@/routes/routes";


export function useSignin() {
    const { login } = useAuthStore((state) => state);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: SignInUser) => signIn(data),
        onSuccess: (data: LoggedInUser) => {
            if (data.isNewUser) {
                login({
                    ...data,
                });
                navigate(Routes.dashboard);
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
                navigate(Routes.dashboard);
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
                    title: "Register successful",
                    description: "You have successfully registered in",
                    duration: 2000,
                });
                navigate("/dashboard");
            }
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