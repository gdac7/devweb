import type { ChangeEvent } from 'react'

interface Props {
  valor: string
  tratarPesquisa: (texto: string) => void
}

export function PesquisaTurma({ valor, tratarPesquisa }: Props) {
  const tratarMudanca = (evento: ChangeEvent<HTMLInputElement>) => {
    tratarPesquisa(evento.target.value)
  }

  return (
    <div className="mb-4">
      <label htmlFor="busca-turma" className="form-label fw-semibold">
        Pesquisa:
      </label>
      <input
        id="busca-turma"
        type="text"
        className="form-control form-control-lg"
        placeholder="Digite parte do código da turma (ex: A)"
        value={valor}
        onChange={tratarMudanca}
      />
    </div>
  )
}
