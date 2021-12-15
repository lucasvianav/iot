export const enum NumberUnit {
  Celsius = 'ºC',
  Minutes = 'min',
}

export interface NumberControlProps {
  /** the conntroller's title */
  title?: string

  /** function to be called when the - button is clicked */
  minusFn: () => void

  /** function to be called when the + button is clicked */
  plusFn: () => void

  /** function to be called to evaluate the temperature value */
  valueFn: () => number|string

  /** function to be called to evaluate if the current value is invalid */
  invalidFn: () => boolean

  /** is the controller disabled? */
  disabled: boolean

  /** unit to be shown besides the number value */
  unit: NumberUnit
}
