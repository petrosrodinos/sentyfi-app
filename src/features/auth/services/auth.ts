import { formatAuthUser } from "../utils/auth.utils";
import axiosInstance from "@/config/api/axios";
import type { AuthUser, SignInUser, SignUpUser } from "../interfaces/auth.interface";
import { ApiRoutes } from "@/config/api/routes";

export const signIn = async (
    { email, password }: SignInUser,
): Promise<AuthUser> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.auth.email.login, {
            email,
            password,
        });

        const auth_response = response.data;
        return formatAuthUser(auth_response);

    } catch (error) {
        throw new Error("Failed to sign in. Please try again.");
    }
};

export const signUp = async ({ email, password }: SignUpUser): Promise<AuthUser> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.auth.email.register, {
            email,
            password,
        });

        const auth_response = response.data;
        return formatAuthUser(auth_response);
    } catch (error) {
        throw new Error("Failed to sign up. Please try again.");
    }
};

export const forgotPassword = async (email: string) => {
    try {

    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw error;
    }
};

export const resetPassword = async (password: string) => {
    try {

    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};

export const updatePassword = async (
    email: string,
    old_password: string,
    password: string,
) => {
    try {

    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};

export const signOut = async () => {

};
