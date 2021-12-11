import React from 'react'
import './index.scss'

export function Footer() {
  return (
    <footer className='mx-auto pb-2 w-100 px-4 px-md-5 text-center mw-1200px'>
      <hr className='my-4 mx-auto'></hr>
      <div className='px-4'>
        <p>
          © 2021 — Aplicação desenvolvida por Antônio Pedro Medrado (10748389),
          Lucas Viana (10748409) e Yann Amado (10746943).
        </p>
        <a
          href='https://gitlab.com/icmc-ssc0952/2021/giotgrad07'
          target='_blank'
          rel='noopener noreferrer'
          className='
            text-no-decoration
            text-muted d-flex
            justify-content-center
          '
        >
          <i className='icon fab fa-gitlab'></i>
          Código-Fonte
        </a>
      </div>
    </footer>
  )
}

export default Footer
