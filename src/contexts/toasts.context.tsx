import React from 'react'
import { useToasts } from '../hooks'
import { ToastModel } from '../models'

export const ToastsContext = React.createContext({
  /** List of toasts. */
  toasts: {} as ToastModel[],

  /** Add a new open toast to the list. */
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
