import React from 'react'
import { Footer, Header, Main } from './components/core'

function App() {
  return (
    <div className='text-white d-flex flex-column' style={{ height: '100vh' }}>
      <Header displaySeconds={true} />
      <Main />
      <Footer />
    </div>
  )
}

export default App
