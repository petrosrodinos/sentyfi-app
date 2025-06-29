import { useQuery } from "@tanstack/react-query";
import { getTwitterUser, searchTwitterUsers, getTwitterUserFollowings, getFollowingsByUsername } from "../services/twitter";

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