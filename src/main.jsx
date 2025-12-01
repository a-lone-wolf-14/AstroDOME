import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import './W_Station.css'
import App from './Welcome.jsx'
import Router from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
