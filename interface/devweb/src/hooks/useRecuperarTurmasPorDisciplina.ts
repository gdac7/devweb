import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Turma } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarTurmasPorDisciplina(disciplinaId: number | null) {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarTurmasPorDisciplina = async (disciplinaId: number): Promise<Turma[]> => {
    const response = await fetchWithAuth(`${URL_BASE}/turmas?disciplinaId=${disciplinaId}`)

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar turmas da disciplina')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['disciplinas', disciplinaId, 'turmas'],
    queryFn: () => recuperarTurmasPorDisciplina(disciplinaId as number),
    enabled: disciplinaId != null,
    staleTime: 5_000,
  })
}
