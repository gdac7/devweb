import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { HomePage } from '../pages/HomePage'
import { AlunosPage } from '../pages/AlunosPage'
import { TurmasPage } from '../pages/TurmasPage'
import { TurmaPage } from '../pages/TurmaPage'
import { TurmaBuscaPage } from '../pages/TurmaBuscaPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/alunos', element: <AlunosPage /> },
      { path: '/turmas', element: <TurmasPage /> },
      { path: '/turmas/:id', element: <TurmaPage /> },
      {path: '/turmas/pesquisa', element: <TurmaBuscaPage />},
    ],
  },
])
