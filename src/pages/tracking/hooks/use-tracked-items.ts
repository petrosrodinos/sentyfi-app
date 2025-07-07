import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createTrackedItem, deleteTrackedItem, getTrackedItems, updateTrackedItem, upsertTrackedItem } from "../services/tracked-items";
import type { CreateTrackedItem, TrackedItemQuery, UpdateTrackedItem } from "../interfaces/tracked-items";


export function useTrackedItems(query: TrackedItemQuery) {
    return useQuery({
        queryKey: ["tracked-items", query.item_type],
        queryFn: () => getTrackedItems(query),
        retry: false,
    });
}

export function useCreateTrackedItem() {
    return useMutation({
        mutationFn: (trackedItem: CreateTrackedItem) => createTrackedItem(trackedItem),
        onSuccess: () => {
            toast({
                title: "Tracked item created successfully",
                description: "You have successfully created a tracked item",
            });
        },
        onError: () => {
            toast({
                title: "Failed to create tracked item",
                description: "Please try again",
            });
        },
    });
}

export function useUpdateTrackedItem() {
    return useMutation({
        mutationFn: (trackedItem: UpdateTrackedItem) => updateTrackedItem(trackedItem),
        onSuccess: () => {
            toast({
                title: "Tracked item updated successfully",
                description: "You have successfully updated a tracked item",
            });
        },
        onError: () => {
            toast({
                title: "Failed to update tracked item",
                description: "Please try again",
            });
        },
    });
}

export function useUpsertTrackedItem() {
    return useMutation({
        mutationFn: (trackedItem: CreateTrackedItem) => upsertTrackedItem(trackedItem),
        onSuccess: () => {
            toast({
                title: "Tracked item updated successfully",
                description: "You have successfully updated a tracked item",
            });
        },
        onError: () => {
            toast({
                title: "Failed to update tracked item",
                description: "Please try again",
            });
        },
    });
}

export function useDeleteTrackedItem() {
    return useMutation({
        mutationFn: (id: number) => deleteTrackedItem(id),
        onSuccess: () => {
            toast({
                title: "Tracked item deleted successfully",
                description: "You have successfully deleted a tracked item",
            });
        },
        onError: () => {
            toast({
                title: "Failed to delete tracked item",
                description: "Please try again",
            });
        },
    });
}


