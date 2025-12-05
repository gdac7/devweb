import { useMutation } from "@tanstack/react-query";
import type { Usuario, InfoUsuario } from "../types";
import { URL_BASE, URL_USUARIOS } from "../util/constants";
import useFetchWithAuth from "./useFetchWithAuth";
import useTokenStore from "../store/TokenStore";

const useCadastrarUsuario = () => {
  const { fetchWithAuth } = useFetchWithAuth();
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  const cadastrarUsuario = async (usuario: Usuario): Promise<InfoUsuario> => {
    const isAuthenticated = tokenResponse.token !== "";

    if (isAuthenticated) {
      const response = await fetchWithAuth(`${URL_BASE}${URL_USUARIOS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      return await response.json();
    } else {
      const response = await fetch(`${URL_BASE}${URL_USUARIOS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const error: any = await response.json().catch(() => ({}));
        if (error) throw error;
        throw new Error("Erro ao cadastrar usuário. Status: " + response.status);
      }

      return await response.json();
    }
  };

  return useMutation({
    mutationFn: cadastrarUsuario,
  });
};

export default useCadastrarUsuario;
