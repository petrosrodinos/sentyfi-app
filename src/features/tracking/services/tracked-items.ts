import axiosInstance from "@/config/api/axios";
import type { CreateTrackedItem, TrackedItem, TrackedItemQuery, UpdateTrackedItem } from "../interfaces/tracked-items";
import { ApiRoutes } from "@/config/api/routes";

export const getTrackedItems = async (query: TrackedItemQuery): Promise<TrackedItem[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.tracking.tracked_items.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch tracked items. Please try again.");
    }
};

export const createTrackedItem = async (trackedItem: CreateTrackedItem): Promise<TrackedItem> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.tracking.tracked_items.create, trackedItem);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create tracked item. Please try again.");
    }
};

export const updateTrackedItem = async (trackedItem: UpdateTrackedItem): Promise<TrackedItem> => {
    try {
        const response = await axiosInstance.patch(`${ApiRoutes.tracking.tracked_items.prefix}/${trackedItem.id}`, trackedItem);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update tracked item. Please try again.");
    }
};

export const upsertTrackedItem = async (trackedItem: CreateTrackedItem): Promise<TrackedItem> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.tracking.tracked_items.upsert, trackedItem);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update tracked item. Please try again.");
    }
};

export const deleteTrackedItem = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`${ApiRoutes.tracking.tracked_items.prefix}/${id}`);
    } catch (error) {
        throw new Error("Failed to delete tracked item. Please try again.");
    }
};

