import { useMutation } from '@tanstack/react-query'
import { URL_BASE, URL_ALUNOS } from '../util/constants'
import type { Aluno } from '../types'
import { queryClient } from '../main'
import useFetchWithAuth from './useFetchWithAuth'

const useAlterarAluno = () => {
  const { fetchWithAuth } = useFetchWithAuth()

  const alterarAluno = async (aluno: Aluno): Promise<Aluno> => {
    const response = await fetchWithAuth(`${URL_BASE}${URL_ALUNOS}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno),
    })

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao alterar aluno')
    }

    return await response.json()
  }

  return useMutation({
    mutationFn: (aluno: Aluno) => alterarAluno(aluno),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alunos'],
        exact: false,
      })
    },
  })
}

export default useAlterarAluno
