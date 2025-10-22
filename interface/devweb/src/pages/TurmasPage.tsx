import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchJson } from '../services/api'
import type { Turma } from '../types'

export function TurmasPage() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchJson<Turma[]>('/turmas')
      .then((dados) => {
        if (isMounted) {
          setTurmas(dados)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : 'Erro ao carregar turmas'
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
  }, [])

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

  if (turmas.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Nenhuma turma cadastrada.
      </div>
    )
  }

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="h3 mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-easel" />
          Turmas
        </h2>
        <span className="badge text-bg-secondary fs-6">
          Total: {turmas.length}
        </span>
      </div>
      <div className="row g-3">
        {turmas.map((turma) => {
          const totalAlunos = turma.inscricoes?.length ?? 0
          return (
            <div className="col-12 col-md-6 col-lg-4" key={turma.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h3 className="h5">
                    Turma {turma.ano} - {turma.periodo}
                  </h3>
                  <p className="text-muted mb-2">
                    {turma.disciplina?.nome ?? 'Disciplina não informada'}
                  </p>
                  <p className="mb-3">
                    Professor:{' '}
                    <span className="fw-semibold">
                      {turma.professor?.nome ?? 'Não informado'}
                    </span>
                  </p>
                  <p className="mb-4">
                    Alunos inscritos:{' '}
                    <span className="fw-semibold">{totalAlunos}</span>
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/turmas/${turma.id}`}
                      className="btn btn-primary w-100"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
