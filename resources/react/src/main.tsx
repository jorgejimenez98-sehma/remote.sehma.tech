import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { HomePage } from '@/features/landing/home/home.page'

import './styles/app.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
