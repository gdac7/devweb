import type { ReactNode } from 'react'
import useInscricaoStore from '../store/InscricaoStore'
import { useRecuperarAlunosPorTurma } from '../hooks/useRecuperarAlunosPorTurma'
import { useMemo } from 'react'

const Paginacao = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId)
  const termoPesquisa = useInscricaoStore((s) => s.termoPesquisa)
  const pagina = useInscricaoStore((s) => s.pagina)
  const tamanho = useInscricaoStore((s) => s.tamanho)
  const setPagina = useInscricaoStore((s) => s.setPagina)

  const { data: alunos, isPending, error } = useRecuperarAlunosPorTurma(turmaId)

  const alunosFiltrados = useMemo(() => {
    if (!alunos) return []
    if (!termoPesquisa.trim()) return alunos
    return alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    )
  }, [alunos, termoPesquisa])

  if (error) throw error
  if (isPending) return null
  if (!turmaId) return null

  const totalDePaginas = Math.ceil(alunosFiltrados.length / tamanho)

  const arrayDePaginas: ReactNode[] = []

  if (totalDePaginas < 2) return null

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={pagina === i ? 'page-item active' : 'page-item'}>
        <a onClick={() => setPagina(i)} className="page-link" aria-current="page" style={{ cursor: 'pointer' }}>
          {i + 1}
        </a>
      </li>
    )
  }

  return (
    <nav aria-label="paginação">
      <ul className="pagination">
        <li
          onClick={() => setPagina(pagina - 1)}
          className={pagina === 0 ? 'page-item disabled' : 'page-item'}
        >
          <a className="page-link" style={{ cursor: 'pointer' }}>Anterior</a>
        </li>
        {arrayDePaginas}
        <li
          className={pagina === totalDePaginas - 1 ? 'page-item disabled' : 'page-item'}
        >
          <a onClick={() => setPagina(pagina + 1)} className="page-link" style={{ cursor: 'pointer' }}>
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Paginacao
