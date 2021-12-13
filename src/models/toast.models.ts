export interface ToastProps {
  toast: ToastModel
}

export interface ToastModel {
  title: string
  body: string | JSX.Element
  open?: boolean
  close?: () => void
  delay?: number
}
