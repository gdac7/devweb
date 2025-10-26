import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Turma } from '../types'

const recuperarTurmas = async (): Promise<Turma[]> => {
  const response = await fetch(`${API_BASE_URL}/turmas`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar turmas')
  }

  return await response.json()
}

export function useRecuperarTurmas() {
  return useQuery({
    queryKey: ['turmas', 'lista'],
    queryFn: recuperarTurmas,
    staleTime: 5_000,
  })
}
