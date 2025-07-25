export const Routes = {
    auth: {
        sign_in: "/auth/sign-in",
        sign_up: "/auth/sign-up",
        forgot_password: "/auth/forgot-password",
        reset_password: "/auth/reset-password",
        verify_email: "/auth/verify-email",
        verify_phone: "/auth/verify-phone",
        verify_email_otp: "/auth/verify-email-otp",
        verify_phone_otp: "/auth/verify-phone-otp",
    },
    dashboard: "/dashboard",
    alerts: "/dashboard/alerts",
    media: {
        twitter: "/dashboard/media/twitter",
        youtube: "/dashboard/media/youtube",
        reddit: "/dashboard/media/reddit",
        news: "/dashboard/media/news",
    },
    tracking: {
        stocks: "/dashboard/tracking/stocks",
        crypto: "/dashboard/tracking/crypto",
        keywords: "/dashboard/tracking/keywords",
    },
    notifications: {
        root: "/dashboard/notifications/channels",
        channels: "/dashboard/notifications/channels",
        push: "/dashboard/notifications/push",
        email: "/dashboard/notifications/email",
        sms: "/dashboard/notifications/sms",
        whatsapp: "/dashboard/notifications/whatsapp",
        telegram: "/dashboard/notifications/telegram",
        discord: "/dashboard/notifications/discord",
        phone: "/dashboard/notifications/phone",
    },
    account: {
        profile: "/dashboard/account/profile",
        password: "/dashboard/account/password",
        appearance: "/dashboard/account/appearance",
        notifications: "/dashboard/account/notifications",
    },
    billing: {
        subscription: "/dashboard/billing/subscription",
        invoices: "/dashboard/billing/invoices",
        payment: "/dashboard/billing/payment",
    },
    admin: {
        users: "/dashboard/admin/users",
        alerts: "/dashboard/admin/alerts",
    }

};