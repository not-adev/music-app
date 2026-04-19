import React, { createContext, useContext, useState } from 'react'

const SongContext = createContext()

export const useSong = () => {
  const context = useContext(SongContext)
  if (!context) {
    throw new Error('useSong must be used within a SongProvider')
  }
  return context
}

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState({streamUrl : '' , title : '' , thumbnailUrl : '' ,channelTitle : '' })

  const updateStreamUrl = (songData) => {
    setCurrentSong(songData)
  }
  return (
    <SongContext.Provider value={{ currentSong,updateStreamUrl }}>
      {children}
    </SongContext.Provider>
  )
}