import type { ResultadoPaginado } from "../types";
import { URL_BASE } from "../util/constants";
import useFetchWithAuth from "./useFetchWithAuth";

const useApi = <T>(endpoint: string) => {
  const { fetchWithAuth } = useFetchWithAuth();
  const URL = `${URL_BASE}${endpoint}`;

  const alterar = async (obj: T) => {
    const response = await fetchWithAuth(URL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      const error: any = await response.json().catch(() => ({}));
      if (error) throw error;
      else
        throw new Error(
          "Erro desconhecido: " + " - Status code: " + response.status
        );
    }
    return await response.json();
  };

  const recuperarComPaginacao = async (
    queryString: Record<string, string>
  ): Promise<ResultadoPaginado<T>> => {
    const response = await fetchWithAuth(
      `${URL}/paginacao?` +
        new URLSearchParams({ ...queryString })
    );
    if (!response.ok) {
      const error: any = await response.json().catch(() => ({}));
      if (error) throw error;
      else
        throw new Error(
          "Erro desconhecido: " + " - Status code: " + response.status
        );
    }
    return await response.json();
  };

  return { alterar, recuperarComPaginacao };
};

export default useApi;
