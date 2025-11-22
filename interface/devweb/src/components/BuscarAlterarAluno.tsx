import { useState, useMemo } from 'react'
import _ from 'lodash'
import { useRecuperarAlunos } from '../hooks/useRecuperarAlunos'
import useAlunoStore from '../store/AlunoStore'

const BuscarAlterarAluno = () => {
  const [termoBusca, setTermoBusca] = useState('')

  const setAlunoSelecionado = useAlunoStore((s) => s.setAlunoSelecionado)
  const setMensagem = useAlunoStore((s) => s.setMensagem)

  const { data: alunos, isPending, error } = useRecuperarAlunos()

  if (error) throw error

  const debouncedSetTermoBusca = _.debounce((valor: string) => {
    setTermoBusca(valor)
  }, 500)

  const alunosFiltrados = useMemo(() => {
    if (!alunos) return []
    if (!termoBusca.trim()) return []
    return alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(termoBusca.toLowerCase())
    )
  }, [alunos, termoBusca])

  const selecionarAluno = (alunoId: number) => {
    const aluno = alunos?.find((a) => a.id === alunoId)
    if (aluno) {
      setAlunoSelecionado(aluno)
      setMensagem('')
      setTermoBusca('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="mb-4 mt-5">
        <h5>Buscar/Alterar Aluno</h5>
        <hr className="mt-1" />
      </div>

      <div className="row mb-3">
        <div className="col-xl-6">
          <div className="row">
            <label htmlFor="busca" className="col-xl-3 fw-bold">
              Buscar por nome
            </label>
            <div className="col-xl-9">
              <input
                type="text"
                id="busca"
                className="form-control form-control-sm"
                placeholder="Digite o nome do aluno"
                onChange={(e) => debouncedSetTermoBusca(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {isPending && termoBusca && <p>Carregando...</p>}

      {alunosFiltrados.length > 0 && (
        <div className="row">
          <div className="col-xl-8">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <th className="text-center align-middle">ID</th>
                    <th className="text-center align-middle">Nome</th>
                    <th className="text-center align-middle">Email</th>
                    <th className="text-center align-middle">CPF</th>
                    <th className="text-center align-middle">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosFiltrados.map((aluno) => (
                    <tr key={aluno.id}>
                      <td className="text-center align-middle">{aluno.id}</td>
                      <td className="align-middle">{aluno.nome}</td>
                      <td className="align-middle">{aluno.email}</td>
                      <td className="text-center align-middle">{aluno.cpf}</td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => selecionarAluno(aluno.id)}
                        >
                          Alterar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {termoBusca && alunosFiltrados.length === 0 && !isPending && (
        <p className="text-muted">Nenhum aluno encontrado</p>
      )}
    </>
  )
}

export default BuscarAlterarAluno
