import axiosInstance from "@/config/api/axios";
import type { CreateVerificationToken, VerificationToken } from "../interfaces/verification-tokens";
import { ApiRoutes } from "@/config/api/routes";

export const createVerificationToken = async (payload: CreateVerificationToken): Promise<VerificationToken> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.verification_tokens.prefix, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create verification token. Please try again.");
    }
};

export const verifyVerificationToken = async (token: string): Promise<VerificationToken> => {
    try {
        const response = await axiosInstance.post(`${ApiRoutes.verification_tokens.verify}/${token}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to verify verification token. Please try again.");
    }
};

