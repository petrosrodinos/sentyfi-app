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
  refresh: () => void;
  onPageChange: (page: number) => void;
}

export function AlertList({ alerts, trackedItems, isLoading, error, currentPage, totalPages, refresh, onPageChange }: AlertListProps) {
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

  if (alerts.length === 0 || error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="h-24 w-24 text-muted-foreground mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No Alerts Yet</h3>
        <p className="text-muted-foreground text-center max-w-sm mb-6">{error ? "An error occurred while fetching alerts" : "Start tracking assets to receive relevant market alerts"}</p>
        <Button variant="outline" onClick={refresh}>
          Refresh
        </Button>
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
