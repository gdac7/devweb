import { useMutation } from "@tanstack/react-query";
import type { UsuarioLogin } from "../types";
import type { TokenResponse } from "../store/TokenStore";
import { URL_BASE, URL_AUTH } from "../util/constants";

const useEfetuarLogin = () => {
  const efetuarLogin = async (usuarioLogin: UsuarioLogin): Promise<TokenResponse> => {
    const response = await fetch(`${URL_BASE}${URL_AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioLogin),
    });

    if (!response.ok) {
      const error: any = await response.json().catch(() => ({}));
      if (error) throw error;
      throw new Error("Erro ao efetuar login. Status: " + response.status);
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: efetuarLogin,
  });
};

export default useEfetuarLogin;
