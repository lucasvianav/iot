import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/@fortawesome/fontawesome-free/js/brands.js'
import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js'
import '../node_modules/@fortawesome/fontawesome-free/js/solid.js'
import App from './app'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
