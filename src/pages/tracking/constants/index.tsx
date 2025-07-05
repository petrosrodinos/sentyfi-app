import { TrackedItemTypes } from "../interfaces/tracked-items";

export const MarketLabels = {
  [TrackedItemTypes.stock]: "Stock",
  [TrackedItemTypes.crypto]: "Crypto",
  [TrackedItemTypes.keyword]: "Keyword",
} as const;
