import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Aluno } from '../types'
import useCadastrarAluno from '../hooks/useCadastrarAluno'
import useAlterarAluno from '../hooks/useAlterarAluno'
import useAlunoStore from '../store/AlunoStore'

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  cpf: z.string().min(1, 'CPF é obrigatório'),
})

type FormAluno = z.infer<typeof schema>

const AlunoForm = () => {
  const setMensagem = useAlunoStore((s) => s.setMensagem)
  const alunoSelecionado = useAlunoStore((s) => s.alunoSelecionado)

  const navigate = useNavigate()
  const { mutate: cadastrarAluno, error: errorCadastrarAluno } = useCadastrarAluno()
  const { mutate: alterarAluno, error: errorAlterarAluno } = useAlterarAluno()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormAluno>({ resolver: zodResolver(schema) })

  const inicializaForm = () => {
    if (alunoSelecionado.id) {
      setValue('nome', alunoSelecionado.nome)
      setValue('email', alunoSelecionado.email)
      setValue('cpf', alunoSelecionado.cpf)
    } else {
      reset()
    }
  }

  useEffect(() => {
    inicializaForm()
  }, [alunoSelecionado])

  const submit = ({ nome, email, cpf }: FormAluno) => {
    if (alunoSelecionado.id) {
      const aluno: Aluno = {
        id: alunoSelecionado.id,
        nome,
        email,
        cpf,
      }
      alterarAluno(aluno, {
        onSuccess: (alunoAlterado: Aluno) => {
          setMensagem('Aluno alterado com sucesso!')
          navigate('/alunos/' + alunoAlterado.id)
        },
      })
    } else {
      const aluno = { nome, email, cpf }
      cadastrarAluno(aluno, {
        onSuccess: (alunoCadastrado: Aluno) => {
          setMensagem('Aluno cadastrado com sucesso!')
          navigate('/alunos/' + alunoCadastrado.id)
        },
      })
    }
  }

  if (errorCadastrarAluno) throw errorCadastrarAluno
  if (errorAlterarAluno) throw errorAlterarAluno

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="nome" className="col-xl-2 fw-bold">
              Nome
            </label>
            <div className="col-xl-10">
              <input
                {...register('nome')}
                type="text"
                id="nome"
                className="form-control form-control-sm"
              />
              {errors.nome && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '14px',
                    marginTop: '2px',
                    marginBottom: '0px',
                  }}
                >
                  {errors.nome.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="email" className="col-xl-2 fw-bold">
              Email
            </label>
            <div className="col-xl-10">
              <input
                {...register('email')}
                type="text"
                id="email"
                className="form-control form-control-sm"
              />
              {errors.email && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '14px',
                    marginTop: '2px',
                    marginBottom: '0px',
                  }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="cpf" className="col-xl-2 fw-bold">
              CPF
            </label>
            <div className="col-xl-10">
              <input
                {...register('cpf')}
                type="text"
                id="cpf"
                className="form-control form-control-sm"
              />
              {errors.cpf && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '14px',
                    marginTop: '2px',
                    marginBottom: '0px',
                  }}
                >
                  {errors.cpf.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-10 offset-xl-2 d-flex">
              <button
                type="submit"
                className="btn btn-success btn-sm d-flex align-items-center me-3"
              >
                {alunoSelecionado.id ? 'Alterar' : 'Cadastrar'}
              </button>
              <button
                onClick={() => inicializaForm()}
                type="button"
                className="btn btn-secondary btn-sm d-flex align-items-center"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AlunoForm
