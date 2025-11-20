import { useMutation } from '@tanstack/react-query'
import { API_BASE_URL } from '../services/api'
import type { Aluno } from '../types'
import { queryClient } from '../main'

const alterarAluno = async (aluno: Aluno): Promise<Aluno> => {
  const response = await fetch(`${API_BASE_URL}/alunos`, {
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

const useAlterarAluno = () => {
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
