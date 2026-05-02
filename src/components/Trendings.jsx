import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSong } from '../context/SongContext'
import playSong from '../utilities/playSong'
const Trendings = () => {
  const { updateStreamUrl, currentSong } = useSong()
  const [trendings, setTrendings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadingSongId, setLoadingSongId] = useState('')

  const { streamUrl ,isInGroup} = useSong();


  const handlePlayClick = async (videoId, title, thumbnailUrl, channelTitle) => {
    try {
      setLoadingSongId(videoId)
      const newSong = {videoId ,  title: title, thumbnailUrl: thumbnailUrl, channelTitle: channelTitle }
      await playSong(newSong, updateStreamUrl,isInGroup)
    } catch (err) {
      console.error('Failed to get stream URL:', err)
    }
    finally {
      setLoadingSongId('')
    }
  }





  useEffect(() => {
    const loadTrendings = async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = sessionStorage.getItem("trendings");

        if (cached) {
          let data = await JSON.parse(cached)
          setTrendings(data);
          return;
        }
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(`${backendUrl}/search/trending`)
        const data = response.data

        if (!data) {
          throw new Error('Invalid response from server')
        }

        const results = Array.isArray(data)
          ? data
          : data.data || data.results

        if (!Array.isArray(results) || results.length < 1) {
          throw new Error('No trending songs found')
        }

        sessionStorage.setItem("trendings", JSON.stringify(results));

        setTrendings(results)
      } catch (err) {
        setError(err.message)
        setTrendings([])
      } finally {
        setLoading(false)
      }
    }

    loadTrendings()
  }, [])

  return (
    <div className="trending-page !m-1">

      {loading && (
        <div className="trending-loading">Loading trendings...</div>
      )}

      {error && <div className="recent-error">{error}</div>}

      {!loading && !error && (
        <div className="trending-grid">
          {trendings.map((song, index) => {
            const videoId = song?.id?.videoId || song?.id
            const thumbnailUrl =
              song?.snippet?.thumbnails?.high?.url ||
              song?.snippet?.thumbnails?.medium?.url ||
              song?.snippet?.thumbnails?.default?.url ||
              ''
            const title = song?.snippet?.title || 'Untitled'
            const channelTitle = song?.snippet?.channelTitle || 'Unknown channel'
            const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#'

            return (
              <div key={videoId} className="trending-card">
                <div className="trending-card-image-wrapper">
                  <img src={thumbnailUrl} alt={title} className="trending-card-image" />

                  {/* Overlay */}
                  <div className="trending-overlay">
                    <button
                      onClick={() => handlePlayClick(videoId, title, thumbnailUrl, channelTitle)}
                      className="play-button"
                    >
                      {loadingSongId === videoId ?
                        <img src='/buffer.gif' className='w-full h-full bg-cover'>
                        </img>
                        : "▶"}
                    </button>

                  </div>
                </div>

                <div className="trending-card-body">
                  <div className="trending-card-title">{title}</div>
                  <div className="trending-card-subtitle">{channelTitle}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Trendings
