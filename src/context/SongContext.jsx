import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
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
  const [currentSong, setCurrentSong] = useState({ streamUrl: '', title: '', thumbnailUrl: '', channelTitle: '' })
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const { getToken } = useAuth()

  const updateStreamUrl = async (songData) => {
    const token = await getToken();
    if (currentSong.streamUrl) {
      setHistory((prev) => [currentSong, ...prev]);

    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    axios.post(
      `${backendUrl}/recentSongs`,
      songData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCurrentSong(songData);
  };


  const addToQueue = (song) => {
    if (!song) return false;
    setQueue((prev) => {
      const exists = prev.some((s) => s.videoId === song.videoId);
      if (exists) return prev;

      const updated = [...prev, song];

      if (updated.length > 5) {
        updated.shift(); // remove oldest
      }

      return updated;
    });

    return true;
  };

  const playNext = () => {
    if (queue.length === 0) return false;

    const nextSong = queue[0];
    if (currentSong) {
      setHistory((prev) => [currentSong, ...prev]);
    }

    setCurrentSong(nextSong);
    setQueue((prev) => prev.slice(1));
    return true
  };

  const playPrev = () => {
    if (history.length === 0) return;

    const prevSong = history[0];
    if (currentSong) {
      setQueue((prev) => [currentSong, ...prev]);
    }

    // Set previous song as current
    setCurrentSong(prevSong);

    // Remove it from history
    setHistory((prev) => prev.slice(1));
  };


  return (
    <SongContext.Provider value={{ currentSong, updateStreamUrl, addToQueue, playNext, history, queue, playPrev }}>
      {children}
    </SongContext.Provider>
  )
} 