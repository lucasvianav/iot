import React from 'react'

export function Footer() {
  return (
    <footer className='mx-auto w-100 px-4 px-md-5 text-center mw-1200px'>
      <hr className='my-4 mx-auto'></hr>
      <div className='px-4'>
        <p>
          © 2021 Aplicação desenvolvida por Antônio Pedro Medrado (99999999),
          Lucas Viana (10748409) e Yann Amado (99999999). <br />
          <a
            href='https://gitlab.com/icmc-ssc0952/2021/giotgrad07'
            target='_blank'
            rel='noopener noreferrer'
          >
            Código-fonte.
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
