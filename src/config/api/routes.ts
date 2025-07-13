export const API_URL = import.meta.env.VITE_API_URL;

export const ApiRoutes = {
    auth: {
        twitter: {
            create_url: "/auth/twitter/login/url",
            access_token: "/auth/twitter/login/access_token",
        },
        email: {
            login: "/auth/email/login",
            register: "/auth/email/register",
            reset_password: "/auth/email/reset-password",
        }
    },
    media: {
        subscriptions: {
            prefix: "/media-subscriptions",
            create: "/media-subscriptions/create",
            upsert: "/media-subscriptions/upsert",
        },
        twitter: {
            prefix: "/twitter",
            user: "/twitter/user",
            followings: "/twitter/followings",
            tweets: "/twitter/tweets",
            search: "/twitter/search",
        }
    },
    notification_channels: {
        prefix: "/notification-channels",
    },
    verification_tokens: {
        prefix: "/verification-tokens",
        verify: "/verification-tokens/verify",
    },
    tracking: {
        market_data: {
            prefix: "/market-data/tickers",
        },
        tracked_items: {
            prefix: "/tracked-items",
            create: "/tracked-items/create",
            upsert: "/tracked-items/upsert",
        }
    },
    user_alerts: {
        prefix: "user-alerts"
    }
}