import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { UserQuery } from "../interfaces/user";

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get(ApiRoutes.users.me);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch current user. Please try again.");
    }
}

export const getUsers = async (query: UserQuery) => {
    try {
        const response = await axiosInstance.get(ApiRoutes.users.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again.");
    }
}

export const deleteUser = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(`${ApiRoutes.users.prefix}/${uuid}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to delete user. Please try again.");
    }
}
