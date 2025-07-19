import { TrackedItemTypes, type TrackedItemType } from "@/features/tracking/interfaces/tracked-items";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TickerIconProps {
  ticker: string;
  market: TrackedItemType;
  width?: number;
  height?: number;
  className?: string;
}

export default function TickerIcon({ ticker, market, width = 10, height = 10, className }: TickerIconProps) {
  const [loaded, setLoaded] = useState(true);

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
        <>{loaded ? <img src={`/crypto-icons/${ticker.toLowerCase()}.svg`} alt={ticker} onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} /> : <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs sm:text-sm">{getTickerFallback()}</AvatarFallback>}</>
      )}
    </Avatar>
  );
}
