import { useState } from "react";
import type { AlertQuery, UserAlertsResponse } from "@/features/alert/interfaces/alert";
import { useApolloQuery } from "@/hooks/graphql/use-apollo";
import { GET_USER_ALERTS } from "@/features/alert/queries/alert";
import AlertsComponent from "./components";

export default function Alerts() {
  const [alertFilters, setAlertFilters] = useState<AlertQuery>({
    page: 1,
    limit: 10,
    order_by: "desc",
  });

  const {
    data: alertsResponse,
    isLoading,
    error,
    refetch,
  } = useApolloQuery(GET_USER_ALERTS, {
    variables: alertFilters,
  }) as { data: UserAlertsResponse; isLoading: boolean; error: any; refetch: () => void };

  return <AlertsComponent userAlerts={alertsResponse} pagination={alertsResponse?.user?.user_alerts?.pagination} trackedItems={alertsResponse?.user?.tracked_items || []} mediaSubscriptions={alertsResponse?.user?.media_subscriptions || []} alertFilters={alertFilters} error={error} onAlertFiltersChange={setAlertFilters} refetch={refetch} isLoading={isLoading} />;
}
