import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Turma } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useBuscarTurmaPorId(id: number | null) {
  const { fetchWithAuth } = useFetchWithAuth()

  const buscarTurmaPorId = async (id: number): Promise<Turma> => {
    const response = await fetchWithAuth(`${URL_BASE}/turmas/${id}`)

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Falha ao carregar detalhes da turma')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['turmas', 'detalhes', id],
    queryFn: () => buscarTurmaPorId(id as number),
    enabled: id != null,
    staleTime: 5_000,
  })
}
