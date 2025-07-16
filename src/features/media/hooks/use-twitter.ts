import { useMutation, useQuery } from "@tanstack/react-query";
import { getTwitterUser, searchTwitterUsers, getTwitterUserFollowings, getFollowingsByUsername } from "../services/twitter";
import { toast } from "@/hooks/use-toast";

export function useFollowingsByUsername(username: string) {
    return useQuery({
        queryKey: ["twitter-followings", username],
        queryFn: () => getFollowingsByUsername(username),
        enabled: !!username && username.trim().length > 0,
    });
}

export function useSearchTwitterUsers(username: string) {
    return useQuery({
        queryKey: ["twitter-search", username],
        queryFn: () => searchTwitterUsers(username),
        enabled: !!username && username.trim().length >= 2,
    });
}

export function searchTwitterUserByUsername(username: string) {
    return useMutation({
        mutationFn: () => searchTwitterUsers(username),
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "error",
            });
        },
    });
}

export function useTwitterFollowings(user_id: string) {
    return useQuery({
        queryKey: ["twitter-following", user_id],
        queryFn: () => getTwitterUserFollowings(user_id),
        enabled: !!user_id && user_id.trim().length > 0,
    });
}

export function useTwitterUser(username: string) {
    return useQuery({
        queryKey: ["twitter-user", username],
        queryFn: () => getTwitterUser(username),
        enabled: !!username && username.trim().length > 0,
    });
}

export function getTwitterUserByUsername(username: string) {
    return useMutation({
        mutationFn: () => getTwitterUser(username),
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "error",
            });
        },
    });
}
