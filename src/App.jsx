import { useState } from 'react'
import Right from './components/Right'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Player from './components/Player'
import Artist1 from './components/Artist1'
import Artist2 from './components/Artist2'
import Artist3 from './components/Artist3'
import Artist4 from './components/Artist4'
import Artist5 from './components/Artist5'
import Left from './components/Left'
import SearchSong from './components/SearchSong'

function App() {
  const [songsInfo, setSongsInfo] = useState([' '])
  const [songsList, setsongsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [playerVisible, setPlayerVisible] = useState(false)

  async function getVideoFromArtist(keyword) {
    const fetched = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyABYGCe9shHzWmGMzh99xsO_YTN1R1Gk6E&q=${keyword}&maxResult=1`).catch(() => {
      console.log('error')
      return 'some error occured try not to serch for a while'
    })

    const data = await fetched.json().catch(() => {
      console.log('error ')
    })

    const { items } = data
    const item = {
      videoId: items[0].id.videoId,
      thumbnails: items[0].snippet.thumbnails.high.url,
      title: items[0].snippet.title
    }

    setPlayerVisible(true)
    if (songsList.length === 0) {
      const temp = { videoId: item.videoId, thumbnail: item.thumbnails, title: item.title }
      setsongsList((prev) => [...prev, temp])
      return
    }

    for (let index = 0; index < songsList.length; index++) {
      const element = songsList[index]
      if (element.videoId === item.videoId) {
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

    const newSong = { videoId: item.videoId, thumbnail: item.thumbnails, title: item.title }
    setsongsList((prev) => [...prev, newSong])
  }

  async function getVideo(keyword) {
    try {
      setLoading(true)
      const fetched = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyABYGCe9shHzWmGMzh99xsO_YTN1R1Gk6E&q=${keyword}`).catch(() => {
        console.log('error')
        return 'some error occured try not to serch for a while'
      })
      const data = await fetched.json().catch(() => {
        console.log('error ')
      })

      const { items } = data
      setSongsInfo(items)
      setVisible(true)
    } catch (error) {
      alert('some error ')
    } finally {
      setLoading(false)
    }
  }

  const addSongToList = (item) => {
    setPlayerVisible(true)
    if (songsList.length === 0) {
      const temp = { videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title }
      setsongsList((prev) => [...prev, temp])
      return
    }

    for (let index = 0; index < songsList.length; index++) {
      const element = songsList[index]
      if (element.videoId === item.id.videoId) {
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

    const newSong = { videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title }
    setsongsList((prev) => [...prev, newSong])
  }

  return (
    <Router>
      <section className='nav-bar'>
        <div className=''>
          <img src='namelogo.png' alt='img' className='mylogo' />
        </div>
        <div className='search-home'>
          <Link to='/' className='home-class'>
            <button className='home-button'>
              <img src='images/home.svg' alt='home' className='invert' />
            </button>
          </Link>
        </div>
      </section>

      <section className='main-section'>
        <div className='left'>
          <Left />
        </div>
        <div className='right'>
          <Routes>
            <Route path='/' element={<Right click_function={getVideoFromArtist} />} />
            <Route path='/search-song' element={<SearchSong getVideo={getVideo} songsInfo={songsInfo} loading={loading} visible={visible} setVisible={setVisible} addSongToList={addSongToList} />} />
            <Route path='/search-group' element={<Right click_function={getVideoFromArtist} />} />
            <Route path='/my-groups' element={<Right click_function={getVideoFromArtist} />} />
            <Route path='/artist1' element={<Artist1 click_function={getVideoFromArtist} />} />
            <Route path='/artist2' element={<Artist2 click_function={getVideoFromArtist} />} />
            <Route path='/artist3' element={<Artist3 click_function={getVideoFromArtist} />} />
            <Route path='/artist4' element={<Artist4 click_function={getVideoFromArtist} />} />
            <Route path='/artist5' element={<Artist5 click_function={getVideoFromArtist} />} />
          </Routes>
        </div>
      </section>
      {playerVisible && <Player songsList={songsList} />}
    </Router>
  )
}

export default App
