import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecuperarAlunoPorId } from '../hooks/useRecuperarAlunoPorId'
import useAlunoStore from '../store/AlunoStore'
import type { Aluno } from '../types'

const AlunoPage = () => {
  const mensagem = useAlunoStore((s) => s.mensagem)
  const setMensagem = useAlunoStore((s) => s.setMensagem)
  const setAlunoSelecionado = useAlunoStore((s) => s.setAlunoSelecionado)

  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      setMensagem('')
    }
  }, [])

  const { id } = useParams()

  const {
    data: aluno,
    isPending: recuperandoAluno,
    error: errorRecuperarAluno,
  } = useRecuperarAlunoPorId(+id!)

  const tratarEdicao = (aluno: Aluno) => {
    setAlunoSelecionado(aluno)
    navigate('/cadastrar-aluno')
  }

  if (errorRecuperarAluno) throw errorRecuperarAluno
  if (recuperandoAluno) return <p>Recuperando aluno...</p>

  return (
    <>
      <div className="mb-4">
        <h5>Página de Aluno</h5>
        <hr className="mt-1" />
      </div>

      {mensagem && (
        <div className="alert alert-success fw-bold" role="alert">
          {mensagem}
        </div>
      )}

      <div className="row mb-3">
        <div className="col-lg-9 col-md-8">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">ID</div>
            <div className="col-xl-10 col-lg-9 col-8">{aluno.id}</div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Nome</div>
            <div className="col-xl-10 col-lg-9 col-8">{aluno.nome}</div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Email</div>
            <div className="col-xl-10 col-lg-9 col-8">{aluno.email}</div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">CPF</div>
            <div className="col-xl-10 col-lg-9 col-8">{aluno.cpf}</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-3">
          <button
            onClick={() => tratarEdicao(aluno)}
            className="btn btn-success btn-sm w-100"
            type="button"
          >
            Editar
          </button>
        </div>
      </div>
    </>
  )
}

export default AlunoPage
