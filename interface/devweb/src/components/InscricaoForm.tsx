import DisciplinaComboBox from './DisciplinaComboBox'
import TurmaComboBox from './TurmaComboBox'
import AlunoComboBox from './AlunoComboBox'
import useInscricaoStore from '../store/InscricaoStore'
import useInscreverAluno from '../hooks/useInscreverAluno'
import useErrorStore from '../store/ErrorStore'
import { ErrorAlert } from './ErrorAlert'

const InscricaoForm = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId)
  const alunoId = useInscricaoStore((s) => s.alunoId)
  const setErrorMessage = useErrorStore((s) => s.setErrorMessage)
  const clearError = useErrorStore((s) => s.clearError)

  const { mutate: inscreverAluno } = useInscreverAluno()

  const handleInscrever = () => {
    if (turmaId && alunoId) {
      clearError()
      inscreverAluno({ turmaId, alunoId }, {
        onError: (error) => {
          const mensagem = error instanceof Error ? error.message : 'Erro ao inscrever aluno'
          setErrorMessage(mensagem)
        },
      })
    }
  }

  return (
    <>
      <div className="mb-4">
        <h5>Inscrição de Aluno em Turma</h5>
        <hr className="mt-1" />
      </div>

      <ErrorAlert />

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label fw-bold">Disciplina:</label>
          <DisciplinaComboBox />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Turma:</label>
          <TurmaComboBox />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Nome:</label>
          <AlunoComboBox />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <button
            onClick={handleInscrever}
            disabled={!turmaId || !alunoId}
            className="btn btn-primary btn-sm"
          >
            Inscrever Aluno
          </button>
        </div>
      </div>
    </>
  )
}

export default InscricaoForm
