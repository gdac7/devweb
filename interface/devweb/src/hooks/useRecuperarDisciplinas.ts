import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Disciplina } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarDisciplinas() {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarDisciplinas = async (): Promise<Disciplina[]> => {
    const response = await fetchWithAuth(`${URL_BASE}/disciplinas`)

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar disciplinas')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['disciplinas', 'lista'],
    queryFn: recuperarDisciplinas,
    staleTime: 5_000,
  })
}
