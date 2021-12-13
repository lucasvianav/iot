import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { HeaderProps } from '../../models'
import { enviroment } from '../../utils'

export function Header(props: HeaderProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date()),
      props.displaySeconds ? 1000 : 60000
    )

    return () => clearInterval(timer)
  })

  return (
    <Navbar variant='dark' bg='dark' className='mb-4'>
      <Container className='mw-1200px'>
        <Navbar.Brand href='#home'>SSC0952 — Internet das Coisas</Navbar.Brand>
        <Navbar.Text className='d-none d-sm-block'>
          {time.toLocaleTimeString(enviroment.locale, {
            timeStyle: props.displaySeconds ? 'medium' : 'short',
          })}
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Header
