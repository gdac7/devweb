import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Aluno } from '../types'

const recuperarAlunosPorTurma = async (idTurma: number): Promise<Aluno[]> => {
  const response = await fetch(`${API_BASE_URL}/turmas/${idTurma}/alunos`)
  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao carregar alunos da turma')
  }
  return await response.json()
}

export function useRecuperarAlunosPorTurma(idTurma: number | null) {
  return useQuery({
    queryKey: ['turmas', idTurma, 'alunos'],
    queryFn: () => recuperarAlunosPorTurma(idTurma as number),
    enabled: idTurma != null,
    staleTime: 5_000,
  })
}

