import axios from 'axios'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@clerk/react'

const SongContext = createContext()

export const useSong = () => {
  const context = useContext(SongContext)
  if (!context) {
    throw new Error('useSong must be used within a SongProvider')
  }
  return context
}

export const SongProvider = ({ children }) => {
  const emptySong = {
    streamUrl: '',
    title: '',
    thumbnailUrl: '',
    channelTitle: ''
  }

  const [currentSong, setCurrentSong] = useState(emptySong)
  const [queue, setQueue] = useState([])
  const [history, setHistory] = useState([])
  const [isInGroup, setIsInGroup] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const { getToken } = useAuth()





  const updateStreamUrl = async (songData) => {
    if (isInGroup) return

    const token = await getToken()

    if (currentSong.streamUrl) {
      setHistory(prev => [currentSong, ...prev])
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    axios.post(
      `${backendUrl}/recentSongs`,
      songData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setCurrentSong(songData)
  }






  const addToQueue = (song) => {
    if (isInGroup || !song) return false

    setQueue(prev => {
      const exists = prev.some(s => s.videoId === song.videoId)
      if (exists) return prev

      const updated = [...prev, song]

      if (updated.length > 5) updated.shift()

      return updated
    })

    return true
  }






  const playNext = () => {
    if (queue.length === 0) return false

    const nextSong = queue[0]

    if (currentSong.streamUrl) {
      setHistory(prev => [currentSong, ...prev])
    }

    setCurrentSong(nextSong)
    setQueue(prev => prev.slice(1))

    return true
  }






  const playPrev = () => {
    if (isInGroup) return

    if (history.length === 0) return

    const prevSong = history[0]

    if (currentSong.streamUrl) {
      setQueue(prev => [currentSong, ...prev])
    }

    setCurrentSong(prevSong)
    setHistory(prev => prev.slice(1))
  }





  const reset = (status) => {
    setIsInGroup(status)
    setCurrentSong(emptySong)
    setQueue([])
    setHistory([])
  }







  const inGroupUpdateCurrentSong = () => {
    setCurrentSong(queue[currentIndex])
  }





  const inGroupUpdateQue = (queue) => {
    setQueue(queue)
  }





  const inGroupUpdateCurrentIndex = (index) => {
    console.log(index)
    if (currentIndex === index) {
      return
    }
    setCurrentIndex(index)
  }





  useEffect(() => {
    if (!isInGroup) {
      console.log("not in group ")
      return
    };

    const nextSong = queue[currentIndex] || emptySong;
    console.log(nextSong)
    console.log(currentSong)
    if (nextSong.songId !== currentSong.songId) {
      setCurrentSong(nextSong);
    }
  }, [queue, currentIndex, isInGroup]);





  return (
    <SongContext.Provider
      value={{
        currentSong,
        queue,
        history,
        isInGroup,
        updateStreamUrl,
        addToQueue,
        playNext,
        playPrev,
        reset,
        setIsInGroup,
        inGroupUpdateCurrentSong,
        inGroupUpdateQue,
        inGroupUpdateCurrentIndex
      }}
    >
      {children}
    </SongContext.Provider>
  )
}