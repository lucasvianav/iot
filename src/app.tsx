import React from 'react'
import './app.scss'
import Footer from './components/core/footer'
import Header from './components/core/header'

function App() {
  return (
    <body className='App text-white'>
      <Header />

      <main className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </main>

      <Footer />
    </body>
  )
}

export default App
