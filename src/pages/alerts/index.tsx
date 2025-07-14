import { useState } from "react";
import { AlertFilters } from "./components/alert-filters";
import { useAlerts } from "@/features/alert/hooks/use-alerts";
import { AlertList } from "./components/alert-list";
import type { AlertQuery } from "@/features/alert/interfaces/alert";
import { useTrackedItems } from "@/features/tracking/hooks/use-tracked-items";
import { useAuthStore } from "@/stores/auth";
import { useMediaSubscriptions } from "@/features/media/hooks/use-media-subscriptions";

export default function Alerts() {
  const { user_uuid } = useAuthStore();

  const [alertFilters, setAlertFilters] = useState<AlertQuery>({
    page: 1,
    limit: 10,
  });

  const { data: trackedItems } = useTrackedItems({
    user_uuid: user_uuid!,
    enabled: true,
  });

  const { data: mediaSubscriptions } = useMediaSubscriptions({
    user_uuid: user_uuid!,
    enabled: true,
  });

  const { data: alertsResponse, isLoading, error } = useAlerts(alertFilters);

  const handleLoadMore = () => {
    setAlertFilters({ ...alertFilters, page: (alertFilters.page || 1) + 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-2">Monitor all your portfolio alerts and notifications</p>
        </div>

        <div className="mb-6">
          <AlertFilters alerts={alertsResponse?.data || []} trackedItems={trackedItems || []} mediaSubscriptions={mediaSubscriptions || []} alertFilters={alertFilters} onAlertFiltersChange={setAlertFilters} />
        </div>

        <AlertList alerts={alertsResponse?.data || []} trackedItems={trackedItems || []} isLoading={isLoading} error={error} onLoadMore={handleLoadMore} hasMore={alertsResponse?.pagination.hasMore || false} />
      </div>
    </div>
  );
}
