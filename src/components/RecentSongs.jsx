import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSong } from '../context/SongContext'

const RecentSongs = () => {
  const { updateStreamUrl } = useSong()
  const [recentSongs, setRecentSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handlePlayClick = async (videoId) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const response = await axios.get(`${backendUrl}/api/stream/${videoId}`)
      const streamUrl = response.data.streamUrl || response.data.url
      updateStreamUrl(streamUrl)
    } catch (err) {
      console.error('Failed to get stream URL:', err)
    }
  }

  useEffect(() => {
    const loadRecentSongs = async () => {
      setLoading(true)
      setError(null)

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(`${backendUrl}/search/recent-songs`)
        const data = response.data

        if (!data) {
          throw new Error('Invalid response from server')
        }

        const results = Array.isArray(data)
          ? data
          : data.data || data.results || []

        if (!Array.isArray(results) || results.length === 0) {
          throw new Error('No recent songs found')
        }

        setRecentSongs(results)
      } catch (err) {
        setError(err.message)
        setRecentSongs([])
      } finally {
        setLoading(false)
      }
    }

    loadRecentSongs()
  }, [])

  return (
    <div className="recent-page">
    

      {loading && <div className="recent-loading">Loading recent songs...</div>}
      {error && <div className="recent-error">{error}</div>}

      {!loading && !error && (
        <div className="recent-grid">
          {recentSongs.map((song, index) => {
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
              <div key={videoId || index} className="recent-card">
                <img src={thumbnailUrl} alt={title} className="recent-card-image" />
                <div className="recent-card-body">
                  <div className="recent-card-title">{title}</div>
                  <div className="recent-card-subtitle">{channelTitle}</div>
                  <a href="#" onClick={(e) => { e.preventDefault(); handlePlayClick(videoId) }} className="recent-card-link">
                    Play
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentSongs
