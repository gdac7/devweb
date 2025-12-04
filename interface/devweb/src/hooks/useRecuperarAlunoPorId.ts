import { useQuery } from '@tanstack/react-query'
import { URL_BASE, URL_ALUNOS } from '../util/constants'
import type { Aluno } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarAlunoPorId(id: number) {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarAlunoPorId = async (id: number): Promise<Aluno> => {
    const response = await fetchWithAuth(`${URL_BASE}${URL_ALUNOS}/${id}`)

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar aluno')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['alunos', id],
    queryFn: () => recuperarAlunoPorId(id),
    staleTime: 5_000,
  })
}
