interface Props {
  pagina: number
  totalDePaginas: number
  tratarPaginaAnterior: () => void
  tratarProximaPagina: () => void
  tratarIrParaPagina: (numero: number) => void
}

export function PaginacaoAlunos({
  pagina,
  totalDePaginas,
  tratarPaginaAnterior,
  tratarProximaPagina,
  tratarIrParaPagina,
}: Props) {
  if (totalDePaginas < 2) {
    return null
  }

  return (
    <nav aria-label="Paginação de alunos">
      <ul className="pagination mb-0">
        <li className={`page-item ${pagina === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={tratarPaginaAnterior}>
            <i className="bi bi-arrow-left" />
          </button>
        </li>
        {Array.from({ length: totalDePaginas }, (_, indice) => {
          const numero = indice + 1
          return (
            <li key={numero} className={`page-item ${pagina === numero ? 'active' : ''}`}>
              <button
                className="page-link"
                type="button"
                onClick={() => tratarIrParaPagina(numero)}
              >
                {numero}
              </button>
            </li>
          )
        })}
        <li className={`page-item ${pagina === totalDePaginas ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={tratarProximaPagina}>
            <i className="bi bi-arrow-right" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
