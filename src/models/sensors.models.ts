import { ResponseModel } from './utils.models'

/** `SensorContext`'s `air` field */
export interface AirConditionerHookModel {
  /** the device's operation temperature */
  temperature: number

  /** the room's desired maximum temperature */
  maxTemperature: number

  /** the room's desired minimum temperature */
  minTemperature: number

  /** the device's energy status (on/off) */
  on: boolean

  /** the desired status for the device (on/off) for when the room is empty */
  onEmpty: boolean

  /** the timeout (in minutes) between each command */
  commandTimeout: number

  /**
  * Sends a request to the API to update the air conditioner's settings. Doesn't
  * change `this.loading` and `this.error` values. Triggers the fetching again.
  *
  * @param body the POST HTTP request's body, should contain only edited properties
  * @returns promise that'll be resolved if the request is successful and rejected otherwise
  */
  update: (body: AirConditionerRequestBodyModel) => Promise<ResponseModel>

  /** is the fetching in progress (loading)? */
  loading: boolean

  /** did the fetching result in an error?  */
  error: ResponseModel|boolean

  /** the device's name */
  name: string
}

/** `SensorContext`'s `temperature` field */
export interface TemperatureSensorHookModel {
  /** the sensor's detected temperature */
  temperature: number

  /** is the fetching in progress (loading)? */
  loading: boolean

  /** did the fetching result in an error?  */
  error: ResponseModel|boolean

  /** the device's name */
  name: string
}

/** `SensorContext`'s `humidity` field */
export interface HumiditySensorHookModel {
  /** the sensor's detected humidity */
  humidity: number

  /** is the fetching in progress (loading)? */
  loading: boolean

  /** did the fetching result in an error?  */
  error: ResponseModel|boolean

  /** the device's name */
  name: string
}

/** `SensorContext`'s `movement` field */
export interface MovementSensorHookModel {
  /** the sensor's detected movement */
  movement: boolean

  /** is the fetching in progress (loading)? */
  loading: boolean

  /** did the fetching result in an error?  */
  error: ResponseModel|boolean

  /** the device's name */
  name: string
}

/** `SensorContext`'s `luminosity` field */
export interface LuminositySensorHookModel {
  /** the sensor's detected luminosity */
  luminosity: boolean

  /** is the fetching in progress (loading)? */
  loading: boolean

  /** did the fetching result in an error?  */
  error: ResponseModel|boolean

  /** the device's name */
  name: string
}

/** Body for the HTTP request sent to update the air conditioner settings. */
export interface AirConditionerRequestBodyModel {
  /** the timeout (in minutes) between each command */
  commandTimeout?: number

  /** the room's desired maximum temperature */
  maxTemperature?: number

  /** the room's desired minimum temperature */
  minTemperature?: number

  /** the device's energy status (on/off) */
  on?: boolean

  /** the desired status for the device (on/off) for when the room is empty */
  onEmpty?: boolean

  /** the device's operation temperature */
  temperature?: number
}

/**
* Data received in the response for the HTTP request sent to fetch the current
* air conditioner settings.
*/
export interface AirConditionerResponseBodyModel {
  /** the timeout (in minutes) between each command */
  T_CMD: number

  /** the room's desired maximum temperature */
  T_MAX: number

  /** the room's desired minimum temperature */
  T_MIN: number

  /** the device's energy status (on/off) */
  ONL: boolean

  /** the desired status for the device (on/off) for when the room is empty */
  ONL_VAZIO: boolean

  /** the device's operation temperature */
  TEMPERATURA: number
}
