import axiosInstance from "@/config/axios";
import type { CreateTrackedItem, TrackedItem, TrackedItemQuery, UpdateTrackedItem } from "../interfaces/tracked-items";

export const getTrackedItems = async (query: TrackedItemQuery): Promise<TrackedItem[]> => {
    try {
        const response = await axiosInstance.get("/tracked-items", { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch tracked items. Please try again.");
    }
};

export const createTrackedItem = async (trackedItem: CreateTrackedItem): Promise<TrackedItem> => {
    try {
        const response = await axiosInstance.post("/tracked-items/create", trackedItem);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create tracked item. Please try again.");
    }
};

export const updateTrackedItem = async (trackedItem: UpdateTrackedItem): Promise<TrackedItem> => {
    try {
        const response = await axiosInstance.patch(`/tracked-items/${trackedItem.id}`, trackedItem);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update tracked item. Please try again.");
    }
};

export const deleteTrackedItem = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/tracked-items/${id}`);
    } catch (error) {
        throw new Error("Failed to delete tracked item. Please try again.");
    }
};

