import { TrackedItemTypes, type TrackedItemType } from "@/features/tracking/interfaces/tracked-items";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface TickerIconProps {
  ticker: string;
  market: TrackedItemType;
  width?: number;
  height?: number;
  className?: string;
}

export default function TickerIcon({ ticker, market, width = 10, height = 10, className }: TickerIconProps) {
  const getTickerFallback = () => {
    return ticker.substring(0, 2).toUpperCase();
  };

  if (market === TrackedItemTypes.keyword) {
    return <span className="font-medium">{ticker}</span>;
  }

  return (
    <Avatar className={cn(`w-${width} h-${height} sm:w-${width} sm:h-${height}`, className)}>
      {market === TrackedItemTypes.stock ? (
        <>
          <AvatarImage src={`https://assets.parqet.com/logos/symbol/${ticker}`} alt={ticker} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs sm:text-sm">{getTickerFallback()}</AvatarFallback>
        </>
      ) : (
        <>
          <img src={`/crypto-icons/${ticker.toLowerCase()}.svg`} alt={ticker} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs sm:text-sm">{getTickerFallback()}</AvatarFallback>
        </>
      )}
    </Avatar>
  );
}
