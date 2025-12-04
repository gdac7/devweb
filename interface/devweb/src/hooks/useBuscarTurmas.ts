import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Turma } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useBuscarTurmas(termo: string) {
  const { fetchWithAuth } = useFetchWithAuth()
  const termoNormalizado = termo.trim()

  const buscarTurmas = async (termo: string): Promise<Turma[]> => {
    const response = await fetchWithAuth(
      `${URL_BASE}/turmas/buscar?q=${encodeURIComponent(termo)}`,
    )

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Falha ao pesquisar turmas')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['turmas', 'busca', termoNormalizado],
    queryFn: () => buscarTurmas(termoNormalizado),
    enabled: termoNormalizado.length > 0,
    staleTime: 5_000,
  })
}
