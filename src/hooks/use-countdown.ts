import { useState, useEffect } from "react";

interface UseCountdownOptions {
    initialSeconds?: number;
    onComplete?: () => void;
}

export function useCountdown({ initialSeconds = 0, onComplete }: UseCountdownOptions = {}) {
    const [countdown, setCountdown] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (countdown > 0 && isActive) {
            interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setIsActive(false);
                        onComplete?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [countdown, isActive, onComplete]);

    const startCountdown = (seconds: number) => {
        setCountdown(seconds);
        setIsActive(true);
    };

    const stopCountdown = () => {
        setCountdown(0);
        setIsActive(false);
    };

    const resetCountdown = (seconds: number) => {
        setCountdown(seconds);
        setIsActive(true);
    };

    return {
        countdown,
        isActive,
        startCountdown,
        stopCountdown,
        resetCountdown,
    };
} 