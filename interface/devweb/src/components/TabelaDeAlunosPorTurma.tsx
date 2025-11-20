import useInscricaoStore from '../store/InscricaoStore'
import { useRecuperarAlunosPorTurma } from '../hooks/useRecuperarAlunosPorTurma'
import { useBuscarTurmaPorId } from '../hooks/useBuscarTurmaPorId'
import { useMemo } from 'react'

const TabelaDeAlunosPorTurma = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId)
  const termoPesquisa = useInscricaoStore((s) => s.termoPesquisa)
  const pagina = useInscricaoStore((s) => s.pagina)
  const tamanho = useInscricaoStore((s) => s.tamanho)

  const { data: alunos, isPending: isPendingAlunos, error: errorAlunos } = useRecuperarAlunosPorTurma(turmaId)
  const { data: turma, isPending: isPendingTurma, error: errorTurma } = useBuscarTurmaPorId(turmaId)

  if (errorAlunos) throw errorAlunos
  if (errorTurma) throw errorTurma

  const alunosFiltrados = useMemo(() => {
    if (!alunos) return []
    if (!termoPesquisa.trim()) return alunos
    return alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    )
  }, [alunos, termoPesquisa])

  const alunosPaginados = useMemo(() => {
    const inicio = pagina * tamanho
    const fim = inicio + tamanho
    return alunosFiltrados.slice(inicio, fim)
  }, [alunosFiltrados, pagina, tamanho])

  if (!turmaId) return null
  if (isPendingAlunos || isPendingTurma) return <p>Carregando...</p>

  return (
    <>
      {turma && (
        <div className="mb-3">
          <strong>Ano:</strong> {turma.ano} | <strong>Período:</strong> {turma.periodo} |{' '}
          <strong>Disciplina:</strong> {turma.disciplina.nome} | <strong>Prof.</strong>{' '}
          {turma.professor.nome}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-sm">
          <thead>
            <tr>
              <th className="text-center align-middle">ID</th>
              <th className="text-center align-middle">Nome</th>
              <th className="text-center align-middle">Email</th>
              <th className="text-center align-middle">CPF</th>
            </tr>
          </thead>
          <tbody>
            {alunosPaginados.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Nenhum aluno inscrito
                </td>
              </tr>
            ) : (
              alunosPaginados.map((aluno) => (
                <tr key={aluno.id}>
                  <td className="text-center align-middle">{aluno.id}</td>
                  <td className="align-middle">{aluno.nome}</td>
                  <td className="align-middle">{aluno.email}</td>
                  <td className="text-center align-middle">{aluno.cpf}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TabelaDeAlunosPorTurma
