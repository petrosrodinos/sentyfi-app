import { AlertCard } from "./alert-card";
import { Button } from "@/components/ui/button";
import type { UserAlert } from "@/features/alert/interfaces/alert";

interface AlertListProps {
  alerts: UserAlert[];
  isLoading: boolean;
  error: Error | null;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function AlertList({ alerts, isLoading, error, onLoadMore, hasMore }: AlertListProps) {
  if (isLoading && alerts.length === 0) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading alerts: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No alerts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}

      {hasMore && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Alerts"}
          </Button>
        </div>
      )}
    </div>
  );
}
