import axiosInstance from "@/config/axios";
import type { CreateNotificationChannel, NotificationChannel, NotificationChannelData, NotificationChannelQuery, UpdateNotificationChannel } from "../interfaces/notification-channels";


export const getNotificationChannels = async (query: NotificationChannelQuery): Promise<NotificationChannel[]> => {
    try {
        const response = await axiosInstance.get("/notification-channels", { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch notification channels. Please try again.");
    }
};

export const createNotificationChannel = async (payload: CreateNotificationChannel): Promise<NotificationChannelData> => {
    try {
        const response = await axiosInstance.post("/notification-channels", payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create notification channel. Please try again.");
    }
};

export const updateNotificationChannel = async (payload: UpdateNotificationChannel): Promise<NotificationChannel> => {
    try {
        const response = await axiosInstance.patch(`/notification-channels/${payload.id}`, payload);
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