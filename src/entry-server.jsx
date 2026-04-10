import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import App from './App.jsx'

export async function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
