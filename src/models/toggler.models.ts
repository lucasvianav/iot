export interface TogglerProps {
  title?: string
  labelFn: () => string
  checkedFn: () => true
  onChangeFn: () => void
}
