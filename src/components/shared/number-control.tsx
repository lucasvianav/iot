import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { NumberControlProps } from '../../models/number-control.models'

export function NumberControl(props: NumberControlProps) {
  const step = props.step || 1
  const min = props.min !== undefined ? props.min : Number.MIN_SAFE_INTEGER
  const max = props.max !== undefined ? props.max : Number.MAX_SAFE_INTEGER

  let validate: (newValue: number) => boolean
  if (props.validateFn) {
    validate = props.validateFn
  } else {
    validate = (newValue: number): boolean => min <= newValue && newValue <= max
  }

  const [invalid, setInvalid] = useState(false)
  let invalidTimeout: NodeJS.Timeout

  const updateValue = (step: number) => {
    if (typeof props.value !== 'number') {
      return
    }

    const updatedValue = props.value + step
    const valid = validate(updatedValue)
    setInvalid(!valid)

    if (invalidTimeout) {
      clearTimeout(invalidTimeout)
    }

    valid
      ? props.setterFn(updatedValue)
      : (invalidTimeout = setTimeout(() => setInvalid(false), 1000))
  }

  return (
    <div>
      <small>{props.title}</small>
      <InputGroup>
        <Button
          variant='outline-secondary'
          className='d-flex flex-row align-items-center'
          onClick={() => updateValue(-step)}
          disabled={props.disabled}
        >
          <i className='fas fa-minus text-primary'></i>
        </Button>

        <div style={{ width: '75px' }}>
          <Form.Control
            className='text-center'
            value={
              props.value +
              (props.unit && typeof props.value === 'number'
                ? ` ${props.unit}`
                : '')
            }
            isInvalid={invalid}
            disabled={props.disabled}
            readOnly
          />
        </div>

        <Button
          variant='outline-secondary'
          className='d-flex flex-row align-items-center'
          onClick={() => updateValue(step)}
          disabled={props.disabled}
        >
          <i className='fas fa-plus text-primary'></i>
        </Button>
      </InputGroup>
    </div>
  )
}

export default NumberControl
