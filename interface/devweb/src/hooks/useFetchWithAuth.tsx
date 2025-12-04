import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/LoginStore";
import useTokenStore from "../store/TokenStore";

const useFetchWithAuth = () => {
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const navigate = useNavigate();

  const fetchWithAuth = async (url: string, options?: any) => {
    const token = tokenResponse.token;

    let newHeaders: Record<string, string> = {};
    if (options && options.headers) {
      newHeaders = { ...options.headers };
    }

    if (token !== "") {
      newHeaders["Authorization"] = `Bearer ${token}`;
    }

    options = { ...(options || {}), headers: newHeaders };

    const response = await fetch(url, { ...options });

    if (!response.ok) {
      if (response.status === 401) {
        setLoginInvalido(true);
        setMsg("Necessário estar logado para acessar este recurso.");
        setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
        navigate("/login");
      } else if (response.status === 403) {
        throw new Error("Você não tem permissão para realizar esta ação.");
      } else {
        const error: any = await response.json().catch(() => ({}));
        if (error) throw error;
        else
          throw new Error(
            "Erro desconhecido: " + " - Status code: " + response.status
          );
      }
    }
    return response;
  };

  return { fetchWithAuth };
};

export default useFetchWithAuth;
