import type { Turma } from '../types'

type EstadoCarregamento = 'inicial' | 'carregando' | 'ok' | 'erro'

interface Props {
  estado: EstadoCarregamento
  turmas: Turma[]
  termo: string
  mensagemErro: string | null
  turmaSelecionadaId: number | null
  tratarSelecao: (id: number) => void
}

export function ListaDeTurmas({
  estado,
  turmas,
  termo,
  mensagemErro,
  turmaSelecionadaId,
  tratarSelecao,
}: Props) {
  if (estado === 'inicial') {
    return (
      <div className="p-3 text-muted">Digite um termo para iniciar a pesquisa.</div>
    )
  }

  if (estado === 'carregando') {
    return (
      <div className="p-3 d-flex align-items-center gap-2 text-muted">
        <div className="spinner-border spinner-border-sm" role="status" />
        Buscando turmas...
      </div>
    )
  }

  if (estado === 'erro') {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {mensagemErro}
      </div>
    )
  }

  if (turmas.length === 0) {
    return (
      <div className="p-3 text-muted">
        Nenhuma turma encontrada para “{termo.trim()}”.
      </div>
    )
  }

  return (
    <div className="list-group list-group-flush">
      {turmas.map((turma) => {
        const ativo = turmaSelecionadaId === turma.id
        return (
          <button
            key={turma.id}
            type="button"
            className={`list-group-item list-group-item-action ${ativo ? 'active' : ''}`}
            onClick={() => tratarSelecao(turma.id)}
          >
            <span className="fw-semibold d-block">{turma.codigo}</span>
            <small className="text-muted">
              Ano: {turma.ano} • Período: {turma.periodo}
            </small>
          </button>
        )
      })}
    </div>
  )
}
