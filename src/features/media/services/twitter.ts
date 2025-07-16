import axiosInstance from "@/config/api/axios";
import type {
    TwitterUser,
} from "../interfaces/twitter";
import { ApiRoutes } from "@/config/api/routes";

export const getFollowingsByUsername = async (username: string): Promise<{ user: TwitterUser, followings: TwitterUser[] }> => {
    try {
        const user = await getTwitterUser(username);

        const followings = await getTwitterUserFollowings(user.id);

        return {
            user,
            followings
        }
    } catch (error) {
        throw new Error("Failed to fetch following list. Please try again.");
    }
};


export const getTwitterUserFollowings = async (
    user_id: string,
): Promise<TwitterUser[]> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.media.twitter.followings}/${user_id}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch following list. Please try again.");
    }
};

export const getTwitterUser = async (user_name: string): Promise<TwitterUser> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.media.twitter.user}/${user_name}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch user details. Please try again.");
    }
};


export const searchTwitterUsers = async (username: string): Promise<TwitterUser[]> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.media.twitter.search}/${username}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to search users. Please try again.");
    }
}; 