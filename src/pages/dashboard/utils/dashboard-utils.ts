import type { Alert, SentimentData, SeverityData, TrackedAsset, TrackedItem, RecentAlert } from "../interfaces/dashboard";

export function calculateSentimentData(alerts: Alert[]): SentimentData {
    return alerts.reduce(
        (acc, alert) => {
            const sentiment = alert.alert?.sentiment;
            if (sentiment && (sentiment === "positive" || sentiment === "negative" || sentiment === "neutral")) {
                acc[sentiment]++;
                acc.total++;
            }
            return acc;
        },
        { positive: 0, negative: 0, neutral: 0, total: 0 }
    );
}

export function calculateSeverityData(alerts: Alert[]): SeverityData {
    return alerts.reduce(
        (acc, alert) => {
            const severity = alert.alert?.severity;
            if (severity && (severity === "low" || severity === "medium" || severity === "high")) {
                acc[severity]++;
                acc.total++;
            }
            return acc;
        },
        { low: 0, medium: 0, high: 0, total: 0 }
    );
}

export function calculateTrackedAssets(trackedItems: TrackedItem[], alerts: Alert[]): TrackedAsset[] {
    return trackedItems.map((item) => {
        const assetTicker = item.item_identifier || "N/A";

        const assetAlerts = alerts.filter(alert =>
            alert.alert?.tickers?.some(ticker => ticker.ticker === assetTicker)
        );

        const sentimentCounts = assetAlerts.reduce(
            (acc, alert) => {
                const sentiment = alert.alert?.sentiment;
                if (sentiment && (sentiment === "positive" || sentiment === "negative" || sentiment === "neutral")) {
                    acc[sentiment]++;
                    acc.total++;
                }
                return acc;
            },
            { positive: 0, negative: 0, neutral: 0, total: 0 }
        );

        const severityCounts = assetAlerts.reduce(
            (acc, alert) => {
                const severity = alert.alert?.severity;
                if (severity && (severity === "low" || severity === "medium" || severity === "high")) {
                    acc[severity]++;
                    acc.total++;
                }
                return acc;
            },
            { low: 0, medium: 0, high: 0, total: 0 }
        );

        const dominantSentiment =
            sentimentCounts.total > 0
                ? (Object.entries(sentimentCounts)
                    .filter(([key]) => key !== "total")
                    .sort(([, a], [, b]) => b - a)[0][0] as "positive" | "negative" | "neutral")
                : "neutral";

        const dominantSeverity =
            severityCounts.total > 0
                ? (Object.entries(severityCounts)
                    .filter(([key]) => key !== "total")
                    .sort(([, a], [, b]) => b - a)[0][0] as "low" | "medium" | "high")
                : "low";

        const sentimentPercentage = sentimentCounts.total > 0 ? Math.round((sentimentCounts[dominantSentiment as keyof typeof sentimentCounts] / sentimentCounts.total) * 100) : 0;

        const severityPercentage = severityCounts.total > 0 ? Math.round((severityCounts[dominantSeverity as keyof typeof severityCounts] / severityCounts.total) * 100) : 0;

        return {
            ticker: assetTicker,
            name: item?.meta?.name,
            sentiment: dominantSentiment,
            severity: dominantSeverity,
            sentimentPercentage,
            severityPercentage,
            alertCount: assetAlerts.length,
            type: item.item_type || "unknown",
        };
    });
}

export function calculateRecentAlerts(alerts: Alert[]): RecentAlert[] {
    return alerts.slice(0, 5).map((alert) => ({
        type: alert.alert?.severity || "medium",
        tickers: alert.alert?.tickers,
        message: alert.alert?.title,
        time: new Date(alert.created_at).toLocaleTimeString(),
        sentiment: alert.alert?.sentiment,
    }));
} 