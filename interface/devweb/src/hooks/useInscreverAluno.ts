import { useMutation } from '@tanstack/react-query'
import { URL_BASE } from '../util/constants'
import type { Inscricao } from '../types'
import { queryClient } from '../main'
import useFetchWithAuth from './useFetchWithAuth'

interface InscreverAlunoParams {
  turmaId: number
  alunoId: number
}

const useInscreverAluno = () => {
  const { fetchWithAuth } = useFetchWithAuth()

  const inscreverAluno = async ({ turmaId, alunoId }: InscreverAlunoParams): Promise<Inscricao> => {
    const response = await fetchWithAuth(`${URL_BASE}/turmas/${turmaId}/inscricoes?idAluno=${alunoId}`, {
      method: 'POST',
    })

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao inscrever aluno')
    }

    return await response.json()
  }

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
