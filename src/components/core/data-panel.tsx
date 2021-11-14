import React, { useContext } from 'react'
import { SensorsContext } from '../../hooks'
import { DataCard } from '../shared'

export function DataPanel() {
  const {
    air,
    humidity,
    luminosity,
    movement,
    temperature,
  } = useContext(SensorsContext)

  return (
    <div className='d-flex flex-column gap-3'>
      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Temperatura'
            description='Ar-condicionado 23'
            data={air.on ? `${air.temperature}ºC` : 'Desligado'}
            loading={air.loading}
            error={air.error}
            icon='snowflake'
          />
        </div>

        <div className='col-md-6'>
          <DataCard
            title='Sensação Térmica'
            description='Sala 2'
            data={`${temperature.temperature}ºC`}
            loading={temperature.loading}
            error={temperature.error}
            icon='thermometer-quarter'
          />
        </div>
      </div>

      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Umidade do ar'
            description='Sala 2'
            data={`${humidity.humidity}%`}
            loading={humidity.loading}
            error={humidity.error}
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
            data={`${luminosity.luminosity} lx`}
            loading={luminosity.loading}
            error={luminosity.error}
            icon={luminosity.luminosity > 50 ? 'sun' : 'moon'}
          />
        </div>
      </div>
    </div>
  )
}

export default DataPanel
