import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Routes } from "@/routes/routes";
import { TrackedItemTypes } from "@/features/tracking/interfaces/tracked-items";

interface TrackedAsset {
  ticker: string;
  name?: string;
  sentiment: "positive" | "negative" | "neutral";
  severity: "low" | "medium" | "high";
  sentimentPercentage: number;
  severityPercentage: number;
  alertCount: number;
  type: string;
}

interface TrackedAssetsProps {
  trackedAssets: TrackedAsset[];
}

export function TrackedAssets({ trackedAssets }: TrackedAssetsProps) {
  return (
    <Card className="p-6 md:col-span-1 lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
        <DollarSign className="h-5 w-5 mr-2" />
        Tracked Assets
      </h3>
      <div className="space-y-3">
        {trackedAssets.length > 0 ? (
          <div className="h-[300px] overflow-y-auto pr-2">
            {trackedAssets.map((asset, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        {(asset.type === TrackedItemTypes.stock || asset.type === TrackedItemTypes.commodity) && (
                          <>
                            <AvatarImage src={`https://assets.parqet.com/logos/symbol/${asset.ticker}`} alt={asset.ticker} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{asset.ticker}</AvatarFallback>
                          </>
                        )}
                        {asset.type === TrackedItemTypes.crypto && (
                          <>
                            <AvatarImage src={`/node_modules/cryptocurrency-icons/svg/color/${asset.ticker.toLowerCase()}.svg`} alt={asset.ticker} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{asset.ticker}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      {asset.type === TrackedItemTypes.keyword && (
                        <>
                          <span className="font-medium">{asset.ticker}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{asset.name || asset.ticker}</p>
                    <p className="text-sm text-muted-foreground">{asset.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant={asset.sentiment === "positive" ? "default" : asset.sentiment === "negative" ? "destructive" : "secondary"} className="text-xs">
                        {asset.sentiment}
                      </Badge>
                      <Badge variant={asset.severity === "high" ? "destructive" : asset.severity === "medium" ? "default" : "secondary"} className="text-xs">
                        {asset.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Alerts</div>
                    <div className="text-sm font-medium text-foreground">{asset.alertCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No tracked assets yet</p>
            <p className="text-sm text-muted-foreground">Start tracking cryptocurrencies, stocks, or keywords</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link to={Routes.tracking.stocks}>Add Assets</Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
