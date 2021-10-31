import React from 'react'
import { Card } from 'react-bootstrap'
import { DataCardProps } from '../../models/data-card.models'

function DataCard(props: DataCardProps) {
  return (
    <Card bg='dark' border='primary' className='d-flex flex-row'>
      <Card.Header
        className='
          bg-primary
          d-flex justify-content-center
          align-items-center border-0
        '
        style={{ fontSize: '50pt' }}
      >
        <i className={`${props.icon} m-0 p-0`}></i>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {props.description}
        </Card.Subtitle>
        <Card.Text style={{ fontSize: '22pt' }}>{props.data}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default DataCard
