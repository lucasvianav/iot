import React from 'react'
import { useSensors } from './sensors.hook'

export const SensorsContext = React.createContext({
  air: {} as any,
  humidity20: {} as any,
  humidity21: {} as any,
  humidity22: {} as any,
  luminosity: {} as any,
  movement: {} as any,
  temperature20: {} as any,
  temperature21: {} as any,
  temperature22: {} as any,
})

export function ContextProvider({ children }: any) {
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
