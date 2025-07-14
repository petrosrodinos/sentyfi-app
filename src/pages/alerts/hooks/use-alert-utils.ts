import { Info, Mail, Bell, MessageSquare, Phone, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { IconBrandX, IconBrandYoutube, IconBrandReddit, IconNews } from "@tabler/icons-react";

export const useAlertUtils = () => {
    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case "twitter":
                return IconBrandX;
            case "youtube":
                return IconBrandYoutube;
            case "reddit":
                return IconBrandReddit;
            case "news":
                return IconNews;
            default:
                return Info;
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case "twitter":
                return "text-blue-500";
            case "youtube":
                return "text-red-500";
            case "reddit":
                return "text-orange-500";
            case "news":
                return "text-green-500";
            default:
                return "text-gray-500";
        }
    };

    const getChannelIcon = (channel: string) => {
        switch (channel) {
            case "email":
                return Mail;
            case "push":
                return Bell;
            case "sms":
                return MessageSquare;
            case "phone":
                return Phone;
            case "telegram":
                return MessageSquare;
            case "discord":
                return MessageSquare;
            case "whatsapp":
                return MessageSquare;
            default:
                return Bell;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "destructive";
            case "medium":
                return "default";
            case "low":
                return "secondary";
            default:
                return "secondary";
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return "text-green-600";
            case "negative":
                return "text-red-600";
            case "neutral":
                return "text-gray-600";
            default:
                return "text-gray-600";
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const getAccuracyIcon = (value: "accurate" | "inaccurate" | "unsure" | null) => {
        switch (value) {
            case "accurate":
                return CheckCircle;
            case "inaccurate":
                return XCircle;
            case "unsure":
                return HelpCircle;
            default:
                return HelpCircle;
        }
    };

    const getAccuracyText = (value: "accurate" | "inaccurate" | "unsure" | null) => {
        switch (value) {
            case "accurate":
                return "Accurate";
            case "inaccurate":
                return "Inaccurate";
            case "unsure":
                return "Unsure";
            default:
                return "Rate Accuracy";
        }
    };

    const getAccuracyColor = (accuracy: number) => {
        if (accuracy >= 80) return "text-green-500";
        if (accuracy >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    return {
        getPlatformIcon,
        getPlatformColor,
        getChannelIcon,
        getSeverityColor,
        getSentimentColor,
        formatTime,
        getAccuracyIcon,
        getAccuracyText,
        getAccuracyColor,
    };
}; 