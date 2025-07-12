import axiosInstance from "@/config/axios";
import type { TickerQuery, TickersResponse } from "../interfaces/tickers";
import { ApiRoutes } from "@/constants/api";

export const getTickers = async (query: TickerQuery): Promise<TickersResponse> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.tracking.market_data.prefix, { params: query });
        return response.data;

    } catch (error) {
        throw new Error("Failed to fetch tickers. Please try again.");
    }
};

