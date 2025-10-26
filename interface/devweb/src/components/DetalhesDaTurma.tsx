import type { Aluno, Turma } from '../types'
import { PaginacaoAlunos } from './PaginacaoAlunos'
import { TabelaDeAlunos } from './TabelaDeAlunos'

type EstadoCarregamento = 'inicial' | 'carregando' | 'ok' | 'erro'

interface Props {
  estado: EstadoCarregamento
  turma: Turma | null
  mensagemErro: string | null
  alunosPagina: Aluno[]
  pagina: number
  totalDePaginas: number
  tratarPaginaAnterior: () => void
  tratarProximaPagina: () => void
  tratarIrParaPagina: (numero: number) => void
}

export function DetalhesDaTurma({
  estado,
  turma,
  mensagemErro,
  alunosPagina,
  pagina,
  totalDePaginas,
  tratarPaginaAnterior,
  tratarProximaPagina,
  tratarIrParaPagina,
}: Props) {
  if (estado === 'inicial') {
    return <div className="text-muted">Selecione uma turma para ver os alunos inscritos.</div>
  }

  if (estado === 'carregando') {
    return (
      <div className="d-flex align-items-center gap-2 text-muted">
        <div className="spinner-border spinner-border-sm" role="status" />
        Carregando detalhes da turma...
      </div>
    )
  }

  if (estado === 'erro') {
    return (
      <div className="alert alert-danger" role="alert">
        {mensagemErro}
      </div>
    )
  }

  if (!turma?.inscricoes?.length) {
    return (
      <div className="alert alert-info" role="alert">
        Nenhum aluno inscrito nesta turma.
      </div>
    )
  }

  return (
    <>
      <TabelaDeAlunos alunos={alunosPagina} />
      <PaginacaoAlunos
        pagina={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginaAnterior={tratarPaginaAnterior}
        tratarProximaPagina={tratarProximaPagina}
        tratarIrParaPagina={tratarIrParaPagina}
      />
    </>
  )
}
