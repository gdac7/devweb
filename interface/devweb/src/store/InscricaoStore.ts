import { create } from "zustand";

interface InscricaoStore {
    disciplinaId: number | null;
    turmaId: number | null;
    alunoId: number | null;
    termoPesquisa: string;
    pagina: number;
    tamanho: number;

    setDisciplinaId: (id: number | null) => void;
    setTurmaId: (id: number | null) => void;
    setAlunoId: (id: number | null) => void;
    setTermoPesquisa: (termo: string) => void;
    setPagina: (novaPagina: number) => void;
}

const useInscricaoStore = create<InscricaoStore>((set) => ({
    disciplinaId: null,
    turmaId: null,
    alunoId: null,
    termoPesquisa: "",
    pagina: 0,
    tamanho: 5,

    setDisciplinaId: (id) => set(() => ({ disciplinaId: id, turmaId: null, alunoId: null })),
    setTurmaId: (id) => set(() => ({ turmaId: id, alunoId: null, pagina: 0 })),
    setAlunoId: (id) => set(() => ({ alunoId: id })),
    setTermoPesquisa: (termo) => set(() => ({ termoPesquisa: termo, pagina: 0 })),
    setPagina: (novaPagina) => set(() => ({ pagina: novaPagina })),
}));

export default useInscricaoStore;
