import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type { AlertQuery } from "../interfaces/alert";
import { getAlerts } from "../services/alert";
import { deleteAlert } from "../services/alert";

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

