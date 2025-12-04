export const API_BASE_URL = "http://localhost:8080"

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Erro ao carregar dados')
  }
  return response.json() as Promise<T>
}

export { fetchJson }
