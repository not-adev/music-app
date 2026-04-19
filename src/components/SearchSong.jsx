import React, { useRef } from 'react'

const SearchSong = ({ getVideo, songsInfo, loading, visible, setVisible, addSongToList }) => {
  const searchInput = useRef(null)

  const handleEnter = (e) => {
    if (e.key === 'Enter' && searchInput.current) {
      getVideo(searchInput.current.value)
    }
  }

  const handleSearchClick = () => {
    if (searchInput.current) {
      getVideo(searchInput.current.value)
    }
  }

  const closeSearch = () => {
    setVisible(false)
    if (searchInput.current) {
      searchInput.current.value = ''
    }
  }

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h2>Search Songs</h2>
        <div className="search-field">
          <input
            ref={searchInput}
            type="text"
            placeholder="Type a song name and press Enter"
            onKeyDown={handleEnter}
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      )}

      {visible && (
        <div className="song-main">
          <div className="song-list">
            <button className="search-back" onClick={closeSearch}>
              Close
            </button>
            {songsInfo.map((item) => (
              <button
                className="mineBtn"
                key={item.etag}
                onClick={() => addSongToList(item)}
              >
                <img src={item.snippet.thumbnails.high.url} alt="img" className="song-img" />
                <div className="song-info">{item.snippet.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchSong
