export interface AirConditionerHookModel {
  temperature: number
  maxTemperature: number
  minTemperature: number
  loading: boolean
  error: boolean
  on: boolean
  onEmpty: boolean
  isTemperatureValid: (type: string, value: number) => boolean
  post: (body: AirConditionerRequestBodyModel) => Promise<void>
}

export interface AirConditionerRequestBodyModel {
  commandTimeout?: number
  maxTemperature?: number
  minTemperature?: number
  on?: boolean
  onEmpty?: boolean
  temperature?: number
}
