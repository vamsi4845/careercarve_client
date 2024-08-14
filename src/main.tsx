import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MentorProvider } from './contexts/Context.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MentorProvider>
    <App />
    </MentorProvider>
  </StrictMode>,
)
