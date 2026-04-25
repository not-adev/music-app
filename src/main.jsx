import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screen/App.jsx'
import { SongProvider } from './context/SongContext.jsx'
import { ClerkProvider } from '@clerk/react'
import AuthSync from './components/AuthSync.jsx'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(clerkPubKey)
createRoot(document.getElementById('root')).render(

  <ClerkProvider publishableKey={clerkPubKey}>
    <SongProvider>
      <AuthSync />
      <App />
    </SongProvider>
  </ClerkProvider>
)
