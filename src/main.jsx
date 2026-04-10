import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Use hydrateRoot when server-rendered HTML is present, createRoot otherwise
if (container.innerHTML.trim()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
