import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Toaster position='top-center' />
        <App />
  </StrictMode>,
)