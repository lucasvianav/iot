import React from 'react'
import { useSensors } from '../hooks'
import {
  AirConditionerHookModel,
  HumiditySensorHookModel,
  LuminositySensorHookModel,
  MovementSensorHookModel,
  TemperatureSensorHookModel,
} from '../models'

export const SensorsContext = React.createContext({
  air: {} as AirConditionerHookModel,
  humidity20: {} as HumiditySensorHookModel,
  humidity21: {} as HumiditySensorHookModel,
  humidity22: {} as HumiditySensorHookModel,
  luminosity: {} as LuminositySensorHookModel,
  movement: {} as MovementSensorHookModel,
  temperature20: {} as TemperatureSensorHookModel,
  temperature21: {} as TemperatureSensorHookModel,
  temperature22: {} as TemperatureSensorHookModel,
})

export function SensorsContextProvider({ children }: any) {
  return (
    <SensorsContext.Provider
      value={{
        air: useSensors.airConditioner(),
        humidity20: useSensors.humidity(20),
        humidity21: useSensors.humidity(21),
        humidity22: useSensors.humidity(22),
        luminosity: useSensors.luminosity(),
        movement: useSensors.movement(),
        temperature20: useSensors.temperature(20),
        temperature21: useSensors.temperature(21),
        temperature22: useSensors.temperature(22),
      }}
    >
      {children}
    </SensorsContext.Provider>
  )
}
