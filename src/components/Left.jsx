import React from 'react'
import { NavLink } from 'react-router-dom'
const Left = () => {
  return (
   <>
          <header className="header">
            <div style={{ display: "flex", gap: "5px", fontSize: "18px" }}>
              <span>
                <img src="images/your-library.svg" alt="logo" className="invert" />
              </span>
              <p>Your Library</p>
            </div>
            <div>
              <button className="plus">
                <img src="images/plus.svg" alt="plus" className="invert" />
              </button>
            </div>
          </header>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '20px 0' }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#000' : '#fff',
                fontWeight: 700,
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/search-song"
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#000' : '#fff',
                fontWeight: 700,
              })}
            >
              Search Song
            </NavLink>
           
           
            <NavLink
              to="/search-group"
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#000' : '#fff',
                fontWeight: 700,
              })}
            >
              Search Group
            </NavLink>
            <NavLink
              to="/my-groups"
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#000' : '#fff',
                fontWeight: 700,
              })}
            >
              My Groups
            </NavLink>

             <NavLink
              to="/create-group"
              end
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#000' : '#fff',
                fontWeight: 700,
              })}
            >
              Create Group
            </NavLink>
          </nav>

        
   </>
  )
}

export default Left