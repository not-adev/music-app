import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { useRef } from 'react'

const Player = ({ songsList }) => {
  let myinterval;
  const one = useRef(null)
  const [current, setcurrent] = useState(songsList[songsList.length - 1])
  useEffect(() => {
    setcurrent(songsList[songsList.length - 1])
  }, [songsList])

  const player = useRef(null)
  const [slider_value, setSlider_value] = useState(0)
  const [play_puase_image, setPlay_puase_image] = useState("images/play.svg")

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
      <div className="song-frame  ">
        <div className='youtube-video '>
          <YouTube videoId={current.videoId} opts={option} onStateChange={onStateChange} onReady={onPlayerReady} />
        </div>
        <div className="main_">
           <img src={current.thumbnail} alt="img" className='current-song-img' />
          <marquee className="marquee" scrollamount="5" direction="left">{current.title}</marquee>
    <div>

   
          <div>
            <input
              type="range"
              min="0"
              max="60"
              className="slide-bar"
              onChange={handleSlider}
              value={slider_value}
            />
           
          </div>
          

          <div className="buttoons">
            <button className="back btn" onClick={prev} >
              <img src="images/left-button.jpg" alt="img" />
            </button>
            <button className="mid btn" onClick={play_or_pause} >
              <img src={play_puase_image} alt="play" id="play" />
            </button>
            <button className="front btn" onClick={Next}>
              <img src="images/right-button.webp" alt="" />
            </button>
          </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Player