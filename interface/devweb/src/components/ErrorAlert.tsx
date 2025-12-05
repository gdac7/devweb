import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useErrorStore from '../store/ErrorStore'

export function ErrorAlert() {
  const errorMessage = useErrorStore((s) => s.errorMessage)
  const clearError = useErrorStore((s) => s.clearError)
  const location = useLocation()

  useEffect(() => {
    clearError()
  }, [location.pathname, clearError])

  if (!errorMessage) return null

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {errorMessage}
      <button
        type="button"
        className="btn-close"
        onClick={clearError}
        aria-label="Close"
      />
    </div>
  )
}
