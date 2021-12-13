import { ResponseModel } from './utils.models'

export interface AirConditionerHookModel {
  temperature: number
  maxTemperature: number
  minTemperature: number
  loading: boolean
  error: ResponseModel|boolean
  on: boolean
  onEmpty: boolean
  isTemperatureValid: (type: string, value: number) => boolean
  post: (body: AirConditionerRequestBodyModel) => Promise<void>
  name: string
}

export interface AirConditionerRequestBodyModel {
  commandTimeout?: number
  maxTemperature?: number
  minTemperature?: number
  on?: boolean
  onEmpty?: boolean
  temperature?: number
}
