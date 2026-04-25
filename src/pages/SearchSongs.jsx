import GenreAnadSearchaBar from "../components/GenreAndSerchBar"
import RenderSearchSongs from "../components/RenderSearchSong";
import { useState } from "react";
import axios from "axios";
import playSong from "../utilities/playSong";
// import playSong from "../utilities/playSong";
export default function SerchSong() {
    const [songName, setSongName] = useState('')
    const [showSongList, seTshowSongList] = useState(false)
    const [songData, setSongData] = useState([])
    async function SerachSong(e, name) {
        e.preventDefault();
        try {
            if (!name) return
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            const apiCall = await axios.get(`${backendUrl}/search?keyword=${name}`)
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

        } catch (error) {
            console.log(error)
        }

    }
    async function SearchGenerFunction(gener) { }

    // async function onClickPlay(song) {

    //     try {
    //         const perams = {
    //             videoId: song.videoId,
    //             title: song.title,
    //             thumbnailUrl: song.thumbnailUrl,
    //             channelTitle: song.channelTitle
    //         }
    //         await playSong(perams)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }


    return (
        <div className="min-h-screen relative bg-zinc-950 p-6">
            <form onSubmit={() => SearchSongs()} className="sticky z-2 top-0 flex items-center justify-between h-14 rounded-2xl mb-3.5 p-6 bg-zinc-800">
                <input required type="text" onClick={(e) => setSongName(e.target.value)} value={songName} className="w-[70%] !font-[Op text-gray-300" placeholder="Search Song" />
                <button type="submit" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </button>
            </form>

            {
                showSongList ?

                    <RenderSearchSongs songs={songData} /> :
                    <GenreAnadSearchaBar />}


        </div>
    )
}