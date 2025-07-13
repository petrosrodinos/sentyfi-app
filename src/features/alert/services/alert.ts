import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { AlertQuery, UserAlert } from "../interfaces/alert";

export const getAlerts = async (query: AlertQuery): Promise<UserAlert[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.user_alerts.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch alerts. Please try again.");
    }
}

export const deleteAlert = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`${ApiRoutes.user_alerts.prefix}/${id}`);
    } catch (error) {
        throw new Error("Failed to delete alert. Please try again.");
    }
}
