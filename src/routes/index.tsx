import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import Alerts from "@/pages/alerts";
import SignUp from "@/pages/auth/pages/sign-up";
import SignIn from "@/pages/auth/pages/sign-in";
import AppLayout from "@/pages/layout";
import Twitter from "@/pages/media/pages/x";
import News from "@/pages/media/pages/news";
import Youtube from "@/pages/media/pages/youtube";
import Reddit from "@/pages/media/pages/reddit";
import Stocks from "@/pages/tracking/pages/stocks";
import Crypto from "@/pages/tracking/pages/crypto";
import EmailNotifications from "@/pages/notifications/pages/email";
import SMSNotifications from "@/pages/notifications/pages/sms";
import WhatsAppNotifications from "@/pages/notifications/pages/whatsapp";
import TelegramNotifications from "@/pages/notifications/pages/telegram";
import DiscordNotifications from "@/pages/notifications/pages/discord";
import PushNotifications from "@/pages/notifications/pages/push";
import PhoneCallNotifications from "@/pages/notifications/pages/phone-call";
import NotificationsLayout from "@/pages/notifications/layout";
import NotificationChannels from "@/pages/notifications/pages/channels";
import TrackingLayout from "@/pages/tracking/layout";
import MediaLayout from "@/pages/media/layout";
import AuthLayout from "@/pages/auth/layout";
import Keywords from "@/pages/tracking/pages/keyword";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route index element={<Navigate to="/auth/sign-in" replace />} />
      </Route>

      {/* Console routes with layout */}
      <Route path="/dashboard" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />

        {/* Media routes */}
        <Route path="media" element={<MediaLayout />}>
          <Route path="x" element={<Twitter />} />
          <Route path="youtube" element={<Youtube />} />
          <Route path="reddit" element={<Reddit />} />
          <Route path="news" element={<News />} />
        </Route>

        {/* Tracking routes */}
        <Route path="tracking" element={<TrackingLayout />}>
          <Route path="stocks" element={<Stocks />} />
          <Route path="crypto" element={<Crypto />} />
          <Route path="keywords" element={<Keywords />} />
        </Route>

        <Route path="notifications" element={<NotificationsLayout />}>
          <Route path="channels" element={<NotificationChannels />} />
          <Route path="push" element={<PushNotifications />} />
          <Route path="email" element={<EmailNotifications />} />
          <Route path="sms" element={<SMSNotifications />} />
          <Route path="whatsapp" element={<WhatsAppNotifications />} />
          <Route path="telegram" element={<TelegramNotifications />} />
          <Route path="discord" element={<DiscordNotifications />} />
          <Route path="phone-call" element={<PhoneCallNotifications />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}
