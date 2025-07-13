import axiosInstance from "@/config/api/axios";
import type { MediaSubscription, MediaSubscriptionQuery, CreateMediaSubscription } from "../../../features/media/interfaces/media-subscriptions";
import { ApiRoutes } from "@/config/api/routes";

export const createMediaSubscription = async (payload: CreateMediaSubscription): Promise<MediaSubscription> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.media.subscriptions.create, payload);

        return response.data;

    } catch (error) {
        throw new Error("Failed to create media subscription. Please try again.");
    }
};


export const createMediaSubscriptions = async (payload: CreateMediaSubscription[]): Promise<CreateMediaSubscription[]> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.media.subscriptions.prefix, { items: payload });

        if (response.data.count > 0) {
            return payload;

        }

        throw new Error("Failed to create media subscription. Please try again.");

    } catch (error) {
        throw new Error("Failed to create media subscription. Please try again.");
    }
};

export const getMediaSubscriptions = async (query: MediaSubscriptionQuery): Promise<MediaSubscription[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.media.subscriptions.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch media subscriptions. Please try again.");
    }
};

export const deleteMediaSubscription = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`${ApiRoutes.media.subscriptions.prefix}/${id}`);
    } catch (error) {
        throw new Error("Failed to delete media subscription. Please try again.");
    }
};

export const upsertMediaSubscription = async (payload: CreateMediaSubscription): Promise<MediaSubscription> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.media.subscriptions.upsert, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to upsert media subscription. Please try again.");
    }
};
