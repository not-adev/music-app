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
  const [songUrl, setSongUrl] = useState('')
  const [streamUrl, setStreamUrl] = useState('')

  const updateSongUrl = (url) => {
    setSongUrl(url)
  }

  const updateStreamUrl = (url) => {
    setStreamUrl(url)
  }

  return (
    <SongContext.Provider value={{ songUrl, streamUrl, updateSongUrl, updateStreamUrl }}>
      {children}
    </SongContext.Provider>
  )
}