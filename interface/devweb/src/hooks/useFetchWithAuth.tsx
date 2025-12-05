import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/LoginStore";
import useTokenStore from "../store/TokenStore";

const useFetchWithAuth = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

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

    if (response.ok) {
      return response;
    }

    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    if (response.status === 403) {
      throw new Error("Você não tem permissão para realizar esta ação.");
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Erro: ${response.status}`);
    } else {
      const textoErro = await response.text().catch(() => '');
      throw new Error(textoErro || `Erro: ${response.status}`);
    }
  };

  return { fetchWithAuth };
};

export default useFetchWithAuth;
