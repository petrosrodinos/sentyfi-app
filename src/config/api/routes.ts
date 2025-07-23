export const API_URL = import.meta.env.VITE_API_URL;

export const ApiRoutes = {
    users: {
        prefix: "/users",
        me: "/users/me",
    },
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
            admin: "/media-subscriptions/admin",
        },
        twitter: {
            prefix: "/twitter",
            user: "/twitter/user",
            followings: "/twitter/followings",
            tweets: "/twitter/tweets",
            search: "/twitter/search",
        }
    },
    tracking: {
        market_data: {
            prefix: "/market-data/tickers",
        },
        tracked_items: {
            prefix: "/tracked-items",
            create: "/tracked-items/create",
            upsert: "/tracked-items/upsert",
            admin: "/tracked-items/admin",
        }
    },
    notification_channels: {
        prefix: "/notification-channels",
    },
    verification_tokens: {
        prefix: "/verification-tokens",
        verify: "/verification-tokens/verify",
    },
    alerts: {
        prefix: "/alerts",
    },
    user_alerts: {
        prefix: "/user-alerts"
    }
}