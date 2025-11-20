import { Link, NavLink } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active fw-semibold' : 'nav-link'

export function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm py-3">
      <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <i className="bi bi-card-list" />
            <span>Portal Acadêmico</span>
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Alternar navegação"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div className="collapse navbar-collapse" id="main-nav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" end className={linkClass}>
                  <i className="bi bi-house-door me-2" />
                  Início
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/alunos" className={linkClass}>
                  <i className="bi bi-people me-2" />
                  Alunos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cadastrar-aluno" className={linkClass}>
                  <i className="bi bi-person-plus me-2" />
                  Cadastrar Aluno
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/inscricao-alunos" className={linkClass}>
                  <i className="bi bi-pencil-square me-2" />
                  Inscrição de Alunos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/alunos/grupo" className={linkClass}>
                  <i className="bi bi-people me-2" />
                  Alunos por Turma
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/turmas" className={linkClass}>
                  <i className="bi bi-easel me-2" />
                  Turmas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/turmas/pesquisa" className={linkClass}>
                  <i className="bi bi-search me-2" />
                  Pesquisa de Turmas
                </NavLink>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  )
}
