export type Aluno = {
  id: number
  nome: string
  email: string
  cpf: string
}

export type Professor = {
  id: number
  nome: string
  email: string
}

export type Disciplina = {
  id: number
  nome: string
  cargaHoraria: number
}

export type Inscricao = {
  id: number
  dataHora: string
  aluno: Aluno
}

export type Turma = {
  id: number
  codigo: string
  ano: string
  periodo: string
  professor: Professor
  disciplina: Disciplina
  inscricoes: Inscricao[]
}
