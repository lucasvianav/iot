import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { TemperatureControlProps } from '../../models/temperature-control.models'

export function TemperatureControl(props: TemperatureControlProps) {
  return (
    <div>
      <small>{props.title}</small>
      <InputGroup>
        <Button
          variant='outline-secondary'
          className='d-flex flex-row align-items-center'
          onClick={props.minusFn}
          disabled={props.disabled}
        >
          <i className='fas fa-minus text-primary'></i>
        </Button>

        <div style={{ width: '75px' }}>
          <Form.Control
            className='text-center'
            value={props.valueFn()}
            isInvalid={props.invalidFn()}
            disabled={props.disabled}
            readOnly
          />
        </div>

        <Button
          variant='outline-secondary'
          className='d-flex flex-row align-items-center'
          onClick={props.plusFn}
          disabled={props.disabled}
        >
          <i className='fas fa-plus text-primary'></i>
        </Button>
      </InputGroup>
    </div>
  )
}

export default TemperatureControl
