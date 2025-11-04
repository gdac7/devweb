import { useEffect, useMemo, useState } from 'react'
import { useRecuperarTurmas } from '../hooks/useRecuperarTurmas'
import { useRecuperarAlunosPorTurma } from '../hooks/useRecuperarAlunosPorTurma'
import type { Aluno, Turma } from '../types'

export function AlunosPorTurmaPage() {
  const { data: listaTurmas, isPending: carregandoTurmas, isError: erroTurmas, error: erroTurmasObj } =
    useRecuperarTurmas()

  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState<number | null>(null)
  const turmaSelecionada: Turma | null = useMemo(() => {
    return (listaTurmas ?? []).find((t) => t.id === turmaSelecionadaId) ?? null
  }, [listaTurmas, turmaSelecionadaId])

  const {
    data: alunosTurma,
    isPending: carregandoAlunos,
    isError: erroAlunos,
    error: erroAlunosObj,
  } = useRecuperarAlunosPorTurma(turmaSelecionadaId)

  const chaveGrupo = turmaSelecionada?.codigo ?? null
  const [grupoIds, setGrupoIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!chaveGrupo) {
      setGrupoIds(new Set())
      return
    }
    try {
      const salvo = localStorage.getItem(chaveGrupo)
      const ids: number[] = salvo ? JSON.parse(salvo) : []
      setGrupoIds(new Set(ids))
    } catch {
      setGrupoIds(new Set())
    }
  }, [chaveGrupo])

  const persistirGrupo = (ids: Set<number>) => {
    if (!chaveGrupo) return
    localStorage.setItem(chaveGrupo, JSON.stringify(Array.from(ids)))
  }

  const alternarAluno = (alunoId: number) => {
    setGrupoIds((prev) => {
      const copia = new Set(prev)
      if (copia.has(alunoId)) copia.delete(alunoId)
      else copia.add(alunoId)
      persistirGrupo(copia)
      return copia
    })
  }

  const alunos: Aluno[] = useMemo(() => {
    const base = alunosTurma ?? []
    // garantir ordenação por nome
    return base.slice().sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }, [alunosTurma])

  const mensagemErroTurmas = erroTurmas
    ? erroTurmasObj instanceof Error
      ? erroTurmasObj.message
      : 'Erro ao carregar turmas'
    : null
  const mensagemErroAlunos = erroAlunos
    ? erroAlunosObj instanceof Error
      ? erroAlunosObj.message
      : 'Erro ao carregar alunos da turma'
    : null

  return (
    <section>
      {/* Linha de formulário conforme design: label + select alinhados */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-auto">
          <label htmlFor="seletor-turma" className="col-form-label fw-semibold">
            Turma
          </label>
        </div>
        <div className="col-auto">
          <select
            id="seletor-turma"
            className="form-select form-select-lg"
            style={{ minWidth: 240 }}
            value={turmaSelecionadaId ?? ''}
            onChange={(e) => setTurmaSelecionadaId(e.target.value ? Number(e.target.value) : null)}
            disabled={carregandoTurmas || !!erroTurmas}
          >
            <option value="">Selecione uma turma</option>
            {(listaTurmas ?? []).map((t) => (
              <option key={t.id} value={t.id}>
                {t.codigo} — {t.ano} • {t.periodo}
              </option>
            ))}
          </select>
        </div>
        {erroTurmas && (
          <div className="col-12">
            <div className="alert alert-danger mb-0" role="alert">
              {mensagemErroTurmas}
            </div>
          </div>
        )}
      </div>

      {/* Tabela com borda, conforme design */}
      <div className="bg-white border rounded-2 p-3">
        {turmaSelecionadaId == null ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>{/* vazio no primeiro acesso */}</tbody>
            </table>
          </div>
        ) : carregandoAlunos ? (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" />
            Carregando alunos da turma...
          </div>
        ) : erroAlunos ? (
          <div className="alert alert-danger mb-0" role="alert">
            {mensagemErroAlunos}
          </div>
        ) : alunos.length === 0 ? (
          <div className="alert alert-info mb-0" role="alert">
            Nenhum aluno inscrito nesta turma.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => {
                  const noGrupo = grupoIds.has(aluno.id)
                  return (
                    <tr key={aluno.id}>
                      <td>{aluno.id}</td>
                      <td>{aluno.nome}</td>
                      <td>{aluno.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => alternarAluno(aluno.id)}
                        >
                          {noGrupo ? 'Remover' : 'Incluir'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

