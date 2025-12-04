import { create } from "zustand";

interface LoginStore {
    loginInvalido: boolean;
    msg: string;
    setLoginInvalido: (loginInvalido: boolean) => void;
    setMsg: (msg: string) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
    loginInvalido: false,
    msg: "",
    setLoginInvalido: (loginInvalido: boolean) => set(() => ({ loginInvalido })),
    setMsg: (msg: string) => set(() => ({ msg })),
}));

export default useLoginStore;
