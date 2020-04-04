import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const render = App => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
    <App />,
    root,
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default

    render(App)
  })
}
