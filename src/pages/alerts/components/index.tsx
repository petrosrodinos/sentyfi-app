import type { Alert, AlertPagination, AlertQuery, UserAlertsResponse } from "@/features/alert/interfaces/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import type { TrackedItem } from "@/features/tracking/interfaces/tracked-items";
import type { MediaSubscription } from "@/features/media/interfaces/media-subscriptions";
import { AlertFilters } from "./alert-filters";
import { AlertList } from "./alert-list";

interface AlertsProps {
  alerts?: Alert[];
  userAlerts?: UserAlertsResponse;
  pagination: AlertPagination;
  trackedItems: TrackedItem[];
  mediaSubscriptions: MediaSubscription[];
  alertFilters: AlertQuery;
  error: any;
  onAlertFiltersChange: (filters: AlertQuery) => void;
  refetch: () => void;
  isLoading: boolean;
}

export default function AlertsComponent({ alerts, userAlerts, pagination, trackedItems, mediaSubscriptions, alertFilters, error, onAlertFiltersChange, refetch, isLoading }: AlertsProps) {
  const totalPages = pagination?.total ? Math.ceil(pagination.total / (alertFilters.limit || 10)) : 1;

  const handlePageChange = (page: number) => {
    onAlertFiltersChange({ ...alertFilters, page });
  };

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
          <AlertFilters trackedItems={trackedItems || []} mediaSubscriptions={mediaSubscriptions || []} alertFilters={alertFilters} onAlertFiltersChange={onAlertFiltersChange} />
        </div>

        <AlertList userAlerts={userAlerts} alerts={alerts || []} trackedItems={trackedItems || []} isLoading={isLoading} error={error} currentPage={alertFilters.page || 1} totalPages={totalPages} onPageChange={handlePageChange} refresh={refetch} />
      </div>
    </div>
  );
}
