import type { Aluno } from '../types'
import { useRecuperarAlunos } from '../hooks/useRecuperarAlunos'
import useRemoverAluno from '../hooks/useRemoverAluno'
import useErrorStore from '../store/ErrorStore'
import { ErrorAlert } from '../components/ErrorAlert'

export function AlunosPage() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useRecuperarAlunos()

  const { mutate: removerAluno, isPending: isRemovendoAluno } = useRemoverAluno()
  const setErrorMessage = useErrorStore((s) => s.setErrorMessage)
  const clearError = useErrorStore((s) => s.clearError)

  const handleRemover = (aluno: Aluno) => {
    if (confirm(`Tem certeza que deseja remover ${aluno.nome}?`)) {
      clearError()
      removerAluno(aluno.id, {
        onError: (error) => {
          const mensagem = error instanceof Error ? error.message : 'Erro ao remover aluno'
          setErrorMessage(mensagem)
        },
      })
    }
  }

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
      <ErrorAlert />
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemover(aluno)}
                    disabled={isRemovendoAluno}
                  >
                    <i className="bi bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
