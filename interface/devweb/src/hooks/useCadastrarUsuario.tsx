import { useMutation } from "@tanstack/react-query";
import type { Usuario, InfoUsuario } from "../types";
import { URL_BASE, URL_USUARIOS } from "../util/constants";

const useCadastrarUsuario = () => {
  const cadastrarUsuario = async (usuario: Usuario): Promise<InfoUsuario> => {
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
  };

  return useMutation({
    mutationFn: cadastrarUsuario,
  });
};

export default useCadastrarUsuario;
