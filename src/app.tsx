import React from 'react'
import Footer from './components/core/footer'
import Header from './components/core/header'
import DataCard from './components/shared/data-card'

function App() {
  return (
    <body className='text-white d-flex flex-column' style={{ height: '100vh' }}>
      <Header displaySeconds={true} />

      <main className='px-5 m-auto mw-1200px w-100'>
        <div className='row gap-3 gap-md-0'>
          <div className='col-md-6'>
            <DataCard
              title='Temperatura'
              description='Ar-condicionado 1'
              data='23ºC'
              icon='fas fa-snowflake'
            />
          </div>

          <div className='col-md-6'>
            <DataCard
              title='Umidade do ar'
              description='Sala 1'
              data='51%'
              icon='fas fa-wind'
            />
          </div>
        </div>
      </main>

      <Footer />
    </body>
  )
}

export default App
