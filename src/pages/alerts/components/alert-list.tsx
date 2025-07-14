import { AlertCard } from "./alert-card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import type { UserAlert } from "@/features/alert/interfaces/alert";
import type { TrackedItem } from "@/features/tracking/interfaces/tracked-items";

interface AlertListProps {
  alerts: UserAlert[];
  trackedItems: TrackedItem[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AlertList({ alerts, trackedItems, isLoading, error, currentPage, totalPages, onPageChange }: AlertListProps) {
  if (isLoading && alerts.length === 0) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading alerts: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No alerts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} trackedItems={trackedItems} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} className="mt-8" />
    </div>
  );
}
