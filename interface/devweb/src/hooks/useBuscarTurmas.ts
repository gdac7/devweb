import { useEffect, useState } from 'react'
import { fetchJson } from '../services/api'
import type { Turma } from '../types'

type EstadoCarregamento = 'inicial' | 'carregando' | 'ok' | 'erro'

export function useBuscarTurmas(termo: string) {
  const [estado, setEstado] = useState<EstadoCarregamento>('inicial')
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)

  useEffect(() => {
    const termoNormalizado = termo.trim()
    if (!termoNormalizado) {
      setEstado('inicial')
      setTurmas([])
      setMensagemErro(null)
      return
    }

    setEstado('carregando')
    fetchJson<Turma[]>(`/turmas/buscar?q=${encodeURIComponent(termoNormalizado)}`)
      .then((dados) => {
        setTurmas(dados)
        setEstado('ok')
        setMensagemErro(null)
      })
      .catch((erro: unknown) => {
        setEstado('erro')
        setTurmas([])
        setMensagemErro(
          erro instanceof Error ? erro.message : 'Falha ao pesquisar turmas',
        )
      })
  }, [termo])

  return { estado, turmas, mensagemErro }
}
