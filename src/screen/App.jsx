import Right from '../components/Right'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import Player from '../components/Player';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const noop = () => { }

  return (
    <Router>
      <section className='nav-bar'>
        <button className='mobile-menu-btn' onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className=''>
          <img src='namelogo.png' alt='logo' className='mylogo' />
        </div>
      </section>

      <section className='main-section'>
        {sidebarOpen && (
          <div
            className='sidebar-overlay'
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <div className={`left ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Left />
        </div>
        <Player />
        <div className='right'>

          <Routes>
            <Route path='/' element={<Right click_function={noop} />} />
            <Route path='/artist1' element={<Artist1 click_function={noop} />} />
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
