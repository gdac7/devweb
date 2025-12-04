import { useMutation } from '@tanstack/react-query'
import { URL_BASE, URL_ALUNOS } from '../util/constants'
import type { Aluno } from '../types'
import { queryClient } from '../main'
import useFetchWithAuth from './useFetchWithAuth'

const useCadastrarAluno = () => {
  const { fetchWithAuth } = useFetchWithAuth()

  const cadastrarAluno = async (aluno: Omit<Aluno, 'id'>): Promise<Aluno> => {
    const response = await fetchWithAuth(`${URL_BASE}${URL_ALUNOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno),
    })

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao cadastrar aluno')
    }

    return await response.json()
  }

  return useMutation({
    mutationFn: (aluno: Omit<Aluno, 'id'>) => cadastrarAluno(aluno),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alunos'],
        exact: false,
      })
    },
  })
}

export default useCadastrarAluno
