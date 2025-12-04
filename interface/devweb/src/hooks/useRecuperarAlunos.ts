import { useQuery } from '@tanstack/react-query'
import { URL_BASE, URL_ALUNOS } from '../util/constants'
import type { Aluno } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarAlunos() {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarAlunos = async (): Promise<Aluno[]> => {
    const response = await fetchWithAuth(`${URL_BASE}${URL_ALUNOS}`)
    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar alunos')
    }
    return await response.json()
  }

  return useQuery({
    queryKey: ['alunos'],
    queryFn: recuperarAlunos,
    staleTime: 5_000,
  })
}
