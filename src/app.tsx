import React from 'react'
import { Footer, Header, Main } from './components/core'

function App() {
  return (
    <body className='text-white d-flex flex-column' style={{ height: '100vh' }}>
      <Header displaySeconds={true} />
      <Main />
      <Footer />
    </body>
  )
}

export default App
