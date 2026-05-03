import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screen/App.jsx'
import { SongProvider } from './context/SongContext.jsx'
import { ClerkProvider } from '@clerk/react'
import { SocketProvider } from './context/SocketContext.jsx'
import { GroupProvider } from './context/GroupContext.jsx'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <SongProvider>
        <GroupProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </GroupProvider>
      </SongProvider>
    </ClerkProvider>
  </StrictMode>
);
