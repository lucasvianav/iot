export interface ToastProps {
  toast: ToastModel
}

export const enum ToastType {
  // values are bootstrap color profiles
  Error = 'danger',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastModel {
  /** the toast's title */
  title: string

  /** the toast's message */
  body: string | JSX.Element

  /** the toast's type (determines the toast's header's bg color) */
  type: ToastType

  /** is the toast open? */
  open?: boolean

  /** function to close the toast */
  close?: () => void

  /** how long to wait before auto-closing the toast */
  delay?: number
}
