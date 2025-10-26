import { useEffect, useState } from 'react'

export function useValorDebounce<T>(valor: T, atraso = 400) {
  const [valorDebounce, setValorDebounce] = useState(valor)

  useEffect(() => {
    const timeout = setTimeout(() => setValorDebounce(valor), atraso)
    return () => clearTimeout(timeout)
  }, [valor, atraso])

  return valorDebounce
}
