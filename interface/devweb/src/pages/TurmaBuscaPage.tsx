import { useEffect, useMemo, useState } from 'react'
import { ListaDeTurmas } from '../components/ListaDeTurmas'
import { DetalhesDaTurma } from '../components/DetalhesDaTurma'
import { PesquisaTurma } from '../components/PesquisaTurma'
import { useBuscarTurmas } from '../hooks/useBuscarTurmas'
import { useBuscarTurmaPorId } from '../hooks/useBuscarTurmaPorId'
import { useValorDebounce } from '../hooks/useValorDebounce'

const TAMANHO_PAGINA = 2

export function TurmaBuscaPage() {
  const [pesquisa, setPesquisa] = useState('')
  const termoDebounce = useValorDebounce(pesquisa)

  const termoNormalizado = termoDebounce.trim()

  const {
    data: turmasEncontradas,
    isPending: carregandoTurmas,
    isError: erroAoBuscarTurmas,
    error: erroBuscarTurmas,
  } = useBuscarTurmas(termoDebounce)

  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState<number | null>(null)

  const {
    data: detalhesDaTurma,
    isPending: carregandoDetalhes,
    isError: erroAoBuscarDetalhes,
    error: erroBuscarDetalhes,
  } = useBuscarTurmaPorId(turmaSelecionadaId)

  const mensagemErroTurmas =
    erroAoBuscarTurmas && erroBuscarTurmas instanceof Error
      ? erroBuscarTurmas.message
      : erroAoBuscarTurmas
        ? 'Falha ao pesquisar turmas'
        : null

  const mensagemErroTurma =
    erroAoBuscarDetalhes && erroBuscarDetalhes instanceof Error
      ? erroBuscarDetalhes.message
      : erroAoBuscarDetalhes
        ? 'Falha ao carregar detalhes da turma'
        : null

  const estadoTurmas: 'inicial' | 'carregando' | 'ok' | 'erro' =
    termoNormalizado.length === 0
      ? 'inicial'
      : carregandoTurmas
        ? 'carregando'
        : erroAoBuscarTurmas
          ? 'erro'
          : 'ok'

  const estadoTurma: 'inicial' | 'carregando' | 'ok' | 'erro' =
    turmaSelecionadaId == null
      ? 'inicial'
      : carregandoDetalhes
        ? 'carregando'
        : erroAoBuscarDetalhes
          ? 'erro'
          : 'ok'

  const turmas = estadoTurmas === 'ok' ? turmasEncontradas ?? [] : []
  const turma = estadoTurma === 'ok' ? detalhesDaTurma ?? null : null

  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    setTurmaSelecionadaId(null)
    setPagina(1)
  }, [termoDebounce])

  useEffect(() => {
    setPagina(1)
  }, [turmaSelecionadaId])

  const alunosOrdenados = useMemo(() => {
    if (!turma?.inscricoes) {
      return []
    }

    const alunos = turma.inscricoes
      .filter((inscricao) => inscricao.aluno)
      .map((inscricao) => inscricao.aluno!)

    const mapa = new Map(alunos.map((aluno) => [aluno.id, aluno]))
    return Array.from(mapa.values()).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }, [turma])

  const totalDePaginas = Math.max(1, Math.ceil(alunosOrdenados.length / TAMANHO_PAGINA))

  useEffect(() => {
    if (pagina > totalDePaginas) {
      setPagina(totalDePaginas)
    }
  }, [pagina, totalDePaginas])

  const alunosPagina = useMemo(() => {
    const inicio = (pagina - 1) * TAMANHO_PAGINA
    return alunosOrdenados.slice(inicio, inicio + TAMANHO_PAGINA)
  }, [alunosOrdenados, pagina])

  const tratarSelecaoTurma = (id: number) => setTurmaSelecionadaId(id)
  const tratarPaginaAnterior = () => setPagina((valorAtual) => Math.max(1, valorAtual - 1))
  const tratarProximaPagina = () => setPagina((valorAtual) => Math.min(totalDePaginas, valorAtual + 1))
  const tratarIrParaPagina = (numero: number) => setPagina(numero)

  return (
    <section>
      <h2 className="h3 mb-4 d-flex align-items-center gap-2">
        <i className="bi bi-search" />
        Pesquisa de Turmas
      </h2>

      <PesquisaTurma valor={pesquisa} tratarPesquisa={setPesquisa} />

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header fw-semibold">Turmas</div>
            <div className="card-body p-0">
              <ListaDeTurmas
                estado={estadoTurmas}
                turmas={turmas}
                termo={pesquisa}
                mensagemErro={mensagemErroTurmas}
                turmaSelecionadaId={turmaSelecionadaId}
                tratarSelecao={tratarSelecaoTurma}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-semibold d-flex flex-wrap gap-3">
              <span className="me-4">
                Ano: <strong>{turma?.ano ?? '—'}</strong>
              </span>
              <span className="me-4">
                Período: <strong>{turma?.periodo ?? '—'}</strong>
              </span>
              <span className="me-4">
                Disciplina: <strong>{turma?.disciplina?.nome ?? '—'}</strong>
              </span>
              <span className="me-4">
                Prof: <strong>{turma?.professor?.nome ?? '—'}</strong>
              </span>
            </div>
            <div className="card-body">
              <DetalhesDaTurma
                estado={estadoTurma}
                turma={turma}
                mensagemErro={mensagemErroTurma}
                pagina={pagina}
                totalDePaginas={totalDePaginas}
                alunosPagina={alunosPagina}
                tratarPaginaAnterior={tratarPaginaAnterior}
                tratarProximaPagina={tratarProximaPagina}
                tratarIrParaPagina={tratarIrParaPagina}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
