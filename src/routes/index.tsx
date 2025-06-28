import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import SignUp from "@/pages/auth/pages/sign-up";
import SignIn from "@/pages/auth/pages/sign-in";
import AppLayout from "@/pages/layout";
import Notifications from "@/pages/notifications";
import Tracking from "@/pages/tracking";
import X from "@/pages/media/pages/x";

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

        <Route path="media">
          <Route path="x" element={<X />} />
        </Route>

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
