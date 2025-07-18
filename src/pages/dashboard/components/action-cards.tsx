import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Routes } from "@/routes/routes";

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Add Asset</h3>
        <p className="text-muted-foreground mb-4">Track new cryptocurrency or stock for sentiment analysis</p>
        <Button className="w-full" asChild>
          <Link to={Routes.tracking.stocks}>Add New Asset</Link>
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Manage Subscriptions</h3>
        <p className="text-muted-foreground mb-4">Configure Twitter accounts and keywords to monitor</p>
        <Button variant="outline" className="w-full" asChild>
          <Link to={Routes.media.twitter}>View Subscriptions</Link>
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Notification Settings</h3>
        <p className="text-muted-foreground mb-4">Customize your alert preferences and delivery methods</p>
        <Button variant="outline" className="w-full" asChild>
          <Link to={Routes.notifications.root}>Configure Alerts</Link>
        </Button>
      </Card>
    </div>
  );
}
