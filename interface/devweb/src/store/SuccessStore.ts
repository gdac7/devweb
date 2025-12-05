import { create } from 'zustand'

interface SuccessState {
  successMessage: string
  setSuccessMessage: (message: string) => void
  clearSuccess: () => void
}

const useSuccessStore = create<SuccessState>((set) => ({
  successMessage: '',
  setSuccessMessage: (message: string) => set({ successMessage: message }),
  clearSuccess: () => set({ successMessage: '' }),
}))

export default useSuccessStore
