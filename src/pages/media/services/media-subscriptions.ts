import axiosInstance from "@/config/axios";
import type { MediaSubscription, MediaSubscriptionQuery } from "../interfaces/media-subscriptions";
import type { CreateMediaSubscription } from "../interfaces/media-subscriptions";

export const createMediaSubscription = async (payload: CreateMediaSubscription): Promise<MediaSubscription> => {
    try {
        const response = await axiosInstance.post("/media-subscriptions/create", payload);

        return response.data;

    } catch (error) {
        throw new Error("Failed to create media subscription. Please try again.");
    }
};


export const createMediaSubscriptions = async (payload: CreateMediaSubscription[]): Promise<CreateMediaSubscription[]> => {
    try {
        const response = await axiosInstance.post("/media-subscriptions", { items: payload });

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
        const response = await axiosInstance.get("/media-subscriptions", { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch media subscriptions. Please try again.");
    }
};

export const deleteMediaSubscription = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/media-subscriptions/${id}`);
    } catch (error) {
        throw new Error("Failed to delete media subscription. Please try again.");
    }
};

