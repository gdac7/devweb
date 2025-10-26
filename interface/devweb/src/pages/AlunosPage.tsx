import type { Aluno } from '../types'
import { useRecuperarAlunos } from '../hooks/useRecuperarAlunos'

export function AlunosPage() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useRecuperarAlunos()

  if (isPending) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  if (isError) {
    const mensagem =
      error instanceof Error ? error.message : 'Erro ao carregar alunos'
    return (
      <div className="alert alert-danger" role="alert">
        {mensagem}
      </div>
    )
  }

  const alunos: Aluno[] = data ?? []

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
