import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { TickerQuery, Ticker } from "../interfaces/tickers";

export const getTickers = async (query: TickerQuery): Promise<Ticker[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.tracking.market_data.prefix, { params: query });
        return response.data;

    } catch (error) {
        throw new Error("Failed to fetch tickers. Please try again.");
    }
};

