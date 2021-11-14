import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export function ControlPanel() {
  return (
    // className='d-flex flex-row align-items-center m-auto'
    // style={{ border: 'solid 1px red', width: '300px' }}
    <Form className='row'>
      <div className='col-6 d-flex align-item-center'>
        <Form.Check type='switch' label='Status' className='m-auto' />
      </div>

      <div className='col-6'>
        <InputGroup>
          <Button
            variant='outline-secondary'
            className='d-flex flex-row align-items-center'
          >
            <i className='fas fa-minus text-primary'></i>
          </Button>

          <div style={{ width: '75px' }}>
            <Form.Control className='text-center' value='OFF' readOnly />
          </div>

          <Button
            variant='outline-secondary'
            className='d-flex flex-row align-items-center'
          >
            <i className='fas fa-plus text-primary'></i>
          </Button>
        </InputGroup>
      </div>
    </Form>
  )
}

export default ControlPanel
