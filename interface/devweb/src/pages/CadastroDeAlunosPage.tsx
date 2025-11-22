import AlunoForm from '../components/AlunoForm'
import BuscarAlterarAluno from '../components/BuscarAlterarAluno'
import useAlunoStore from '../store/AlunoStore'

const CadastroDeAlunosPage = () => {
  const mensagem = useAlunoStore((s) => s.mensagem)

  return (
    <>
      <div className="mb-4">
        <h5>Cadastro de Alunos</h5>
        <hr className="mt-1" />
      </div>

      {mensagem && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {mensagem}
        </div>
      )}

      <AlunoForm />

      <BuscarAlterarAluno />
    </>
  )
}

export default CadastroDeAlunosPage
