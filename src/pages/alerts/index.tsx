import { useState, useMemo } from "react";
import { AlertFilters } from "./components/alert-filters";
import { useAlerts } from "@/features/alert/hooks/use-alerts";
import { AlertList } from "./components/alert-list";

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: alerts = [], isLoading, error } = useAlerts({});

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch = searchQuery === "" || alert.alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || alert.alert.description.toLowerCase().includes(searchQuery.toLowerCase()) || alert.alert.tickers.some((ticker) => ticker.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSeverity = severityFilter === "all" || alert.alert.severity === severityFilter;
      const matchesType = typeFilter === "all" || alert.alert.title.toLowerCase().includes(typeFilter.toLowerCase());

      return matchesSearch && matchesSeverity && matchesType;
    });
  }, [alerts, searchQuery, severityFilter, typeFilter]);

  const handleLoadMore = () => {
    console.log("Load more alerts");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600 mt-2">Monitor all your portfolio alerts and notifications</p>
        </div>

        <div className="mb-6">
          <AlertFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} severityFilter={severityFilter} onSeverityChange={setSeverityFilter} typeFilter={typeFilter} onTypeChange={setTypeFilter} />
        </div>

        <AlertList alerts={filteredAlerts} isLoading={isLoading} error={error} onLoadMore={handleLoadMore} hasMore={false} />
      </div>
    </div>
  );
}
