import type { AuthUser } from "@/features/auth/interfaces/auth.interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore extends AuthUser {
    login(user: any): void;
    logout(): void;
    updateUser(user: any): void;
}

const initialValues: UserStore = {
    isLoggedIn: false,
    isNewUser: true,
    user_uuid: null,
    role: null,
    full_name: "",
    email: null,
    access_token: null,
    expires_at: null,
    avatar: null,
    login: () => { },
    logout: () => { },
    updateUser: () => { },
};

const STORE_KEY = "auth";

export const useAuthStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                login: (user: AuthUser) => {
                    set((state) => ({
                        ...state,
                        ...user,
                    }));
                },
                logout: () => {
                    set(initialValues);
                    localStorage.removeItem(STORE_KEY);
                    window.location.href = "/auth/sign-in";
                },
                updateUser: async (user: Partial<AuthUser>) => {
                    set((state) => ({ ...state, ...user }));
                },
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getAuthStoreState = () => useAuthStore.getState();