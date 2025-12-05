import { Navigate, Outlet, useLocation } from "react-router-dom";
import useTokenStore from "../store/TokenStore";
import useLoginStore from "../store/LoginStore";

const ProtectedRoute = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const isLoggingOut = useLoginStore((s) => s.isLoggingOut);
  const location = useLocation();

  if (!tokenResponse.token && !isLoggingOut) {
    return <Navigate to="/login" state={{ destino: location.pathname, needsAuth: true }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
