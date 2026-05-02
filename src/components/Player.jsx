import React, { useEffect, useRef, useState } from 'react'
import { useSong } from '../context/SongContext'

const MiniPlayer = () => {
  const { currentSong, playNext, playPrev, isInGroup } = useSong()
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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
    const value = Number(e.target.value)
    audioRef.current.currentTime = value
    setCurrentTime(value)
  }

  const onSongEnd = () => {
    const isNext = playNext()
    if (!isNext) setIsPlaying(false)
  }

  if (currentSong.title === '') return null

  return (
    <div className="relative group lg:w-[50%] bg--900/10 backdrop-blur-xl border-3 border-white/10 shadow-xl overflow-hidden rounded-3xl">

      {!isInGroup && (
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="absolute top-0 left-0 w-full md:opacity-0 group-hover:opacity-85 z-20 cursor-pointer"
        />
      )}

      <div className="absolute z-0 inset-0 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-white/35 via-zinc-200/30 to-white/20 transition-all duration-300"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onSongEnd}
      />

      <div className="relative flex z-10 items-center justify-between !p-3.5">

        <div className="flex items-center !gap-3">
          <img
            src={currentSong.thumbnailUrl || '/images/placeholder.png'}
            alt="song"
            className="w-16 h-16 rounded-2xl object-cover shadow-lg"
          />

          <div className="md:w-60 flex-col md:flex-row">
            <div className="text-white font-semibold text-base truncate">
              <marquee>{currentSong.title || 'No song playing'}</marquee>
            </div>

            <div className="text-sm text-zinc-400 overflow-hidden">
              {currentSong.channelTitle || ''}
            </div>
          </div>
        </div>

        {!isInGroup && (
          <div className="flex items-center !gap-4">
            <button
              onClick={playPrev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg"
            >
              ⏮
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xl font-bold shadow-lg"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              onClick={playNext}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg"
            >
              ⏭
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MiniPlayer