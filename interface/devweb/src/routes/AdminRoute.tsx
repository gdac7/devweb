import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../store/TokenStore";
import useLoginStore from "../store/LoginStore";

const AdminRoute = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);

  if (tokenResponse.role !== "ADMIN") {
    setLoginInvalido(true);
    setMsg("Você não tem permissão para acessar este recurso.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
