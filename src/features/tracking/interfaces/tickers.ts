import type { TrackedItemType } from "./tracked-items";

export interface Ticker {
    ticker: string;
    name: string;
    active?: boolean;
    type?: string;
    market?: TrackedItemType;
    enabled?: boolean;
}

export interface TickerQuery {
    market?: string;
    market_cap?: number;
    search?: string;
    ticker?: string;
    enabled?: boolean;
}
