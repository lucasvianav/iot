import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { HeaderProps } from '../../models'

function Header(props: HeaderProps) {
  const locale = 'pt-br'
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date()),
      props.displaySeconds ? 1000 : 60000
    )

    return () => clearInterval(timer)
  })

  return (
    <Navbar variant='dark' bg='dark' expand='md'>
      <Container>
        <Navbar.Brand href='#home'>SSC0952 — Internet das Coisas</Navbar.Brand>
        <Navbar.Text>
          {time.toLocaleTimeString(locale, {
            timeStyle: props.displaySeconds ? 'medium' : 'short',
          })}
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Header
