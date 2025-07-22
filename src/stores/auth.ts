import { PlanTypes } from "@/constants/subscription";
import type { LoggedInUser } from "@/features/user/interfaces/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore extends LoggedInUser {
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
    expires_in: null,
    avatar: null,
    identities: [],
    plan_subscription: {
        plan: PlanTypes.free,
    },
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
                login: (user: LoggedInUser) => {
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
                updateUser: async (user: Partial<LoggedInUser>) => {
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