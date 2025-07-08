import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { getNotificationChannels, createNotificationChannel, updateNotificationChannel, deleteNotificationChannel } from "../services/notification-channels";
import type { CreateNotificationChannel, NotificationChannelQuery, UpdateNotificationChannel } from "../interfaces/notification-channels";

export function useNotificationChannels(query: NotificationChannelQuery) {
    return useQuery({
        queryKey: ["notification-channels", query.channel],
        queryFn: () => getNotificationChannels(query),
        enabled: !!query,
        retry: false,
    });
}

export function useGetNotificationChannels() {
    return useMutation({
        mutationFn: (query: NotificationChannelQuery) => getNotificationChannels(query),
        onError: () => {
            toast({
                title: "Failed to fetch notification channels",
                description: "Please try again",
                duration: 3000,
            });
        },
    });
}

export function useCreateNotificationChannel() {
    return useMutation({
        mutationFn: (payload: CreateNotificationChannel) => createNotificationChannel(payload),
        onSuccess: () => {
            toast({
                title: "Notification channel created successfully",
                description: "You have successfully created a notification channel",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to create notification channel",
                description: "Please try again",
                duration: 3000,
            });
        },
    });
}


export function useUpdateNotificationChannel() {
    return useMutation({
        mutationFn: (payload: UpdateNotificationChannel) => updateNotificationChannel(payload),
        onSuccess: () => {
            toast({
                title: "Notification channel updated successfully",
                description: "You have successfully updated a notification channel",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to update notification channel",
                description: "Please try again",
                duration: 3000,
            });
        },
    });
}


export function useDeleteNotificationChannel() {
    return useMutation({
        mutationFn: deleteNotificationChannel,
        onSuccess: () => {
            toast({
                title: "Notification channel deleted successfully",
                description: "You have successfully deleted a notification channel",
                duration: 1000,
            });
        },
        onError: () => {
            toast({
                title: "Failed to delete notification channel",
                description: "Please try again",
                duration: 3000,
            });
        },
    });
};
