import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThirdPartyProviders from '@/providers/ThirdPartyProviders.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdPartyProviders>
      <App />
    </ThirdPartyProviders>
  </StrictMode>
)