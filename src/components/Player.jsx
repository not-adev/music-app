import React, { useEffect, useRef, useState } from 'react'
import { useSong } from '../context/SongContext'

const MiniPlayer = () => {
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
  console.log(currentSong)
  if (currentSong.title == '') return null;

  return (

    <div className="relative lg:w-[50%] bg--900/10 backdrop-blur-xl border-3 border-white/10  shadow-xl overflow-hidden rounded-3xl">       {/* Animated Progress Background */}
      <div className='absolute z-0  inset-0 pointer-events-none'>
        <div className='h-full bg-gradient-to-r from-white/35 via-zinc-200/30 to-white/20transition-all duration-300'
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        >

        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="relative flex z-10 items-center justify-between  !p-3.5 ">
        {/* LEFT - Song Info */}
        <div className="flex items-center gap-3 justify-center ">
          <img
            src={currentSong.thumbnailUrl || '/images/placeholder.png'}
            alt="song"
            className="w-16 h-16 rounded-2xl object-cover shadow-lg"
          />

          <div className=" md:w-60  flex-col md:flex-row">
            <div className="text-white  font-semibold text-base truncate">
              <marquee direction="left">

                {currentSong.title || 'No song playing'}
              </marquee>
            </div>

            <div className="text-sm text-zinc-400 w-full overflow-hidden">

              {currentSong.channelTitle || ''}

            </div>
          </div>
        </div>

        {/* CENTER - Controls */}
        <div className="flex items-center gap-4 justify-center">
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition items-center justify-center text-white text-lg">
            ⏮
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14  rounded-full bg-emerald-500 hover:bg-emerald-400 transition  items-center justify-center text-black text-xl font-bold shadow-lg"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition items-center justify-center text-white text-lg">
            ⏭
          </button>
        </div>
      </div>
    </div >
  )
}

export default MiniPlayer


