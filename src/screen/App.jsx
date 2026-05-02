import Right from '../components/Right'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css'
import Artist1 from '../components/Artist1'
import Artist2 from '../components/Artist2'
import Artist3 from '../components/Artist3'
import Artist4 from '../components/Artist4'
import Artist5 from '../components/Artist5'
import Left from '../components/Left'
import Trendings from '../components/Trendings'
import RecentSongs from '../components/RecentSongs'
import { useState } from 'react'
import MiniPlayer from '../components/Player';
import SerchSong from '../pages/SearchSongs';
import SearchGroupPage from '../pages/SearchGroup';
import ProtectedRoute from '../components/ProtectedRoute';
import SignInAndLoginPage from '../pages/SignInAndLoginPage';
import { AuthenticateWithRedirectCallback } from '@clerk/react';
import UserNavbarButton from '../components/UserNavbarButton';
import AuthSync from '../components/AuthSync.jsx'
import { useSocketAuth } from '../useSocketAuth';
import CreateGroupPage from '../pages/CreateGroupPage.jsx';
import MyOwnedGroups from '../pages/MyGroupsPage.jsx';
function App() {
  useSocketAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const noop = () => { }

  return (
    <Router>
      <AuthSync />
      <section className='flex items-center justify-around  inset-0'>
        <button className='mobile-menu-btn' onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className=''>
          <img src='/logo/logo.gif' alt='logo' className='h-10 invert-100' />
        </div>

        <UserNavbarButton />

      </section>

      <section className='main-section relative'>
        {sidebarOpen && (
          <div
            className='sidebar-overlay'
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <div className="fixed bottom-3 z-30  flex justify-center left-0 right-0 !mx-2 !p-1" >
          <MiniPlayer />

        </div>
        <div className={`left ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Left />
        </div>
        <div className='right'>
          <Routes>
            <Route path='/login' element={<SignInAndLoginPage />} />
            <Route
              path="/sso-callback"
              element={<AuthenticateWithRedirectCallback />}
            />
            <Route path='/' element={<Right click_function={noop} />} />
            <Route path='/search-song' element={
              <ProtectedRoute>
                <SerchSong />
              </ProtectedRoute>
            } />
            <Route path='/search-group' element={<SearchGroupPage />} />
            <Route path='/create-group' element={
              <ProtectedRoute>
                <CreateGroupPage />
              </ProtectedRoute>
            } />


            <Route path='/my-groups' element={
              <ProtectedRoute>

               <MyOwnedGroups />
              </ProtectedRoute>
            } />

            <Route path='/artist1' element={
              <ProtectedRoute>

                <Artist1 click_function={noop} />
              </ProtectedRoute>
            } />

            <Route path='/artist2' element={<Artist2 click_function={noop} />} />
            <Route path='/artist3' element={<Artist3 click_function={noop} />} />
            <Route path='/artist4' element={<Artist4 click_function={noop} />} />
            <Route path='/artist5' element={<Artist5 click_function={noop} />} />
          </Routes>
        </div>
      </section>
    </Router>
  )
}

export default App
