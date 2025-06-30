import type { TrackedItemType } from "./tracked-items";

export interface Ticker {
    ticker: string;
    name: string;
    icon_url?: string;
    market_cap?: number;
    market?: TrackedItemType;
}

export interface TickersResponse {
    results: Ticker[];
    status: string;
    request_id: string;
    count: number;
    next_url?: string;
}

export interface TickerQuery {
    market: string;
    market_cap?: number;
    ticker: string;
}
