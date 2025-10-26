import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Turma } from '../types'

const buscarTurmas = async (termo: string): Promise<Turma[]> => {
  const response = await fetch(
    `${API_BASE_URL}/turmas/buscar?q=${encodeURIComponent(termo)}`,
  )

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Falha ao pesquisar turmas')
  }

  return await response.json()
}

export function useBuscarTurmas(termo: string) {
  const termoNormalizado = termo.trim()

  return useQuery({
    queryKey: ['turmas', 'busca', termoNormalizado],
    queryFn: () => buscarTurmas(termoNormalizado),
    enabled: termoNormalizado.length > 0,
    staleTime: 5_000,
  })
}
