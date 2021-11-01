import React from 'react'
import { DataCard } from '../shared'

export function Main() {
  return (
    <main className='px-5 m-auto mw-1200px w-100'>
      <div className='row gap-3 gap-md-0'>
        <div className='col-md-6'>
          <DataCard
            title='Temperatura'
            description='Ar-condicionado 1'
            data='23ºC'
            icon='fas fa-snowflake'
          />
        </div>

        <div className='col-md-6'>
          <DataCard
            title='Umidade do ar'
            description='Sala 1'
            data='51%'
            icon='fas fa-wind'
          />
        </div>
      </div>
    </main>
  )
}

export default Main
