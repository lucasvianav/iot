import { useEffect, useState } from 'react'
import { ToastModel } from '../models'

export const useToasts = () => {
  const [toasts, setToasts] = useState<ToastModel[]>([])

  // delete all closed toasts every 3 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setToasts(toasts.filter(toast => {
        console.log(toast)
        return toast.open
      }))
    }, 120000)
    return () => clearInterval(timer)
  }, [])

  const createToast = (toast: ToastModel) => {
    setToasts(toasts.concat([{...toast, open: true}]))
  }

  return { toasts, createToast }
}

