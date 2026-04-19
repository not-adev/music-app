import React, { useEffect, useState } from 'react'

const RecentSongs = () => {
  const [recentSongs, setRecentSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const LOCAL_STORAGE_KEY = 'recentSongs'

  useEffect(() => {
    const loadRecentSongs = async () => {
      setLoading(true)
      setError(null)

      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (Array.isArray(parsed)) {
            setRecentSongs(parsed)
            setLoading(false)
            return
          }
        }

        const response = await fetch('https://rss.applemarketingtools.com/api/v2/us/music/most-played/20/songs.json')
        if (!response.ok) {
          throw new Error('Failed to load recent songs')
        }

        const data = await response.json()
        const results = data.feed?.results || []
        setRecentSongs(results)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(results))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRecentSongs()
  }, [])

  return (
    <div className="recent-page">
    

      {loading && <div className="trending-loading">Loading recent songs...</div>}
      {error && <div className="trending-error">{error}</div>}

      {!loading && !error && (
        <div className="trending-grid">
          {recentSongs.map((song) => (
            <div key={song.id} className="trending-card">
              <img src={song.artworkUrl100} alt={song.name} className="trending-card-image" />
              <div className="trending-card-body">
                <div className="trending-card-title">{song.name}</div>
                <div className="trending-card-subtitle">{song.artistName}</div>
                <a href={song.url} target="_blank" rel="noreferrer" className="trending-card-link">
                  More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentSongs
