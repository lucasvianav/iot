import React, { useContext, useEffect } from 'react'
import { SensorsContext, ToastsContext } from '../../contexts'
import { ResponseModel } from '../../models'
import { DataCard } from '../shared'

export function DataPanel() {
  const { createToast } = useContext(ToastsContext)

  const {
    air,
    humidity20,
    humidity21,
    humidity22,
    luminosity,
    movement,
    temperature20,
    temperature21,
    temperature22,
  } = useContext(SensorsContext)

  const handleToasts = (sensor: {
    error: ResponseModel | boolean
    name: string
  }) => {
    useEffect(() => {
      if (sensor.error) {
        const err = sensor.error as ResponseModel
        createToast({
          title: `Erro ${err.status} - ${sensor.name}`,
          body: err.message,
          delay: 7000,
        })
      }
    }, [sensor.error])
  }

  handleToasts(air)
  handleToasts(humidity20)
  handleToasts(temperature20)
  handleToasts(luminosity)
  handleToasts(movement)
  handleToasts(humidity21)
  handleToasts(temperature21)
  handleToasts(humidity22)
  handleToasts(temperature22)

  return (
    <div className='d-flex flex-column gap-3'>
      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Temperatura'
            description='Ar-condicionado 23'
            data={air.on ? `${air.temperature}ºC` : 'Desligado'}
            loading={air.loading}
            error={air.error as boolean}
            icon='snowflake'
          />
        </div>

        <div className='col-md-6'>
          <DataCard
            title='Sensação Térmica'
            description='Sala 2 - Sensor 20'
            data={`${temperature20.temperature}ºC`}
            loading={temperature20.loading}
            error={temperature20.error}
            icon='thermometer-quarter'
          />
        </div>
      </div>

      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Sensação Térmica'
            description='Sala 2 - Sensor 21'
            data={`${temperature21.temperature}ºC`}
            loading={temperature21.loading}
            error={temperature21.error}
            icon='thermometer-quarter'
          />
        </div>

        <div className='col-md-6'>
          <DataCard
            title='Sensação Térmica'
            description='Sala 2 - Sensor 22'
            data={`${temperature22.temperature}ºC`}
            loading={temperature22.loading}
            error={temperature22.error}
            icon='thermometer-quarter'
          />
        </div>
      </div>

      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Umidade do ar'
            description='Sala 2 - Sensor 20'
            data={`${humidity20.humidity}%`}
            loading={humidity20.loading}
            error={humidity20.error}
            icon='wind'
          />
        </div>

        <div className='col-md-6'>
          <DataCard
            title='Umidade do ar'
            description='Sala 2 - Sensor 21'
            data={`${humidity21.humidity}%`}
            loading={humidity21.loading}
            error={humidity21.error}
            icon='wind'
          />
        </div>
      </div>

      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Umidade do ar'
            description='Sala 2 - Sensor 22'
            data={`${humidity22.humidity}%`}
            loading={humidity22.loading}
            error={humidity22.error}
            icon='wind'
          />
        </div>

        <div className='col-md-6'>
          <DataCard
            title='Movimento'
            description='Sala 2'
            data={movement.movement ? 'Detectado' : 'Sala vazia'}
            loading={movement.loading}
            error={movement.error}
            icon='running'
          />
        </div>
      </div>

      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Luminosidade'
            description='Sala 2'
            data={`Lâmpada ${luminosity.luminosity ? 'acesa' : 'apagada'}`}
            loading={luminosity.loading}
            error={luminosity.error}
            icon={luminosity.luminosity ? 'sun' : 'moon'}
          />
        </div>
      </div>
    </div>
  )
}

export default DataPanel
