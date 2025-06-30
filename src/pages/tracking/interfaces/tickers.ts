export interface Ticker {
    ticker: string;
    name: string;
    logo_url?: string;
    icon_url?: string;
    description?: string;
    industry?: string;
    market_cap?: number;
    market?: string;
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
