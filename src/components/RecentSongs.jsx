import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";
import { useSong } from "../context/SongContext";

export default function RecentSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  const { getToken } = useAuth();
  const { updateStreamUrl } = useSong();

  useEffect(() => {
    const fetchRecentSongs = async () => {
      try {
        const token = await getToken();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.get(`${backendUrl}/recentSongs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSongs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch recent songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSongs();
  }, [getToken]);

  async function onClickPlay(song) {
    try {
      setPlayingId(song._id);

      await updateStreamUrl({
        streamUrl: song.streamUrl,
        title: song.title,
        thumbnailUrl: song.thumbnailUrl,
        channelTitle: song.channelTitle,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setPlayingId(null);
    }
  }

  if (loading) {
    return (
      <div className="!bg-zinc-950 !p-10 !text-zinc-400">
        Loading recent songs...
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="!bg-zinc-950 !p-10 !text-zinc-500">
        No recent songs found.
      </div>
    );
  }

  return (
    <div className="!bg-zinc-950 !p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-6">
        {songs.map((song, index) => (
          <div
            key={song.videoId || index}
            className="group border-gray-600 border !bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
          >
            {/* IMAGE SECTION */}
            <div className="relative">
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-full h-44 object-cover"
              />

              <button
                onClick={() => onClickPlay(song)}
                className={`absolute inset-0 flex items-center justify-center bg-black/50 transition
                  ${
                    playingId === song._id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
              >
                {playingId === song._id ? (
                  <img
                    src="/buffer.gif"
                    alt="loading"
                    className="w-12 h-12"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold shadow-xl">
                    ▶
                  </div>
                )}
              </button>
            </div>

            {/* TEXT SECTION */}
            <div className="!p-4 space-y-1">
              <div className="text-white font-semibold truncate text-[15px]">
                {song.title}
              </div>

              <div className="text-zinc-400 text-sm truncate">
                {song.channelTitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}