import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

interface SeverityData {
  low: number;
  medium: number;
  high: number;
  total: number;
}

interface SentimentOverviewProps {
  sentimentData: SentimentData;
  severityData: SeverityData;
}

export function SentimentOverview({ sentimentData, severityData }: SentimentOverviewProps) {
  const sentimentPercentages = {
    positive: sentimentData.total > 0 ? Math.round((sentimentData.positive / sentimentData.total) * 100) : 0,
    negative: sentimentData.total > 0 ? Math.round((sentimentData.negative / sentimentData.total) * 100) : 0,
    neutral: sentimentData.total > 0 ? Math.round((sentimentData.neutral / sentimentData.total) * 100) : 0,
    total_mentions: sentimentData.total,
  };

  const severityPercentages = {
    low: severityData.total > 0 ? Math.round((severityData.low / severityData.total) * 100) : 0,
    medium: severityData.total > 0 ? Math.round((severityData.medium / severityData.total) * 100) : 0,
    high: severityData.total > 0 ? Math.round((severityData.high / severityData.total) * 100) : 0,
    total: severityData.total,
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
        <Activity className="h-5 w-5 mr-2" />
        Sentiment & Severity Overview
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Sentiment</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Positive</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentimentPercentages.positive}%` }}></div>
                </div>
                <span className="text-sm font-medium text-foreground">{sentimentPercentages.positive}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Negative</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentimentPercentages.negative}%` }}></div>
                </div>
                <span className="text-sm font-medium text-foreground">{sentimentPercentages.negative}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Neutral</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-gray-400 dark:bg-gray-500 h-2 rounded-full" style={{ width: `${sentimentPercentages.neutral}%` }}></div>
                </div>
                <span className="text-sm font-medium text-foreground">{sentimentPercentages.neutral}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Severity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">High</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${severityPercentages.high}%` }}></div>
                </div>
                <span className="text-sm font-medium text-foreground">{severityPercentages.high}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Medium</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${severityPercentages.medium}%` }}></div>
                </div>
                <span className="text-sm font-medium text-foreground">{severityPercentages.medium}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Low</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: `${severityPercentages.low}%` }}></div>
                </div>
                <span className="text-sm font-medium text-foreground">{severityPercentages.low}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Total mentions: <span className="font-medium text-foreground">{sentimentPercentages.total_mentions}</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
