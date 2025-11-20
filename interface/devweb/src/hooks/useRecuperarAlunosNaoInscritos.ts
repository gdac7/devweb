import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Aluno } from '../types'

const recuperarAlunosNaoInscritos = async (turmaId: number): Promise<Aluno[]> => {
  const response = await fetch(`${API_BASE_URL}/alunos/nao-inscritos?turmaId=${turmaId}`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar alunos não inscritos')
  }

  return await response.json()
}

export function useRecuperarAlunosNaoInscritos(turmaId: number | null) {
  return useQuery({
    queryKey: ['turmas', turmaId, 'alunos-nao-inscritos'],
    queryFn: () => recuperarAlunosNaoInscritos(turmaId as number),
    enabled: turmaId != null,
    staleTime: 5_000,
  })
}
