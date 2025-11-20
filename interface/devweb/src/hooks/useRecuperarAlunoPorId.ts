import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Aluno } from '../types'

const recuperarAlunoPorId = async (id: number): Promise<Aluno> => {
  const response = await fetch(`${API_BASE_URL}/alunos/${id}`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar aluno')
  }

  return await response.json()
}

export function useRecuperarAlunoPorId(id: number) {
  return useQuery({
    queryKey: ['alunos', id],
    queryFn: () => recuperarAlunoPorId(id),
    staleTime: 5_000,
  })
}
