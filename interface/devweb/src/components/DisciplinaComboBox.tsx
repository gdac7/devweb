import useInscricaoStore from '../store/InscricaoStore'
import { useRecuperarDisciplinas } from '../hooks/useRecuperarDisciplinas'

const DisciplinaComboBox = () => {
  const disciplinaId = useInscricaoStore((s) => s.disciplinaId)
  const setDisciplinaId = useInscricaoStore((s) => s.setDisciplinaId)

  const { data: disciplinas, isPending, error } = useRecuperarDisciplinas()

  if (error) throw error
  if (isPending) return <p>Carregando disciplinas...</p>

  return (
    <select
      value={disciplinaId ?? ''}
      onChange={(e) => setDisciplinaId(e.target.value ? +e.target.value : null)}
      className="form-select form-select-sm"
    >
      <option value="">Selecione uma disciplina</option>
      {disciplinas?.map((disciplina) => (
        <option key={disciplina.id} value={disciplina.id}>
          {disciplina.nome}
        </option>
      ))}
    </select>
  )
}

export default DisciplinaComboBox
