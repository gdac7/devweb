import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Aluno } from '../types'

const recuperarAlunos = async (): Promise<Aluno[]> => {
  const response = await fetch(`${API_BASE_URL}/alunos`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar alunos')
  }

  return await response.json()
}

export function useRecuperarAlunos() {
  return useQuery({
    queryKey: ['alunos'],
    queryFn: recuperarAlunos,
    staleTime: 5_000,
  })
}
