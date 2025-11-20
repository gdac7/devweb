import { useMutation } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Inscricao } from '../types'
import { queryClient } from '../main'

interface InscreverAlunoParams {
  turmaId: number
  alunoId: number
}

const inscreverAluno = async ({ turmaId, alunoId }: InscreverAlunoParams): Promise<Inscricao> => {
  const response = await fetch(`${API_BASE_URL}/turmas/${turmaId}/inscricoes?idAluno=${alunoId}`, {
    method: 'POST',
  })

  if (!response.ok) {
    const mensagem = await response.text()
    throw new Error(mensagem || 'Erro ao inscrever aluno')
  }

  return await response.json()
}

const useInscreverAluno = () => {
  return useMutation({
    mutationFn: (params: InscreverAlunoParams) => inscreverAluno(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['turmas', variables.turmaId, 'alunos'],
      })
      queryClient.invalidateQueries({
        queryKey: ['turmas', variables.turmaId, 'alunos-nao-inscritos'],
      })
    },
  })
}

export default useInscreverAluno
