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

  const colClasses = 'd-flex justify-content-center'

  return (
    <Form>
      <div className='row mb-3' style={{ rowGap: '20px' }}>
        <div className={`${colClasses} col-6`}>
          <Toggler
            title='Status'
            labelFn={() => (air.on ? 'Ligado' : 'Desligado')}
            checkedFn={() => air.on}
            onChangeFn={air.toggle}
            disabled={air.error}
          />
        </div>

        <div className={`${colClasses} col-6`}>
          <Toggler
            title='Status (Sala Vazia)'
            labelFn={() => (air.onEmpty ? 'Ligado' : 'Desligado')}
            checkedFn={() => air.onEmpty}
            onChangeFn={air.toggleEmpty}
            disabled={!air.on || air.error}
          />
        </div>
      </div>

      <div className='row mt-3' style={{ rowGap: '20px' }}>
        <div className={`${colClasses} col-6 col-md-4`}>
          <TemperatureControl
            title='Temperatura'
            minusFn={() => controlTemperature(air.down)}
            invalidFn={() => invalid}
            valueFn={() => (air.on ? air.temperature : 'OFF')}
            plusFn={() => controlTemperature(air.up)}
            disabled={!air.on || air.error}
          />
        </div>

        <div className={`${colClasses} col-6 col-md-4`}>
          <TemperatureControl
            title='Temp. Máxima (sala)'
            minusFn={() => controlTemperature(air.downMax)}
            invalidFn={() => invalid}
            valueFn={() => (air.on ? air.maxTemperature : 'OFF')}
            plusFn={() => controlTemperature(air.upMax)}
            disabled={!air.on || air.error}
          />
        </div>

        <div className={`${colClasses} col-6 col-md-4`}>
          <TemperatureControl
            title='Temp. Mínima (sala)'
            minusFn={() => controlTemperature(air.downMax)}
            invalidFn={() => invalid}
            valueFn={() => (air.on ? air.minTemperature : 'OFF')}
            plusFn={() => controlTemperature(air.upMax)}
            disabled={!air.on || air.error}
          />
        </div>
      </div>
    </Form>
  )
}

export default ControlPanel
