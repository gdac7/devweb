import { useEffect, useMemo, useState } from 'react'
  import { fetchJson } from '../services/api'
  import type { Aluno, Turma } from '../types'

  const PAGE_SIZE = 2

  type EstadoBusca = 'inicial' | 'carregando' | 'ok' | 'erro'

  export function TurmaBuscaPage() {
    const [query, setQuery] = useState('')
    const [estadoBusca, setEstadoBusca] = useState<EstadoBusca>('inicial')
    const [turmas, setTurmas] = useState<Turma[]>([])
    const [mensagemErroBusca, setMensagemErroBusca] = useState<string
  | null>(null)

    const [turmaSelecionadaId, setTurmaSelecionadaId] = useState<number
  | null>(null)
    const [estadoDetalhes, setEstadoDetalhes] =
  useState<EstadoBusca>('inicial')
    const [turmaSelecionada, setTurmaSelecionada] = useState<Turma |
  null>(null)
    const [mensagemErroDetalhes, setMensagemErroDetalhes] = useState<string
  | null>(null)

    const [paginaAtual, setPaginaAtual] = useState(1)

    useEffect(() => {
      const termo = query.trim()

      if (termo === '') {
        setEstadoBusca('inicial')
        setTurmas([])
        setMensagemErroBusca(null)
        setTurmaSelecionadaId(null)
        setTurmaSelecionada(null)
        setPaginaAtual(1)
        return
      }

      setEstadoBusca('carregando')
      const timeout = setTimeout(() => {
        fetchJson<Turma[]>(`/turmas/buscar?q=${encodeURIComponent(termo)}`)
          .then((dados) => {
            setTurmas(dados)
            setEstadoBusca('ok')
            setMensagemErroBusca(null)
            setTurmaSelecionadaId(null)
            setTurmaSelecionada(null)
            setPaginaAtual(1)
          })
          .catch((erro: unknown) => {
            setEstadoBusca('erro')
            setMensagemErroBusca(
              erro instanceof Error ? erro.message : 'Falha ao pesquisar turmas',
            )
            setTurmas([])
          })
      }, 400)

      return () => clearTimeout(timeout)
    }, [query])

    useEffect(() => {
      if (turmaSelecionadaId === null) {
        setEstadoDetalhes('inicial')
        setTurmaSelecionada(null)
        setMensagemErroDetalhes(null)
        setPaginaAtual(1)
        return
      }

      setEstadoDetalhes('carregando')
      fetchJson<Turma>(`/turmas/${turmaSelecionadaId}`)
        .then((dados) => {
          setTurmaSelecionada(dados)
          setEstadoDetalhes('ok')
          setMensagemErroDetalhes(null)
          setPaginaAtual(1)
        })
        .catch((erro: unknown) => {
          setEstadoDetalhes('erro')
          setMensagemErroDetalhes(
            erro instanceof Error
              ? erro.message
              : 'Falha ao carregar detalhes da turma',
          )
          setTurmaSelecionada(null)
        })
    }, [turmaSelecionadaId])

    const alunosOrdenados = useMemo(() => {
      if (!turmaSelecionada?.inscricoes) {
        return []
      }
      const mapa = new Map<number, Aluno>()
      turmaSelecionada.inscricoes.forEach((inscricao) => {
        if (inscricao.aluno) {
          mapa.set(inscricao.aluno.id, inscricao.aluno)
        }
      })
      return Array.from(mapa.values()).sort((a, b) =>
        a.nome.localeCompare(b.nome, 'pt-BR'),
      )
    }, [turmaSelecionada])

    const totalPaginas = Math.max(
      1,
      Math.ceil(alunosOrdenados.length / PAGE_SIZE),
    )
    const alunosPagina = useMemo(() => {
      const inicio = (paginaAtual - 1) * PAGE_SIZE
      return alunosOrdenados.slice(inicio, inicio + PAGE_SIZE)
    }, [alunosOrdenados, paginaAtual])

    useEffect(() => {
      const maxPagina = Math.max(
        1,
        Math.ceil(alunosOrdenados.length / PAGE_SIZE),
      )
      if (paginaAtual > maxPagina) {
        setPaginaAtual(maxPagina)
      }
    }, [alunosOrdenados, paginaAtual])

    const handleSelecionarTurma = (id: number) => {
      setTurmaSelecionadaId(id)
    }

    const handlePaginaAnterior = () => {
      setPaginaAtual((pagina) => Math.max(1, pagina - 1))
    }

    const handleProximaPagina = () => {
      setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1))
    }

    return (
      <section>
        <h2 className="h3 mb-4 d-flex align-items-center gap-2">
          <i className="bi bi-search" />
          Pesquisa de Turmas
        </h2>

        <div className="mb-4">
          <label htmlFor="busca-turma" className="form-label fw-semibold">
            Pesquisa:
          </label>
          <input
            id="busca-turma"
            type="text"
            className="form-control form-control-lg"
            placeholder="Digite parte do código da turma (ex: A)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header fw-semibold">Turmas</div>
              <div className="card-body p-0">
                {estadoBusca === 'inicial' && (
                  <div className="p-3 text-muted">
                    Digite um termo para iniciar a pesquisa.
                  </div>
                )}
                {estadoBusca === 'carregando' && (
                  <div className="p-3 d-flex align-items-center gap-2 text-
  muted">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                    Buscando turmas...
                  </div>
                )}
                {estadoBusca === 'erro' && (
                  <div className="alert alert-danger m-3" role="alert">
                    {mensagemErroBusca}
                  </div>
                )}
                {estadoBusca === 'ok' && turmas.length === 0 && (
                  <div className="p-3 text-muted">
                    Nenhuma turma encontrada para “{query.trim()}”.
                  </div>
                )}
                {estadoBusca === 'ok' && turmas.length > 0 && (
                  <div className="list-group list-group-flush">
                    {turmas.map((turma) => {
                      const ativo = turmaSelecionadaId === turma.id
                      return (
                        <button
                          key={turma.id}
                          type="button"
                          className={`list-group-item list-group-item-action
  ${
                            ativo ? 'active' : ''
                          }`}
                          onClick={() => handleSelecionarTurma(turma.id)}
                        >
                          <span className="fw-semibold d-block">
                            {turma.codigo}
                          </span>
                          <small className="text-muted">
                            Ano: {turma.ano}  Período: {turma.periodo}
                          </small>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-header fw-semibold d-flex flex-wrap gap-
  3">
                <span className="me-4">
                  Ano:{' '}
                  <strong>
                    {turmaSelecionada?.ano ?? '—'}
                  </strong>
                </span>
                <span className="me-4">
                  Período:{' '}
                  <strong>
                    {turmaSelecionada?.periodo ?? '—'}
                  </strong>
                </span>
                <span className="me-4">
                  Disciplina:{' '}
                  <strong>
                    {turmaSelecionada?.disciplina?.nome ?? '—'}
                  </strong>
                </span>
                <span className="me-4">
                  Prof:{' '}
                  <strong>
                    {turmaSelecionada?.professor?.nome ?? '—'}
                  </strong>
                </span>
              </div>

              <div className="card-body">
                {estadoDetalhes === 'inicial' && (
                  <div className="text-muted">
                    Selecione uma turma para ver os alunos inscritos.
                  </div>
                )}
                {estadoDetalhes === 'carregando' && (
                  <div className="d-flex align-items-center gap-2 text-
  muted">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                    Carregando detalhes da turma...
                  </div>
                )}
                {estadoDetalhes === 'erro' && (
                  <div className="alert alert-danger" role="alert">
                    {mensagemErroDetalhes}
                  </div>
                )}
                {estadoDetalhes === 'ok' && (
                  <>
                    {alunosOrdenados.length === 0 ? (
                      <div className="alert alert-info" role="alert">
                        Nenhum aluno inscrito nesta turma.
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive mb-3">
                          <table className="table table-striped table-hover
  align-middle mb-0">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Cpf</th>
                              </tr>
                            </thead>
                            <tbody>
                              {alunosPagina.map((aluno) => (
                                <tr key={aluno.id}>
                                  <td>{aluno.id}</td>
                                  <td>{aluno.nome}</td>
                                  <td>{aluno.email}</td>
                                  <td>{aluno.cpf ?? "Não informado"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {totalPaginas > 1 && (
                          <nav aria-label="Paginação de alunos">
                            <ul className="pagination mb-0">
                              <li className={`page-item ${paginaAtual ===
  1 ? 'disabled' : ''}`}>
                                <button
                                  className="page-link"
                                  type="button"
                                  onClick={handlePaginaAnterior}
                                >
                                  <i className="bi bi-arrow-left" />
                                </button>
                              </li>
                              {Array.from({ length: totalPaginas }, (_,
  indice) => {
                                const numero = indice + 1
                                return (
                                  <li
                                    key={numero}
                                    className={`page-item ${paginaAtual ===
  numero ? 'active' : ''}`}
                                  >
                                    <button
                                      type="button"
                                      className="page-link"
                                      onClick={() => setPaginaAtual(numero)}
                                    >
                                      {numero}
                                    </button>
                                  </li>
                                )
                              })}
                              <li className={`page-item ${paginaAtual ===
  totalPaginas ? 'disabled' : ''}`}>
                                <button
                                  className="page-link"
                                  type="button"
                                  onClick={handleProximaPagina}
                                >
                                  <i className="bi bi-arrow-right" />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}