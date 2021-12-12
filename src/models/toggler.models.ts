export interface TogglerProps {
  title?: string
  labelFn: () => string
  checkedFn: () => boolean
  onChangeFn: () => void
  disabled: boolean
}
