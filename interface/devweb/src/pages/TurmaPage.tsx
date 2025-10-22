import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchJson } from '../services/api'
import type { Aluno, Turma } from '../types'

export function TurmaPage() {
  const { id } = useParams<{ id: string }>()
  const [turma, setTurma] = useState<Turma | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Turma não encontrada')
      setLoading(false)
      return
    }
    let isMounted = true
    fetchJson<Turma>(`/turmas/${id}`)
      .then((dados) => {
        if (isMounted) {
          setTurma(dados)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : 'Erro ao carregar turma'
          setError(message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [id])

  const alunosInscritos = useMemo(() => {
    if (!turma || !turma.inscricoes) {
      return []
    }
    const mapa = new Map<number, Aluno>()
    turma.inscricoes.forEach((inscricao) => {
      if (inscricao.aluno) {
        mapa.set(inscricao.aluno.id, inscricao.aluno)
      }
    })
    return Array.from(mapa.values()).sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR'),
    )
  }, [turma])

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  if (!turma) {
    return (
      <div className="alert alert-warning" role="alert">
        Turma não encontrada.
      </div>
    )
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-easel" />
          Turma {turma.ano} - {turma.periodo}
        </h2>
        <Link to="/turmas" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2" />
          Voltar
        </Link>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">Disciplina</h3>
              <p className="mb-1 fw-semibold">
                {turma.disciplina?.nome ?? 'Não informada'}
              </p>
              {turma.disciplina?.cargaHoraria ? (
                <span className="text-muted">
                  Carga horária: {turma.disciplina.cargaHoraria}h
                </span>
              ) : (
                <span className="text-muted">Carga horária não informada</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">Professor</h3>
              <p className="mb-1 fw-semibold">
                {turma.professor?.nome ?? 'Não informado'}
              </p>
              <span className="text-muted">
                {turma.professor?.email ?? 'Email não informado'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="h5 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-people" />
            Alunos inscritos
          </h3>
          {alunosInscritos.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              Nenhum aluno inscrito nesta turma.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosInscritos.map((aluno) => (
                    <tr key={aluno.id}>
                      <td>{aluno.nome}</td>
                      <td>{aluno.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
