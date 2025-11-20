import { useMutation } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Aluno } from '../types'
import { queryClient } from '../main'

const cadastrarAluno = async (aluno: Omit<Aluno, 'id'>): Promise<Aluno> => {
  const response = await fetch(`${API_BASE_URL}/alunos`, {
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

const useCadastrarAluno = () => {
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
