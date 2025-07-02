import axiosInstance from "@/config/axios";
import type { NotificationChannelData, NotificationChannelQuery } from "../interfaces/notification-channels";


export const getNotificationChannels = async (query: NotificationChannelQuery): Promise<NotificationChannelData[]> => {
    try {
        const response = await axiosInstance.get("/notification-channels", { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch notification channels. Please try again.");
    }
};

export const createNotificationChannel = async (payload: NotificationChannelData): Promise<NotificationChannelData> => {
    try {
        const response = await axiosInstance.post("/notification-channels", payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create notification channel. Please try again.");
    }
};

export const updateNotificationChannel = async (id: string, payload: NotificationChannelData): Promise<NotificationChannelData> => {
    try {
        const response = await axiosInstance.put(`/notification-channels/${id}`, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update notification channel. Please try again.");
    }
};

export const deleteNotificationChannel = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/notification-channels/${id}`);
    } catch (error) {
        throw new Error("Failed to delete notification channel. Please try again.");
    }
}