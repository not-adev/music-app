import React, { useState } from 'react'

const SearchSong = () => {
  const [query, setQuery] = useState('')

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h2>Search Songs</h2>
        <div className="search-field">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Type a song name"
          />
          <button className="search-button" type="button">
            Search
          </button>
        </div>
      </div>
      <div className="search-help">
        <p>Use this page to search for songs when the feature is ready.</p>
      </div>
    </div>
  )
}

export default SearchSong
