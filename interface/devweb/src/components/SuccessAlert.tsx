import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useSuccessStore from '../store/SuccessStore'

export function SuccessAlert() {
  const successMessage = useSuccessStore((s) => s.successMessage)
  const clearSuccess = useSuccessStore((s) => s.clearSuccess)
  const location = useLocation()

  useEffect(() => {
    clearSuccess()
  }, [location.pathname, clearSuccess])

  if (!successMessage) return null

  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      {successMessage}
      <button
        type="button"
        className="btn-close"
        onClick={clearSuccess}
        aria-label="Close"
      />
    </div>
  )
}
