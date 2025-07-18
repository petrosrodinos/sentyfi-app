export interface Alert {
    alert?: {
        sentiment?: string;
        severity?: string;
        tickers?: Array<{ ticker: string }>;
        title?: string;
    };
    created_at: string;
}

export interface TrackedItem {
    item_identifier?: string;
    meta?: {
        name?: string;
    };
    item_type?: string;
}

export interface SentimentData {
    positive: number;
    negative: number;
    neutral: number;
    total: number;
}

export interface SeverityData {
    low: number;
    medium: number;
    high: number;
    total: number;
}

export interface TrackedAsset {
    ticker: string;
    name?: string;
    sentiment: "positive" | "negative" | "neutral";
    severity: "low" | "medium" | "high";
    sentimentPercentage: number;
    severityPercentage: number;
    alertCount: number;
    type: string;
}

export interface RecentAlert {
    type: string;
    tickers?: Array<{ ticker: string }>;
    message?: string;
    time: string;
    sentiment?: string;
}