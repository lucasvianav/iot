import React from 'react'
import { Spinner } from 'react-bootstrap'

export function GlobalLoading(props: { loading: boolean }) {
  return props.loading ? (
    <div
      className='bg-dark d-flex justify-content-center align-items-center'
      style={{
        position: 'absolute',
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        opacity: 0.95,
        top: 0,
        left: 0,
      }}
    >
      <Spinner animation='border' role='status' variant='primary'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  ) : (
    <></>
  )
}
