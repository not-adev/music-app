import React, { useEffect, useRef, useState } from 'react'
import { useSong } from '../context/SongContext'

const Player = () => {
  const { currentSong } = useSong()
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Load new song when context updates
  useEffect(() => {
    if (currentSong?.streamUrl && audioRef.current) {
      audioRef.current.src = currentSong.streamUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentSong])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e) => {
    const value = e.target.value
    const newTime = (value / 100) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className="player z-30">
      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* LEFT - Song Info */}
      <div className="player-left">
        <img
          src={currentSong.thumbnailUrl || 'placeholder.jpg'}
          alt="song"
          className="player-img"
        />
        <div>
          <div className="player-title">
            {currentSong.title || 'No song playing'}
          </div>
          <div className="player-channel">
            {currentSong.channelTitle || ''}
          </div>
        </div>
      </div>

      {/* CENTER - Controls */}
      <div className="player-center">
        <button onClick={togglePlay} className="play-btn">
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {/* RIGHT - Progress */}
      <div className="player-right">
        <span>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60).toString().padStart(2, '0')}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
        />

        <span>
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60).toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default Player