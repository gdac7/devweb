import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Aluno } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarAlunosNaoInscritos(turmaId: number | null) {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarAlunosNaoInscritos = async (turmaId: number): Promise<Aluno[]> => {
    const response = await fetchWithAuth(`${URL_BASE}/alunos/nao-inscritos?turmaId=${turmaId}`)

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar alunos não inscritos')
    }

    return await response.json()
  }

  return useQuery({
    queryKey: ['turmas', turmaId, 'alunos-nao-inscritos'],
    queryFn: () => recuperarAlunosNaoInscritos(turmaId as number),
    enabled: turmaId != null,
    staleTime: 5_000,
  })
}
