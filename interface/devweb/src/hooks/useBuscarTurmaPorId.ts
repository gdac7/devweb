import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Turma } from '../types'

const buscarTurmaPorId = async (id: number): Promise<Turma> => {
  const response = await fetch(`${API_BASE_URL}/turmas/${id}`)

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Falha ao carregar detalhes da turma')
  }

  return await response.json()
}

export function useBuscarTurmaPorId(id: number | null) {
  return useQuery({
    queryKey: ['turmas', 'detalhes', id],
    queryFn: () => buscarTurmaPorId(id as number),
    enabled: id != null,
    staleTime: 5_000,
  })
}
