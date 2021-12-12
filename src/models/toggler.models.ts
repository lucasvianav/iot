export interface TogglerProps {
  title?: string
  labelFn: () => string
  checkedFn: () => true
  onChangeFn: () => void
  disabled: boolean
}
