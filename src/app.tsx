import React from 'react'
import { Accordion } from 'react-bootstrap'
import './app.scss'
import { ControlPanel, DataPanel, Footer, Header } from './components/core'

function App() {
  return (
    <div className='text-white d-flex flex-column' style={{ height: '100vh' }}>
      <Header displaySeconds={true} />

      <main className='px-5 m-auto mw-1200px w-100'>
        <Accordion defaultActiveKey='data'>
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

      <Footer />
    </div>
  )
}

export default App
