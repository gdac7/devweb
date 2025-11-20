import { create } from 'zustand'
import type { Aluno } from '../types'

interface AlunoStore {
  mensagem: string
  alunoSelecionado: Aluno

  setMensagem: (novaMensagem: string) => void
  setAlunoSelecionado: (novoAlunoSelecionado: Aluno) => void
}

const useAlunoStore = create<AlunoStore>((set) => ({
  mensagem: '',
  alunoSelecionado: {} as Aluno,

  setMensagem: (novaMensagem: string) => set(() => ({ mensagem: novaMensagem })),
  setAlunoSelecionado: (novoAlunoSelecionado: Aluno) =>
    set(() => ({ alunoSelecionado: novoAlunoSelecionado })),
}))

export default useAlunoStore
