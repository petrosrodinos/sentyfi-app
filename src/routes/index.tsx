import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import SignUp from "@/pages/auth/pages/sign-up";
import SignIn from "@/pages/auth/pages/sign-in";
import AppLayout from "@/pages/layout";
import Notifications from "@/pages/notifications";
import Tracking from "@/pages/tracking";
import Twitter from "@/pages/media/pages/x";
import News from "@/pages/media/pages/news";
import Youtube from "@/pages/media/pages/youtube";
import Reddit from "@/pages/media/pages/reddit";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth">
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route index element={<Navigate to="/auth/sign-in" replace />} />
      </Route>

      {/* Console routes with layout */}
      <Route path="/dashboard" element={<AppLayout />}>
        <Route index element={<Dashboard />} />

        {/* Media routes */}
        <Route path="media">
          <Route path="x" element={<Twitter />} />
          <Route path="youtube" element={<Youtube />} />
          <Route path="reddit" element={<Reddit />} />
          <Route path="news" element={<News />} />
        </Route>

        {/* Tracking routes */}
        <Route path="tracking" element={<Tracking />}></Route>

        <Route path="notifications" element={<Notifications />}></Route>
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}
