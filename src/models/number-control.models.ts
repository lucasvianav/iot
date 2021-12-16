export const enum NumberUnit {
  Celsius = 'ºC',
  Minutes = 'min',
}

export interface NumberControlProps {
  /** the conntroller's title */
  title?: string

  /** function to change the value when +/- are called */
  setterFn: (newValue: number) => void

  /** function to validate if newValue (has priority over max/min) */
  validateFn?: (newValue: number) => boolean

  /** maximum value allowed */
  max?: number

  /** minimum value allowed */
  min?: number

  /** function to be called to evaluate the temperature value */
  value: number|string

  /** step with which to change the value when pressing +/- (default 1) */
  step?: number

  /** is the controller disabled? */
  disabled: boolean

  /** unit to be shown besides the number value */
  unit: NumberUnit
}
