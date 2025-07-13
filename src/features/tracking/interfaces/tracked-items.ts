import type { Ticker } from "./tickers";

export interface TrackedItem extends CreateTrackedItem {
    id: number;
    uuid: string;
    user_uuid: string;
}


export interface CreateTrackedItem {
    item_type: TrackedItemType;
    item_identifier: string;
    enabled: boolean;
    meta?: Ticker;
}

export interface UpdateTrackedItem {
    id: string;
    enabled: boolean;
}

export interface TrackedItemQuery {
    user_uuid?: string;
    item_type?: TrackedItemType;
    item_identifier?: string;
    enabled?: boolean;
}

export const TrackedItemTypes = {
    crypto: "crypto",
    stock: "stock",
    commodity: "commodity",
    keyword: "keyword",
} as const;

export type TrackedItemType = (typeof TrackedItemTypes)[keyof typeof TrackedItemTypes];