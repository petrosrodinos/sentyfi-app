import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type { AlertQuery } from "../interfaces/alert";
import { getAlerts, getUserlerts } from "../services/alert";
import { deleteAlert, deleteUserAlert } from "../services/alert";

export const useAlerts = (query: AlertQuery) => {
    return useQuery({
        queryKey: ["alerts", query],
        queryFn: () => getAlerts(query),
    });
};

export const useDeleteAlert = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAlert,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            toast({
                title: "Alert deleted",
                description: "The alert has been deleted",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete alert",
                variant: "error",
            });
        },
    });
};

export const useUserAlerts = (query: AlertQuery) => {
    return useQuery({
        queryKey: ["user-alerts", query],
        queryFn: () => getUserlerts(query),
    });
};

export const useDeleteUserAlert = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUserAlert,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-alerts"] });
            toast({
                title: "Alert deleted",
                description: "The alert has been deleted",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete alert",
                variant: "error",
            });
        },
    });
};

