import React, { useEffect, useState } from 'react'
import { Toast as BsToast } from 'react-bootstrap'
import { ToastProps } from '../../models'

export function Toast(props: ToastProps) {
  const [elapsed, setElapsed] = useState(0)

  const [show, setShow] = useState(true)
  props.toast.open = show
  props.toast.close = () => setShow(false)

  // cronometer for elapsed time
  // since the tast was created
  useEffect(() => {
    const timer = setInterval(() => setElapsed(elapsed + 1), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <BsToast
      show={props.toast.open}
      onClose={props.toast.close}
      bg='light'
      delay={props.toast.delay || 150000}
      animation
      autohide
    >
      <BsToast.Header className='bg-danger text-white' closeVariant='white'>
        <strong className='me-auto'>{props.toast.title}</strong>
        <small>{elapsed ? `Há ${elapsed} minutos` : 'Agora'}</small>
      </BsToast.Header>
      <BsToast.Body>{props.toast.body}</BsToast.Body>
    </BsToast>
  )
}

export default Toast
