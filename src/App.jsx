import { useEffect, useRef, useState } from 'react'
import Right from './components/Right'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Player from './components/Player'
import Artist1 from './components/Artist1'
import Artist2 from './components/Artist2'
import Artist3 from './components/Artist3'
import Artist4 from './components/Artist4'
import Artist5 from './components/Artist5'
import Left from './components/Left'
function App() {
  const [songsInfo, setSongsInfo] = useState([" "])
  const [songsList, setsongsList] = useState([])
  const search = useRef(null)

  const [visible, setVisible] = useState(false)
  const [playerVisible, setPlayerVisible] = useState(false)

  async function getVideoFromArtist(keyword) {
    console.log("hiihihihi")
  
      const fetched = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyABYGCe9shHzWmGMzh99xsO_YTN1R1Gk6E&q=${keyword}&maxResult=1`).catch(() => {
        console.log("error")
        return "some error occured try not to serch for a while"
      });

      const data = await fetched.json().catch(() => {
        console.log("error ")
      });


      const { items } = data
      console.log(items)
    
      console.log(items[0].id.videoId, items[0].snippet.title)
      const item = {
        videoId: items[0].id.videoId,
        thumbnails: items[0].snippet.thumbnails.high.url,
        title: items[0].snippet.title
      }
      console.log("runnign till item", item)

     
      setPlayerVisible(true)
      if (songsList.length == 0) {
        console.log("inside if")
        const temp =  { videoId: item.videoId, thumbnail: item.thumbnails, title: item.title }
        setsongsList((prev) => [...prev, temp])
        return

      }
      else {
        for (let index = 0; index < songsList.length; index++) {

          const element = songsList[index];
          if (element.videoId == item.videoId) {
            setsongsList((prev) => {
              const tempList = [...prev]
              tempList.splice(index, 1)
              return tempList
            })
            const temp = { videoId: item.videoId, thumbnail: item.thumbnails, title: item.title }
            setsongsList((prev) => [...prev, temp])
            return
          }

        }
      }
      const newSong =  { videoId: item.videoId, thumbnail: item.thumbnails, title: item.title }
      setsongsList(prev => [...prev, newSong]);







    

  }






  async function getVideo(keyword) {
    try {
      const fetched = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyABYGCe9shHzWmGMzh99xsO_YTN1R1Gk6E&q=${keyword}`).catch(() => {
        console.log("error")
        return "some error occured try not to serch for a while"
      });
      const data = await fetched.json().catch(() => {
        console.log("error ")
      });


      const { items } = data
      setSongsInfo(items)
      setVisible(true)
    } catch (error) {
      alert("some error ")

    }

  }



  function handleEnter(e) {
    if (e.key === "Enter") {
      getVideo(e.target.value)
    }
  }

  function closeSearch() {
    setVisible(false)
    search.current.value = ""
  }





  return (

    <Router >

      <section className="nav-bar">
        <div className=''>
          <img src="namelogo.png" alt="img" className='mylogo' />
        </div>

        <div className="search-home">
          <a href="#">
            <button className="home-button">
              <img src="images/home.svg" alt="home" className="invert" />
            </button>
          </a>
          <div className='flex '>
            <span className="search-logo invert">
              <img src="images/search-logo.svg" alt="search-logo" />
            </span>
            <input type="text" placeholder="search" ref={search} onKeyDown={handleEnter} />
          </div>

        </div>


      </section>
      <section className='main-section'>
        <div className='left'>
          <Left />
        </div>
        <div className='right'>
        <Right click_function={getVideoFromArtist}/>


          {/* <Routes> */}
            {/* <Route path='/' element={<Right click_function={getVideoFromArtist}/>} /> */}
            {/* <Route path='/artist1' element={<Artist1 click_function={getVideoFromArtist}/>} />
            <Route path='/artist2' element={<Artist2 click_function={getVideoFromArtist}/>} />
            <Route path='/artist3' element={<Artist3 click_function={getVideoFromArtist}/>} />
            <Route path='/artist4' element={<Artist4 click_function={getVideoFromArtist} />} />
            <Route path='/artist5' element={<Artist5 click_function={getVideoFromArtist}/>} />
          </Routes> */}
        </div>








        {visible &&
          <div className='song-main'>
            <div className="song-list">
              {songsInfo.map((item) => (
                <button className='mineBtn' key={item.etag} onClick={() => {
                  setPlayerVisible(true)
                  if (songsList.length == 0) {
                    const temp = { videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title }
                    setsongsList((prev) => [...prev, temp])
                    return

                  }
                  else {
                    for (let index = 0; index < songsList.length; index++) {

                      const element = songsList[index];
                      if (element.videoId == item.id.videoId) {
                        setsongsList((prev) => {
                          const tempList = [...prev]
                          tempList.splice(index, 1)
                          return tempList
                        })
                        const temp = { videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title }
                        setsongsList((prev) => [...prev, temp])
                        return
                      }

                    }
                  }
                  const newSong = { videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title };
                  setsongsList(prev => [...prev, newSong]);




                }}>

                  <img src={item.snippet.thumbnails.high.url} alt="img" className="song-img" />
                  <div className="song-info">
                    {item.snippet.title}



                  </div>
                </button>

              ))}


            </div>
            <button className='search-back' onClick={closeSearch}>
              close
            </button>
          </div>

        }
        {playerVisible && <Player songsList={songsList} />}





      </section>
    </Router>

  )
}

export default App

