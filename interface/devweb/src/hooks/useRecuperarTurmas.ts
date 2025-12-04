import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Turma } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarTurmas() {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarTurmas = async (): Promise<Turma[]> => {
    const response = await fetchWithAuth(`${URL_BASE}/turmas`)

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar turmas')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['turmas', 'lista'],
    queryFn: recuperarTurmas,
    staleTime: 5_000,
  })
}
