import { useEffect, useState } from 'react'
import { fetchJson } from '../services/api'
import type { Aluno } from '../types'

export function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchJson<Aluno[]>('/alunos')
      .then((dados) => {
        if (isMounted) {
          setAlunos(dados)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : 'Erro ao carregar alunos'
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

  if (alunos.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Nenhum aluno cadastrado.
      </div>
    )
  }

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="h3 mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-people" />
          Alunos
        </h2>
        <span className="badge text-bg-secondary fs-6">
          Total: {alunos.length}
        </span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
