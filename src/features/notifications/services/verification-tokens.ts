import axiosInstance from "@/config/axios";
import type { CreateVerificationToken, VerificationToken } from "../interfaces/verification-tokens";

export const createVerificationToken = async (payload: CreateVerificationToken): Promise<VerificationToken> => {
    try {
        const response = await axiosInstance.post("/verification-tokens", payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create verification token. Please try again.");
    }
};

export const verifyVerificationToken = async (token: string): Promise<VerificationToken> => {
    try {
        const response = await axiosInstance.post(`/verification-tokens/verify/${token}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to verify verification token. Please try again.");
    }
};

