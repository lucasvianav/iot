import React from 'react'
import './app.scss'
import Footer from './components/core/footer'
import Header from './components/core/header'
import DataCard from './components/shared/data-card'

function App() {
  return (
    <body className='App text-white'>
      <Header displaySeconds={true} />

      <main className='App-header'>
        <DataCard
          title='Temperatura'
          description='Ar-condicionado 1'
          data='23ºC'
          icon='fas fa-snowflake'
        />
      </main>

      <Footer />
    </body>
  )
}

export default App
