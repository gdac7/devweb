import type { Aluno } from '../types'

interface Props {
  alunos: Aluno[]
}

export function TabelaDeAlunos({ alunos }: Props) {
  return (
    <div className="table-responsive mb-3">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">CPF</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.cpf ?? 'Não informado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
