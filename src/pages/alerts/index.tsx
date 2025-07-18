import { useState } from "react";
import { AlertFilters } from "./components/alert-filters";
import { AlertList } from "./components/alert-list";
import type { AlertQuery, UserAlertsResponse } from "@/features/alert/interfaces/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useApolloQuery } from "@/hooks/graphql/use-apollo";
import { GET_USER_ALERTS } from "@/features/alert/queries/alert";

export default function Alerts() {
  const [alertFilters, setAlertFilters] = useState<AlertQuery>({
    page: 1,
    limit: 10,
    order_by: "desc",
  });

  // const { data: trackedItems } = useTrackedItems({
  //   enabled: true,
  // });

  // const { data: mediaSubscriptions } = useMediaSubscriptions({
  //   enabled: true,
  // });

  // const { data: alertsResponse, isLoading, error, refetch } = useAlerts(alertFilters);

  const {
    data: alertsResponse,
    isLoading,
    error,
    refetch,
  } = useApolloQuery(GET_USER_ALERTS, {
    variables: alertFilters,
  }) as { data: UserAlertsResponse | undefined; isLoading: boolean; error: any; refetch: () => void };

  const handlePageChange = (page: number) => {
    setAlertFilters({ ...alertFilters, page });
  };

  const totalPages = alertsResponse?.user?.user_alerts?.pagination?.total ? Math.ceil(alertsResponse.user.user_alerts.pagination.total / (alertFilters.limit || 10)) : 1;

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
          <AlertFilters alerts={alertsResponse?.user?.user_alerts?.data || []} trackedItems={alertsResponse?.user?.tracked_items || []} mediaSubscriptions={alertsResponse?.user?.media_subscriptions || []} alertFilters={alertFilters} onAlertFiltersChange={setAlertFilters} />
        </div>

        <AlertList alerts={alertsResponse?.user?.user_alerts?.data || []} trackedItems={alertsResponse?.user?.tracked_items || []} isLoading={isLoading} error={error} currentPage={alertFilters.page || 1} totalPages={totalPages} onPageChange={handlePageChange} refresh={refetch} />
      </div>
    </div>
  );
}
