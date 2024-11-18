import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserContextProvider from './contexts/user.context.tsx'
import CategoryContextProvider from './contexts/category.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoryContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </CategoryContextProvider>
  </StrictMode>
)
