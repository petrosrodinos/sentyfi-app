import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TrackedItem } from "../../../interfaces/tracked-items";

interface TickerCardProps {
  ticker: TrackedItem;
}

export default function TickerCard({ ticker }: TickerCardProps) {
  const get_ticker_icon = () => {
    const logo_url = ticker.meta?.logo_url;
    const icon_url = ticker.meta?.icon_url;
    if (logo_url) return logo_url;
    if (icon_url) return icon_url;
    return undefined;
  };

  const get_ticker_fallback = () => {
    return ticker.item_identifier.substring(0, 2).toUpperCase();
  };

  const get_ticker_name = () => {
    return ticker.meta?.name || ticker.item_identifier;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={get_ticker_icon()} alt={get_ticker_name()} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{get_ticker_fallback()}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-2">{get_ticker_name()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Switch checked={ticker.enabled} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
