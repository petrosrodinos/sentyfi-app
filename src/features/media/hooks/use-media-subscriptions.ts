import { useQuery, useMutation } from "@tanstack/react-query";
import { createMediaSubscription, createMediaSubscriptions, deleteMediaSubscription, getAdminMediaSubscriptions, getMediaSubscriptions, upsertMediaSubscription } from "../services/media-subscriptions";
import type { CreateMediaSubscription, MediaSubscriptionQuery } from "../interfaces/media-subscriptions";
import { toast } from "@/hooks/use-toast";


export function useCreateMediaSubscription() {
    return useMutation({
        mutationFn: (payload: CreateMediaSubscription) => createMediaSubscription(payload),
        onSuccess: () => {
            toast({
                title: "Media subscription created successfully",
                description: "You have successfully created a media subscription",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to create media subscription",
                description: "Please try again",
                duration: 3000,
                variant: "error",
            });
        },
    });
}

export function useCreateMediaSubscriptions() {
    return useMutation({
        mutationFn: (payload: CreateMediaSubscription[]) => createMediaSubscriptions(payload),
        onSuccess: () => {
            toast({
                title: "Media subscription created successfully",
                description: "You have successfully created a media subscription",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to create media subscription",
                description: "Please try again",
                duration: 3000,
                variant: "error",
            });
        },
    });
}

export function useUpsertMediaSubscription() {
    return useMutation({
        mutationFn: (payload: CreateMediaSubscription) => upsertMediaSubscription(payload),
        onSuccess: () => {
            toast({
                title: "Media subscription updated successfully",
                description: "You have successfully updated a media subscription",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to update media subscription",
                description: "Please try again",
                duration: 3000,
                variant: "error",
            });
        },
    });
}

export function useMediaSubscriptions(query: MediaSubscriptionQuery) {
    return useQuery({
        queryKey: ["media-subscriptions", query.platform_type],
        queryFn: () => getMediaSubscriptions(query),
        enabled: !!query,
        retry: false,
    });
}

export function useDeleteMediaSubscription() {
    return useMutation({
        mutationFn: (id: number) => deleteMediaSubscription(id),
        onSuccess: () => {
            toast({
                title: "Media subscription deleted successfully",
                description: "You have successfully deleted a media subscription",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to delete media subscription",
                description: "Please try again",
                duration: 3000,
                variant: "error",
            });

        },
    });
}


export function useAdminMediaSubscriptions(query: MediaSubscriptionQuery) {
    return useQuery({
        queryKey: ["admin-media-subscriptions"],
        queryFn: () => getAdminMediaSubscriptions(query),
        enabled: !!query,
        retry: false,
    });
}