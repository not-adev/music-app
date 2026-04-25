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
  const [currentSong, setCurrentSong] = useState({ streamUrl: '', title: '', thumbnailUrl: '', channelTitle: '' })
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);

  const updateStreamUrl = (songData) => {
    if (currentSong.streamUrl) {
      setHistory((prev) => [currentSong, ...prev]);
    }
    setCurrentSong(songData)

  }
  const addToQueue = (song) => {
    if(queue.length >= 5){
      return 
    }
    setQueue((prev) => [...prev, song]);
  };

  const playNext = () => {
    if (queue.length === 0) return;

    const nextSong = queue[0];
    if (currentSong) {
      setHistory((prev) => [currentSong, ...prev]);
    }

    setCurrentSong(nextSong);
    setQueue((prev) => prev.slice(1));
  };


  return (
    <SongContext.Provider value={{ currentSong, updateStreamUrl, addToQueue , playNext , history , queue }}>
      {children}
    </SongContext.Provider>
  )
}