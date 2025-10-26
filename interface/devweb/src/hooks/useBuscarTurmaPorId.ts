import { useEffect, useState } from 'react'
import { fetchJson } from '../services/api'
import type { Turma } from '../types'

type EstadoCarregamento = 'inicial' | 'carregando' | 'ok' | 'erro'

export function useBuscarTurmaPorId(id: number | null) {
  const [estado, setEstado] = useState<EstadoCarregamento>('inicial')
  const [turma, setTurma] = useState<Turma | null>(null)
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)

  useEffect(() => {
    if (id == null) {
      setEstado('inicial')
      setTurma(null)
      setMensagemErro(null)
      return
    }

    setEstado('carregando')
    fetchJson<Turma>(`/turmas/${id}`)
      .then((dados) => {
        setTurma(dados)
        setEstado('ok')
        setMensagemErro(null)
      })
      .catch((erro: unknown) => {
        setEstado('erro')
        setTurma(null)
        setMensagemErro(
          erro instanceof Error
            ? erro.message
            : 'Falha ao carregar detalhes da turma',
        )
      })
  }, [id])

  return { estado, turma, mensagemErro }
}
