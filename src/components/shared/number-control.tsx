import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { NumberControlProps } from '../../models/number-control.models'

export function NumberControl(props: NumberControlProps) {
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
            value={
              props.valueFn() +
              (props.unit && typeof props.valueFn() === 'number'
                ? ` ${props.unit}`
                : '')
            }
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

export default NumberControl
