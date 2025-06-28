import { type AuthUser, type SignInUser, type SignUpUser } from "../interfaces/auth";

export const signIn = async (
    { email, password }: SignInUser,
): Promise<AuthUser | any> => {
    try {

        return {
            user_id: "1",
            email: email,
            access_token: "1",
            expires_at: 1,
            isLoggedIn: true,
            password: password,
        }


    } catch (error) {
        console.error("Error signing in:", error);
        throw new Error("User not found");
    }
};

export const signUp = async ({ email, password }: SignUpUser) => {
    try {

    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
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
