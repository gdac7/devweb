import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Turma } from '../types'

const recuperarTurmasPorDisciplina = async (disciplinaId: number): Promise<Turma[]> => {
  const response = await fetch(`${API_BASE_URL}/turmas?disciplinaId=${disciplinaId}`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar turmas da disciplina')
  }

  return await response.json()
}

export function useRecuperarTurmasPorDisciplina(disciplinaId: number | null) {
  return useQuery({
    queryKey: ['disciplinas', disciplinaId, 'turmas'],
    queryFn: () => recuperarTurmasPorDisciplina(disciplinaId as number),
    enabled: disciplinaId != null,
    staleTime: 5_000,
  })
}
