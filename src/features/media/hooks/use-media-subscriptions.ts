import { useQuery, useMutation } from "@tanstack/react-query";
import { createMediaSubscription, createMediaSubscriptions, deleteMediaSubscription, getMediaSubscriptions, upsertMediaSubscription } from "../services/media-subscriptions";
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
            });
        },
    });
}

export function useUpsertMediaSubscription() {
    return useMutation({
        mutationFn: (payload: CreateMediaSubscription) => upsertMediaSubscription(payload),
        onSuccess: () => {
            toast({
                title: "Media subscription upserted successfully",
                description: "You have successfully upserted a media subscription",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to upsert media subscription",
                description: "Please try again",
                duration: 3000,
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
            });

        },
    });
}
