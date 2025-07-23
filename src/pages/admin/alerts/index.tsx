import { useAlerts } from "@/features/alert/hooks/use-alerts";
import type { AlertQuery } from "@/features/alert/interfaces/alert";
import { useAdminMediaSubscriptions } from "@/features/media/hooks/use-media-subscriptions";
import { useAdminTrackedItems } from "@/features/tracking/hooks/use-tracked-items";
import AlertsComponent from "@/pages/alerts/components";
import { useState } from "react";

export default function AdminAlerts() {
  const [alertFilters, setAlertFilters] = useState<AlertQuery>({
    page: 1,
    limit: 10,
    order_by: "desc",
  });

  const { data: alerts, isLoading, error, refetch } = useAlerts(alertFilters);

  const { data: trackedItems } = useAdminTrackedItems({});

  const { data: mediaSubscriptions } = useAdminMediaSubscriptions({});

  return <AlertsComponent alerts={alerts?.data} pagination={alerts?.pagination!} trackedItems={trackedItems || []} mediaSubscriptions={mediaSubscriptions || []} alertFilters={alertFilters} error={error} onAlertFiltersChange={setAlertFilters} refetch={refetch} isLoading={isLoading} />;
}
