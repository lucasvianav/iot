import React from 'react'
import { InputFieldProps } from '../../models'

export function InputField(props: InputFieldProps) {
  return (
    <input
      style={{ width: props.width }}
      className={`bg-dark ${props.className}`}
      disabled={props.disabled}
      value='OFF'
      readOnly
    />
  )
}

export default InputField
