import { useQuery } from "@tanstack/react-query";
import { getTickers } from "../services/tickers";
import type { TickerQuery } from "../interfaces/tickers";

export function useTickers(query: TickerQuery) {
    return useQuery({
        queryKey: ["tickers", query],
        queryFn: () => getTickers(query),
        enabled: !!query.ticker && query.ticker.trim().length > 0,
        retry: false,
    });
}

