import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { getNotificationChannels, createNotificationChannel, updateNotificationChannel, deleteNotificationChannel } from "../services/notification-channels";
import type { NotificationChannelData, NotificationChannelQuery } from "../interfaces/notification-channels";

export function useNotificationChannels(query: NotificationChannelQuery) {
    return useQuery({
        queryKey: ["notification-channels"],
        queryFn: () => getNotificationChannels(query),
        enabled: !!query,
        retry: false,
    });
}

export function useCreateNotificationChannel() {
    return useMutation({
        mutationFn: createNotificationChannel,
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
        mutationFn: (payload: NotificationChannelData) => updateNotificationChannel(payload.id, payload),
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
