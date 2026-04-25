import { defaultAllowedOrigins } from "vite"

 export default playSong = async ({videoId, title, thumbnailUrl, channelTitle}) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const response = await axios.get(`${backendUrl}/stream/${videoId}`)
      const streamUrl = response.data.data
      const newObject = { streamUrl: streamUrl, title: title, thumbnailUrl: thumbnailUrl, channelTitle: channelTitle }
      updateStreamUrl(newObject)


    } catch (err) {
      console.error('Failed to get stream URL:', err)
    }
  }