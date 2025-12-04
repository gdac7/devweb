import { create } from 'zustand'

interface ErrorState {
  errorMessage: string
  setErrorMessage: (message: string) => void
  clearError: () => void
}

const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: '',
  setErrorMessage: (message: string) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: '' }),
}))

export default useErrorStore
