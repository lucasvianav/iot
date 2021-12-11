export interface TemperatureControlProps {
  /** the conntroller's title */
  title?: string

  /** function to be called when the - button is clicked */
  minusFn: () => void

  /** function to be called when the + button is clicked */
  plusFn: () => void

  /** function to be called to evaluate the temperature value */
  valueFn: () => number

  /** function to be called to evaluate if the current value is invalid */
  invalidFn: () => boolean
}
