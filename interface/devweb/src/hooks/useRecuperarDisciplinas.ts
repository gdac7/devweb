import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Disciplina } from '../types'

const recuperarDisciplinas = async (): Promise<Disciplina[]> => {
  const response = await fetch(`${API_BASE_URL}/disciplinas`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar disciplinas')
  }

  return await response.json()
}

export function useRecuperarDisciplinas() {
  return useQuery({
    queryKey: ['disciplinas', 'lista'],
    queryFn: recuperarDisciplinas,
    staleTime: 5_000,
  })
}
