import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { AlertQuery, AlertsResponse, UserAlertsResponse } from "../interfaces/alert";

export const getAlerts = async (query: AlertQuery): Promise<AlertsResponse> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.alerts.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch alerts. Please try again.");
    }
}

export const deleteAlert = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`${ApiRoutes.alerts.prefix}/${id}`);
    } catch (error) {
        throw new Error("Failed to delete alert. Please try again.");
    }
}

export const getUserlerts = async (query: AlertQuery): Promise<UserAlertsResponse> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.user_alerts.prefix, { params: query });
        return response.data.user;
    } catch (error) {
        throw new Error("Failed to fetch alerts. Please try again.");
    }
}

export const deleteUserAlert = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`${ApiRoutes.user_alerts.prefix}/${id}`);
    } catch (error) {
        throw new Error("Failed to delete alert. Please try again.");
    }
}


