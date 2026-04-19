import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSong } from '../context/SongContext'

const Trendings = () => {
  const { updateStreamUrl ,currentSong} = useSong()
  const [trendings, setTrendings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)




  const { streamUrl } = useSong();

  useEffect(() => {
    console.log("Stream URL updated:", currentSong);
  }, [currentSong]);

  const handlePlayClick = async (videoId, title, thumbnailUrl, channelTitle) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const response = await axios.get(`${backendUrl}/stream/${videoId}`)
      const streamUrl = response.data.data
      const newObject = { streamUrl: streamUrl, title: title, thumbnailUrl: thumbnailUrl, channelTitle: channelTitle }
      console.log(newObject)
      updateStreamUrl(newObject)


    } catch (err) {
      console.error('Failed to get stream URL:', err)
    }
  }





  useEffect(() => {
    const loadTrendings = async () => {
      setLoading(true)
      setError(null)

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(`${backendUrl}/search/trending`)
        const data = response.data

        if (!data) {
          throw new Error('Invalid response from server')
        }

        const results = Array.isArray(data)
          ? data
          : data.data || data.results || []

        if (!Array.isArray(results) || results.length === 0) {
          throw new Error('No trending songs found')
        }

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
    <div className="trending-page">

      {loading && (
        <div className="trending-loading">Loading trendings...</div>
      )}

      {error && (
        <div className="trending-error">{error}</div>
      )}

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
                      ▶
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
