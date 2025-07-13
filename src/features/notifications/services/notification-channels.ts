import axiosInstance from "@/config/api/axios";
import type { CreateNotificationChannel, NotificationChannel, NotificationChannelData, NotificationChannelQuery, UpdateNotificationChannel } from "../interfaces/notification-channels";
import { ApiRoutes } from "@/config/api/routes";


export const getNotificationChannels = async (query: NotificationChannelQuery): Promise<NotificationChannel[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.notification_channels.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch notification channels. Please try again.");
    }
};

export const createNotificationChannel = async (payload: CreateNotificationChannel): Promise<NotificationChannelData> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.notification_channels.prefix, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create notification channel. Please try again.");
    }
};

export const updateNotificationChannel = async (payload: UpdateNotificationChannel): Promise<NotificationChannel> => {
    try {
        const response = await axiosInstance.patch(`${ApiRoutes.notification_channels.prefix}/${payload.id}`, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update notification channel. Please try again.");
    }
};

export const deleteNotificationChannel = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`${ApiRoutes.notification_channels.prefix}/${id}`);
    } catch (error) {
        throw new Error("Failed to delete notification channel. Please try again.");
    }
}