import React from 'react'

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

          <div className="play-container">
            <div className="playlist">
              <div className="inside-playlist">
                <span style={{ fontWeight: 700, fontSize: "23px" }}>
                  Add song from your computer
                </span>
                <span style={{ fontWeight: 400 }}>It's easy, just click below</span>
              </div>
              <div>
                <button className="playlist-button">
                 currently not working sorry!
                </button>
              </div>
            </div>

            <div className="playlist">
              <div className="inside-playlist">
                <span style={{ fontWeight: 700 }}>Some song from the Developer</span>
                <span style={{ fontWeight: 700 }}>Suggested</span>
              </div>
              <div>
                Your name <br />
                Suzume
              </div>
            </div>
          </div>

         
        
   </>
  )
}

export default Left