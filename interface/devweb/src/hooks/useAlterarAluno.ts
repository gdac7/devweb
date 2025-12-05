import { useMutation } from '@tanstack/react-query'
import { URL_ALUNOS } from '../util/constants'
import type { Aluno } from '../types'
import { queryClient } from '../main'
import useApi from './useApi'

const useAlterarAluno = () => {
  const { alterar: alterarAluno } = useApi<Aluno>(URL_ALUNOS)

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
