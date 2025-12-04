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

export type UsuarioLogin = {
  email: string
  senha: string
}

export type Usuario = {
  id?: number
  nome: string
  email: string
  senha: string
  role?: string
}

export type InfoUsuario = {
  valido: boolean
  duplicado: boolean
  mensagem: string
}

export type ResultadoPaginado<T> = {
  items: T[]
  totalItems: number
  totalPages: number
  currentPage: number
}
