import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MentorProvider } from './contexts/Context.tsx'
import { Toaster } from './components/ui/sonner.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MentorProvider>
        <Toaster position='top-center' />
        <App />
      </MentorProvider>
  </StrictMode>,
)