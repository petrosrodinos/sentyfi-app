import { useState } from "react";
import { AlertFilters } from "./components/alert-filters";
import { useAlerts } from "@/features/alert/hooks/use-alerts";
import { AlertList } from "./components/alert-list";
import type { AlertQuery } from "@/features/alert/interfaces/alert";
import { useTrackedItems } from "@/features/tracking/hooks/use-tracked-items";
import { useAuthStore } from "@/stores/auth";
import { useMediaSubscriptions } from "@/features/media/hooks/use-media-subscriptions";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Alerts() {
  const { user_uuid } = useAuthStore();

  const [alertFilters, setAlertFilters] = useState<AlertQuery>({
    page: 1,
    limit: 10,
    order_by: "desc",
  });

  const { data: trackedItems } = useTrackedItems({
    user_uuid: user_uuid!,
    enabled: true,
  });

  const { data: mediaSubscriptions } = useMediaSubscriptions({
    enabled: true,
  });

  const { data: alertsResponse, isLoading, error, refetch } = useAlerts(alertFilters);

  const handlePageChange = (page: number) => {
    setAlertFilters({ ...alertFilters, page });
  };

  const totalPages = alertsResponse?.pagination.total ? Math.ceil(alertsResponse.pagination.total / (alertFilters.limit || 10)) : 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
              <p className="text-muted-foreground mt-2">Monitor all your portfolio alerts and notifications</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading} className="flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <AlertFilters alerts={alertsResponse?.data || []} trackedItems={trackedItems || []} mediaSubscriptions={mediaSubscriptions || []} alertFilters={alertFilters} onAlertFiltersChange={setAlertFilters} />
        </div>

        <AlertList alerts={alertsResponse?.data || []} trackedItems={trackedItems || []} isLoading={isLoading} error={error} currentPage={alertFilters.page || 1} totalPages={totalPages} onPageChange={handlePageChange} refresh={refetch} />
      </div>
    </div>
  );
}
