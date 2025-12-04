import { create } from "zustand";

export interface TokenResponse {
    token: string;
    idUsuario: number;
    nome: string;
    role: string;
}

interface TokenStore {
    tokenResponse: TokenResponse;
    setTokenResponse: (novoTokenResponse: TokenResponse) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
    tokenResponse: { token: "", idUsuario: 0, nome: "", role: "" },
    setTokenResponse: (novoTokenResponse: TokenResponse) =>
        set(() => ({ tokenResponse: novoTokenResponse })),
}));

export default useTokenStore;
