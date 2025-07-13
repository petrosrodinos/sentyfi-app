import { useState } from "react";
import { AlertFilters } from "./components/alert-filters";
import { useAlerts } from "@/features/alert/hooks/use-alerts";
import { AlertList } from "./components/alert-list";
import type { AlertQuery } from "@/features/alert/interfaces/alert";

export default function Alerts() {
  const [alertFilters, setAlertFilters] = useState<AlertQuery>({
    page: 1,
    limit: 10,
  });

  const { data: alertsResponse, isLoading, error } = useAlerts(alertFilters);

  const handleLoadMore = () => {
    setAlertFilters({ ...alertFilters, page: (alertFilters.page || 1) + 1 });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600 mt-2">Monitor all your portfolio alerts and notifications</p>
        </div>

        <div className="mb-6">
          <AlertFilters alerts={alertsResponse?.data || []} alertFilters={alertFilters} onAlertFiltersChange={setAlertFilters} />
        </div>

        <AlertList alerts={alertsResponse?.data || []} isLoading={isLoading} error={error} onLoadMore={handleLoadMore} hasMore={alertsResponse?.pagination.hasMore || false} />
      </div>
    </div>
  );
}
