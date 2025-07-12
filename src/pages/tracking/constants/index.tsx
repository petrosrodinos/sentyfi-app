import { TrackedItemTypes } from "../../../features/tracking/interfaces/tracked-items";

export const MarketLabels = {
  [TrackedItemTypes.stock]: "Stocks",
  [TrackedItemTypes.crypto]: "Crypto",
  [TrackedItemTypes.keyword]: "Keywords",
} as const;
