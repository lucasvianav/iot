import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <Navbar variant='dark' bg='dark' expand='md'>
      <Container>
        <Navbar.Brand href='#home'>SSC0952 — Internet das Coisas</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
