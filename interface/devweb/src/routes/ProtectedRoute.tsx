import { Navigate, Outlet, useLocation } from "react-router-dom";
import useTokenStore from "../store/TokenStore";
import useLoginStore from "../store/LoginStore";

const ProtectedRoute = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);
  const location = useLocation();

  if (!tokenResponse.token) {
    setLoginInvalido(true);
    setMsg("Necessário estar logado para acessar este recurso.");
    return <Navigate to="/login" state={{ destino: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
