import React, { useContext } from 'react'
import { ToastContainer as BsToastContainer } from 'react-bootstrap'
import { ToastsContext } from '../../contexts'
import { Toast } from './toast'

export function ToastContainer() {
  const { toasts } = useContext(ToastsContext)

  return (
    <BsToastContainer
      position='top-end'
      className='p-3'
      style={{
        position: 'absolute',
        zIndex: 99,
      }}
    >
      {toasts.map((toast, i) => (
        <Toast toast={toast} key={i} />
      ))}
    </BsToastContainer>
  )
}
