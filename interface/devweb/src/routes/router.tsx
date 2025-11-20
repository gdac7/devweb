import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { HomePage } from '../pages/HomePage'
import { AlunosPage } from '../pages/AlunosPage'
import { TurmasPage } from '../pages/TurmasPage'
import { TurmaPage } from '../pages/TurmaPage'
import { TurmaBuscaPage } from '../pages/TurmaBuscaPage'
import { AlunosPorTurmaPage } from '../pages/AlunosPorTurmaPage'
import CadastroDeAlunosPage from '../pages/CadastroDeAlunosPage'
import AlunoPage from '../pages/AlunoPage'
import InscricaoDeAlunosPage from '../pages/InscricaoDeAlunosPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/alunos', element: <AlunosPage /> },
      { path: '/alunos/:id', element: <AlunoPage /> },
      { path: '/alunos/grupo', element: <AlunosPorTurmaPage /> },
      { path: '/cadastrar-aluno', element: <CadastroDeAlunosPage /> },
      { path: '/inscricao-alunos', element: <InscricaoDeAlunosPage /> },
      { path: '/turmas', element: <TurmasPage /> },
      { path: '/turmas/:id', element: <TurmaPage /> },
      { path: '/turmas/pesquisa', element: <TurmaBuscaPage /> },
    ],
  },
])
