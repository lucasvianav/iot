export interface ToastProps {
  toast: ToastModel
}

export const enum ToastType {
  Error = 'danger',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastModel {
  title: string
  body: string | JSX.Element
  type: ToastType
  open?: boolean
  close?: () => void
  delay?: number
}
