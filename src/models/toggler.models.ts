export interface TogglerProps {
  /** the toast's title (shown above) */
  title?: string

  /** label to be display besides the toggler when it is cheked */
  checkedLabel: string

  /** label to be display besides the toggler when it is uncheked */
  uncheckedLabel: string

  /** is the toggler checked? */
  checked: boolean

  /** function to execute when the toggler is clicked */
  onChangeFn: () => void

  /** is the toggler disabled? */
  disabled: boolean
}
