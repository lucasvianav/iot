import React from 'react'
import { useToasts } from '../hooks'
import { ToastModel } from '../models'

export const ToastsContext = React.createContext({
  toasts: {} as ToastModel[],
  createToast: {} as (toast: ToastModel) => void,
})

export function ToastsContextProvider({ children }: any) {
  const { toasts, createToast } = useToasts()

  return (
    <ToastsContext.Provider value={{ toasts, createToast }}>
      {children}
    </ToastsContext.Provider>
  )
}
