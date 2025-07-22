import { getCurrentUser, getUsers, deleteUser } from "../services/user";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserQuery } from '../interfaces/user';
import { toast } from "@/hooks/use-toast";


export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });
}

export const useUsers = (query: UserQuery) => {
    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
    });
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                title: "Success",
                description: "User deleted successfully",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete user. Please try again.",
                variant: "destructive",
            });
        },
    });
}