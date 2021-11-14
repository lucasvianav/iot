import React from 'react'
import { Accordion } from 'react-bootstrap'
import ControlPanel from '../control-panel'
import DataPanel from '../data-panel'
import './index.scss'

export function Main() {
  return (
    <main className='px-5 m-auto mw-1200px w-100'>
      <Accordion defaultActiveKey='controls'>
        <Accordion.Item eventKey='controls'>
          <Accordion.Header>Controles — Ar-condicionado</Accordion.Header>
          <Accordion.Body>
            <ControlPanel />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey='data'>
          <Accordion.Header>Dados — Sensores</Accordion.Header>
          <Accordion.Body>
            <DataPanel />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </main>
  )
}

export default Main
