import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { SensorsContext } from '../../hooks'
import TemperatureControl from '../shared/temperature-control'
import Toggler from '../shared/toggler'

export function ControlPanel() {
  const { air } = useContext(SensorsContext)
  const [invalid, setInvalid] = useState(false)

  const controlTemperature = (fn: () => any) => {
    const inv = fn() === null
    setInvalid(inv)

    if (inv) {
      setTimeout(() => setInvalid(false), 1000)
    }
  }

  return (
    <Form>
      <div className='row' style={{ rowGap: '20px' }}>
        <div className='col-6 col-md-3 d-flex align-item-center'>
          <Toggler
            title='Status'
            labelFn={() => (air.on ? 'Ligado' : 'Desligado')}
            checkedFn={() => air.on}
            onChangeFn={air.toggle}
          />
        </div>

        <div className='col-6 col-md-3 d-flex justify-content-center'>
          <TemperatureControl
            title='Temperatura'
            minusFn={() => controlTemperature(air.down)}
            invalidFn={() => invalid}
            valueFn={() => (air.on ? air.temperature : 'OFF')}
            plusFn={() => controlTemperature(air.up)}
          />
        </div>

        <div className='col-6 col-md-3 d-flex justify-content-center'>
          <TemperatureControl
            title='Temperatura Máxima'
            minusFn={() => controlTemperature(air.down)}
            invalidFn={() => invalid}
            valueFn={() => (air.on ? air.temperature : 'OFF')}
            plusFn={() => controlTemperature(air.up)}
          />
        </div>

        <div className='col-6 col-md-3 d-flex justify-content-center'>
          <TemperatureControl
            title='Temperatura Mínima'
            minusFn={() => controlTemperature(air.down)}
            invalidFn={() => invalid}
            valueFn={() => (air.on ? air.temperature : 'OFF')}
            plusFn={() => controlTemperature(air.up)}
          />
        </div>
      </div>
    </Form>
  )
}

export default ControlPanel
