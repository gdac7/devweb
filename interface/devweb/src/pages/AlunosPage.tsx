import type { Aluno } from '../types'
import { useRecuperarAlunos } from '../hooks/useRecuperarAlunos'
import useRemoverAluno from '../hooks/useRemoverAluno'
import useErrorStore from '../store/ErrorStore'
import useSuccessStore from '../store/SuccessStore'
import useTokenStore from '../store/TokenStore'
import useLoginStore from '../store/LoginStore'
import { ErrorAlert } from '../components/ErrorAlert'
import { SuccessAlert } from '../components/SuccessAlert'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function AlunosPage() {
  const navigate = useNavigate()
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse)
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido)
  const setMsg = useLoginStore((s) => s.setMsg)

  const {
    data,
    isPending,
    isError,
    error,
  } = useRecuperarAlunos()

  const { mutate: removerAluno, isPending: isRemovendoAluno } = useRemoverAluno()
  const setErrorMessage = useErrorStore((s) => s.setErrorMessage)
  const clearError = useErrorStore((s) => s.clearError)
  const setSuccessMessage = useSuccessStore((s) => s.setSuccessMessage)
  const clearSuccess = useSuccessStore((s) => s.clearSuccess)

  useEffect(() => {
    if (isError && error instanceof Error && error.message === 'UNAUTHORIZED') {
      setLoginInvalido(true)
      setMsg("Necessário estar logado para acessar este recurso.")
      setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" })
      navigate("/login", { state: { destino: "/alunos" } })
    }
  }, [isError, error])

  const handleRemover = (aluno: Aluno) => {
    if (confirm(`Tem certeza que deseja remover ${aluno.nome}?`)) {
      clearError()
      clearSuccess()
      removerAluno(aluno.id, {
        onSuccess: () => {
          setSuccessMessage(`Aluno ${aluno.nome} removido com sucesso!`)
        },
        onError: (error) => {
          if (error instanceof Error && error.message === 'UNAUTHORIZED') {
            setLoginInvalido(true)
            setMsg("Necessário estar logado para acessar este recurso.")
            setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" })
            navigate("/login", { state: { destino: "/alunos" } })
          } else {
            const mensagem = error instanceof Error ? error.message : 'Erro ao remover aluno'
            setErrorMessage(mensagem)
          }
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
      <SuccessAlert />
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
