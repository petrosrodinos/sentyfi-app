import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

interface AlertFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  severityFilter: string;
  onSeverityChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
}

export function AlertFilters({ searchQuery, onSearchChange, severityFilter, onSeverityChange, typeFilter, onTypeChange }: AlertFiltersProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search alerts..." className="pl-10" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
        </div>
        <Select value={severityFilter} onValueChange={onSeverityChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sentiment_shift">Sentiment Shift</SelectItem>
            <SelectItem value="volume_spike">Volume Spike</SelectItem>
            <SelectItem value="news_impact">News Impact</SelectItem>
            <SelectItem value="influencer_mention">Influencer Mention</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>
    </Card>
  );
}
