import useInscricaoStore from '../store/InscricaoStore'
import { useRecuperarTurmasPorDisciplina } from '../hooks/useRecuperarTurmasPorDisciplina'

const TurmaComboBox = () => {
  const disciplinaId = useInscricaoStore((s) => s.disciplinaId)
  const turmaId = useInscricaoStore((s) => s.turmaId)
  const setTurmaId = useInscricaoStore((s) => s.setTurmaId)

  const { data: turmas, isPending, error } = useRecuperarTurmasPorDisciplina(disciplinaId)

  if (error) throw error
  if (isPending && disciplinaId) return <p>Carregando turmas...</p>

  return (
    <select
      value={turmaId ?? ''}
      onChange={(e) => setTurmaId(e.target.value ? +e.target.value : null)}
      className="form-select form-select-sm"
      disabled={!disciplinaId}
    >
      <option value="">Selecione uma turma</option>
      {turmas?.map((turma) => (
        <option key={turma.id} value={turma.id}>
          {turma.codigo}
        </option>
      ))}
    </select>
  )
}

export default TurmaComboBox
