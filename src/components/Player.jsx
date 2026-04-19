import React, { useEffect, useState, useRef } from 'react'
import { useSong } from '../context/SongContext'

const Player = ({ songsList }) => {
  const { streamUrl } = useSong()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (streamUrl && audioRef.current) {
      audioRef.current.src = streamUrl
      audioRef.current.load()
    }
  }, [streamUrl])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }
a
  const option = {
    height: "90",
    width: "90",
    playerVars: {
      autoplay: 0
    }

  }
  function onPlayerReady(e) {
    // console.log(songsList[songsList.length -1].videoId)

    setPlay_puase_image("images/play.svg")
    player.current = e.target
    one.current = player.current.getDuration() / 60
    console.log(one)

  }

  function play_or_pause() {

    // console.log(player.current.getCurrentTime())
    if (player.current) {
      if (player.current.getPlayerState() === 1) {
        player.current.pauseVideo()



      }
      else {
        player.current.playVideo()










      }

    }

  }
  function onStateChange(e) {

    if (e.data == 2) {
      setPlay_puase_image("images/play.svg")
      clearInterval(myinterval)
    }
    else if (e.data == 1) {
      setPlay_puase_image("images/stop.jpg")
      myinterval = setInterval(() => {
        setSlider_value(player.current.getCurrentTime() / one.current)

      }, 2000);

    }
    else {
      setPlay_puase_image("images/play.svg")
      clearInterval(myinterval)
    }
  }
  function Next() {
    const index = songsList.findIndex(u => u.videoId == current.videoId)
    if (index == songsList.length - 1) {
      return
    }
    else {
      const newElement = songsList[index + 1]
      setcurrent(newElement)
    }

  }

  function prev() {
    const index = songsList.findIndex(u => u.videoId == current.videoId)
    if (index == 0) {
      return
    }
    else {
      const newElement = songsList[index - 1]
      setcurrent(newElement)
    }

  }

  const handleSlider = (e) => {
    const currentPlace = Math.floor((player.current.getDuration() / 60) * e.target.value)
    player.current.seekTo(currentPlace)
    setSlider_value(e.target.value)
  }



  return (
    <>
      <div className="song-frame">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="main_">
          <div className="current-song-info">
            <div className="song-title">Now Playing</div>
            <div className="song-time">
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
              {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max="100"
              className="slide-bar"
              onChange={handleSeek}
              value={duration ? (currentTime / duration) * 100 : 0}
            />
          </div>
          <div className="buttoons">
            <button className="mid btn" onClick={togglePlayPause}>
              <img src={isPlaying ? "images/stop.jpg" : "images/play.svg"} alt="play" id="play" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player