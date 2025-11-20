import InscricaoForm from '../components/InscricaoForm'
import Pesquisa from '../components/Pesquisa'
import TabelaDeAlunosPorTurma from '../components/TabelaDeAlunosPorTurma'
import Paginacao from '../components/Paginacao'
import useInscricaoStore from '../store/InscricaoStore'
import { useRecuperarAlunosPorTurma } from '../hooks/useRecuperarAlunosPorTurma'

const InscricaoDeAlunosPage = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId)
  const { data: alunos } = useRecuperarAlunosPorTurma(turmaId)

  const totalAlunos = alunos?.length ?? 0

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Inscrição de Alunos</h5>
        {turmaId && (
          <h5 className="mb-0">Total de alunos da turma: {totalAlunos}</h5>
        )}
      </div>
      <hr className="mt-1" />

      <InscricaoForm />

      <div className="mb-3">
        <h6>Pesquisa</h6>
        <Pesquisa />
      </div>

      <TabelaDeAlunosPorTurma />
      <Paginacao />
    </>
  )
}

export default InscricaoDeAlunosPage
