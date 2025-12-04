import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Aluno } from '../types'
import useFetchWithAuth from './useFetchWithAuth'

export function useRecuperarAlunosPorTurma(idTurma: number | null) {
  const { fetchWithAuth } = useFetchWithAuth()

  const recuperarAlunosPorTurma = async (idTurma: number): Promise<Aluno[]> => {
    const response = await fetchWithAuth(`${URL_BASE}/turmas/${idTurma}/alunos`)
    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao carregar alunos da turma')
    }
    return await response.json()
  }

  return useQuery({
    queryKey: ['turmas', idTurma, 'alunos'],
    queryFn: () => recuperarAlunosPorTurma(idTurma as number),
    enabled: idTurma != null,
    staleTime: 5_000,
  })
}

