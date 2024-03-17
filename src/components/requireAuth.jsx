import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, roles }) {
  const auth = useAuth();

  const location = useLocation();
  if (roles) {
    if (!auth.isLoggedInAs(roles)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  if (!auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
