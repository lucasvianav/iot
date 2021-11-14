import React from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { DataCardProps } from '../../models'

export function DataCard(props: DataCardProps) {
  return (
    <Card bg='dark' border='primary' className='d-flex flex-row'>
      <Card.Header
        className='
          bg-primary
          d-flex justify-content-center
          align-items-center border-0
        '
        style={{ fontSize: '50pt' }}
        title={props.title}
      >
        <div className='p-0 m-0' style={{ width: '65px' }}>
          <i className={`${props.icon} m-0 p-0`}></i>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Title className='text-truncate' title={props.title}>
          {props.title}
        </Card.Title>

        <Card.Subtitle
          className='mb-2 text-muted text-truncate'
          title={props.description}
        >
          {props.description}
        </Card.Subtitle>

        <Card.Text
          className='text-center'
          style={{ fontSize: '22pt' }}
          as='div'
        >
          {!props.loading && !props.error ? (
            props.data
          ) : props.error ? (
            'Ocorreu um erro...'
          ) : (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default DataCard
