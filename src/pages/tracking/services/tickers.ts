import axiosInstance from "@/config/axios";
import type { Ticker, TickerQuery } from "../interfaces/tickers";

export const getTickers = async (query: TickerQuery): Promise<Ticker[]> => {
    try {
        const response = await axiosInstance.get("/market-data/tickers", { params: query });
        return response.data;

    } catch (error) {
        throw new Error("Failed to fetch tickers. Please try again.");
    }
};

