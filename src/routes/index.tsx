import { Routes, Route, Navigate } from "react-router-dom";
import ConsoleDashboard from "@/pages/console/page";
import SignUp from "@/pages/auth/pages/sign-up";
import SignIn from "@/pages/auth/pages/sign-in";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth">
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route index element={<Navigate to="/auth/sign-up" replace />} />
      </Route>

      {/* Console routes */}
      <Route path="/console">
        <Route index element={<ConsoleDashboard />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/sign-up" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/auth/sign-up" replace />} />
    </Routes>
  );
}
