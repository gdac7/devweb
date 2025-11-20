import _ from 'lodash'
import type { ChangeEvent } from 'react'
import useInscricaoStore from '../store/InscricaoStore'

const Pesquisa = () => {
  const setTermoPesquisa = useInscricaoStore((s) => s.setTermoPesquisa)

  const debouncedFunction = _.debounce((novoTermo: string) => setTermoPesquisa(novoTermo), 1000)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedFunction(event.target.value)
  }

  return (
    <input
      placeholder="Informe o nome de um aluno"
      onChange={handleChange}
      type="text"
      className="form-control form-control-sm mb-3"
    />
  )
}

export default Pesquisa
