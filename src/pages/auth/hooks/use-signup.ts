import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";
import type { SignUpUser } from "../interfaces/auth";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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
                duration: 1000,
            });
            navigate("/dashboard");
        },
        onError: (error) => {
            toast({
                title: "Could not sign up",
                description: error.message,
                duration: 3000,
            });
        },
    });
} 