import axios from "axios";

const playSong = async ({ videoId, title, thumbnailUrl, channelTitle },updateStreamUrl) => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.get(`${backendUrl}/stream/${videoId}`);

    const streamUrl = response.data.data;

    const newObject = {
      streamUrl,
      title,
      thumbnailUrl,
      channelTitle,
    };

    await updateStreamUrl(newObject);
  } catch (err) {
    console.error("Failed to get stream URL:", err);
  }
};

export default playSong;