import React, { useContext, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { SensorsContext } from '../../hooks'

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
    <Form className='row'>
      <div className='col-6 d-flex align-item-center'>
        <Form.Check
          type='switch'
          label={air.on ? 'Ligado' : 'Desligado'}
          className='m-auto'
          checked={air.on}
          onChange={air.toggle}
        />
      </div>

      <div className='col-6'>
        <InputGroup>
          <Button
            variant='outline-secondary'
            className='d-flex flex-row align-items-center'
            onClick={() => controlTemperature(air.down)}
          >
            <i className='fas fa-minus text-primary'></i>
          </Button>

          <div style={{ width: '75px' }}>
            <Form.Control
              className='text-center'
              value={air.on ? air.temperature : 'OFF'}
              isInvalid={invalid}
              readOnly
            />
          </div>

          <Button
            variant='outline-secondary'
            className='d-flex flex-row align-items-center'
            onClick={() => controlTemperature(air.up)}
          >
            <i className='fas fa-plus text-primary'></i>
          </Button>
        </InputGroup>
      </div>
    </Form>
  )
}

export default ControlPanel
