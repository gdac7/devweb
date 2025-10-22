const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Erro ao carregar dados')
  }
  return response.json() as Promise<T>
}

export { API_BASE_URL, fetchJson }
