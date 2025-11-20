import useInscricaoStore from '../store/InscricaoStore'
import { useRecuperarAlunosNaoInscritos } from '../hooks/useRecuperarAlunosNaoInscritos'

const AlunoComboBox = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId)
  const alunoId = useInscricaoStore((s) => s.alunoId)
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId)

  const { data: alunos, isPending, error } = useRecuperarAlunosNaoInscritos(turmaId)

  if (error) throw error
  if (isPending && turmaId) return <p>Carregando alunos...</p>

  return (
    <select
      value={alunoId ?? ''}
      onChange={(e) => setAlunoId(e.target.value ? +e.target.value : null)}
      className="form-select form-select-sm"
      disabled={!turmaId}
    >
      <option value="">Selecione um aluno</option>
      {alunos?.map((aluno) => (
        <option key={aluno.id} value={aluno.id}>
          {aluno.nome}
        </option>
      ))}
    </select>
  )
}

export default AlunoComboBox
