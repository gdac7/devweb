import { useMutation } from '@tanstack/react-query'
import { URL_BASE, URL_ALUNOS } from '../util/constants'
import { queryClient } from '../main'
import useFetchWithAuth from './useFetchWithAuth'

const useRemoverAluno = () => {
  const { fetchWithAuth } = useFetchWithAuth()

  const removerAluno = async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${URL_BASE}${URL_ALUNOS}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const mensagem = await response.text()
      throw new Error(mensagem || 'Erro ao remover aluno')
    }
  }

  return useMutation({
    mutationFn: (id: number) => removerAluno(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alunos'],
        exact: false,
      })
    },
  })
}

export default useRemoverAluno
