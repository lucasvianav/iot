import React from 'react'
import {
  useAirConditionerTemperature,
  useHumidity,
  useRoomTemperature,
} from '../../hooks'
import { DataCard } from '../shared'

// TODO: card p/ luminosidade e movimento
// TODO: controle ar: +/-, on/off

export function Main() {
  const {
    temperature: airCondTemperature,
    loading: airCondLoading,
    error: airCondError,
  } = useAirConditionerTemperature()

  const {
    temperature: roomTemperature,
    loading: roomTemperatureLoading,
    error: roomTemperatureError,
  } = useRoomTemperature()

  const {
    humidity,
    loading: humidityLoading,
    error: humidityError,
  } = useHumidity()

  return (
    <main className='px-5 m-auto mw-1200px w-100'>
      <section className='d-flex flex-column gap-3'>
        <div className='row gap-3 gap-md-0'>
          <div className='col-md-6'>
            <DataCard
              title='Temperatura'
              description='Ar-condicionado 23'
              data={`${airCondTemperature}ºC`}
              loading={airCondLoading}
              error={airCondError}
              icon='fas fa-snowflake'
            />
          </div>

          <div className='col-md-6'>
            <DataCard
              title='Sensação Térmica'
              description='Sala 2'
              data={`${roomTemperature}ºC`}
              loading={roomTemperatureLoading}
              error={roomTemperatureError}
              icon='fas fa-thermometer'
            />
          </div>
        </div>

        <div className='row gap-3 gap-md-0'>
          <div className='col-md-6'>
            <DataCard
              title='Umidade do ar'
              description='Sala 2'
              data={`${humidity}%`}
              loading={humidityLoading}
              error={humidityError}
              icon='fas fa-wind'
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main
