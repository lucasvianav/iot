import React from 'react'
import { Form } from 'react-bootstrap'
import { TogglerProps } from '../../models/toggler.models'

export function Toggler(props: TogglerProps) {
  return (
    <div className='m-auto'>
      <small>{props.title}</small>
      <Form.Check
        type='switch'
        label={props.labelFn()}
        className='m-auto'
        checked={props.checkedFn()}
        onChange={props.onChangeFn}
        disabled={props.disabled}
      />
    </div>
  )
}

export default Toggler
