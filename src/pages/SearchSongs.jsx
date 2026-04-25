import GenreAnadSearchaBar from "../components/GenreAndSerchBar"
import RenderSearchSongs from "../components/RenderSearchSong";
import { useState } from "react";
import axios from "axios";
import playSong from "../utilities/playSong.js";
import { useSong } from "../context/SongContext.jsx";
export default function SerchSong() {
    const [songName, setSongName] = useState('')
    const [showSongList, seTshowSongList] = useState(false)
    const [songData, setSongData] = useState([])
    const [loading, setLoading] = useState(false);
    const { updateStreamUrl } = useSong()
    async function SerachSong(e) {
        e.preventDefault();
        try {
            if (!songName) return
            setLoading(true); // 🔥 start loading
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            const apiCall = await axios.get(`${backendUrl}/search?keyword=${songName}`)
            const data = apiCall.data
            if (!data) {
                throw new Error('Invalid response from server')
            }

            const results = Array.isArray(data)
                ? data
                : data.data || data.results

            if (!Array.isArray(results) || results.length < 1) {
                throw new Error('No trending songs found')
            }
            console.log(results)
            setSongData(results)
            seTshowSongList(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    }
    async function SongByGener(data) {
        if (!data) return
        setSongData(data)
        seTshowSongList(true)
    }

    async function onClickPlay(song) {

        try {
            const perams = {
                videoId: song.videoId,
                title: song.title,
                thumbnailUrl: song.thumbnailUrl,
                channelTitle: song.channelTitle
            }
            await playSong(perams, updateStreamUrl)
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className="min-h-screen relative bg-zinc-950 p-6">
            <form onSubmit={(e) => SerachSong(e)} className="sticky z-20 top-0 flex items-center justify-between h-14 rounded-2xl !mb-3.5 !p-6 bg-zinc-800">
                <input
                    required
                    type="text"
                    onChange={(e) => setSongName(e.target.value)}
                    value={songName}
                    className="w-[70%] text-gray-300 bg-transparent outline-none"
                    placeholder="Search Song"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-10 h-10 disabled:opacity-60"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                    )}
                </button>
            </form>

            {
                showSongList ?
                  <div className="">
                        <div className="w-full flex justify-start">
                            <button
                            onClick={()=>seTshowSongList(false)}
                                className="!px-4 !py-2 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition shadow-md border border-zinc-700"
                            >
                                Close
                            </button>
                        </div>
                   
                        <RenderSearchSongs songs={songData} />
                        </div>
                    
                    :
                  

                        <GenreAnadSearchaBar onClickPlay={SongByGener} />
                    
            }


        </div>
    )
}