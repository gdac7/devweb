import { create } from "zustand";

interface LoginStore {
    loginInvalido: boolean;
    msg: string;
    isLoggingOut: boolean;
    setLoginInvalido: (loginInvalido: boolean) => void;
    setMsg: (msg: string) => void;
    setIsLoggingOut: (isLoggingOut: boolean) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
    loginInvalido: false,
    msg: "",
    isLoggingOut: false,
    setLoginInvalido: (loginInvalido: boolean) => set(() => ({ loginInvalido })),
    setMsg: (msg: string) => set(() => ({ msg })),
    setIsLoggingOut: (isLoggingOut: boolean) => set(() => ({ isLoggingOut })),
}));

export default useLoginStore;
