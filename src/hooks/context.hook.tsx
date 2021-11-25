import React from 'react'
import { useSensors } from './sensors.hook'

export const SensorsContext = React.createContext({
  air: {} as any,
  humidity: {} as any,
  luminosity: {} as any,
  movement: {} as any,
  temperature: {} as any,
})

export function ContextProvider({ children }: any) {
  return (
    <SensorsContext.Provider
      value={{
        air: useSensors.airConditioner(),
        humidity: useSensors.humidity(),
        luminosity: useSensors.luminosity(),
        movement: useSensors.movement(),
        temperature: useSensors.temperature(),
      }}
    >
      {children}
    </SensorsContext.Provider>
  )
}
