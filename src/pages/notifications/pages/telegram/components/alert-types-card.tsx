import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface AlertTypesCardProps {
  telegramEnabled: boolean;
}

export default function AlertTypesCard({ telegramEnabled }: AlertTypesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram Alert Types</CardTitle>
        <CardDescription>Choose what types of Telegram messages you want to receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Portfolio updates</p>
            <p className="text-sm text-muted-foreground">Real-time portfolio performance updates</p>
          </div>
          <Switch defaultChecked disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Price alerts</p>
            <p className="text-sm text-muted-foreground">Significant price movements and trends</p>
          </div>
          <Switch defaultChecked disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Market news</p>
            <p className="text-sm text-muted-foreground">Breaking news and market events</p>
          </div>
          <Switch disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Social sentiment</p>
            <p className="text-sm text-muted-foreground">Social media sentiment analysis</p>
          </div>
          <Switch disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Trading signals</p>
            <p className="text-sm text-muted-foreground">AI-generated trading recommendations</p>
          </div>
          <Switch disabled={!telegramEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Weekly reports</p>
            <p className="text-sm text-muted-foreground">Comprehensive weekly market analysis</p>
          </div>
          <Switch disabled={!telegramEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
