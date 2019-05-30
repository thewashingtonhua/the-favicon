import 'react-app-polyfill/stable'
import React from 'react'
import { render } from 'react-dom'
import { register } from './serviceWorker'
import App from './App'
import './styles/global.scss'

render(
  <App />,
  document.getElementById('root') as HTMLElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
register()
