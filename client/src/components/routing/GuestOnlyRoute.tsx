// GuestOnlyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

export function GuestOnlyRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
}
