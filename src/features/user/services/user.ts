import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get(ApiRoutes.users.me);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch current user. Please try again.");
    }
}
