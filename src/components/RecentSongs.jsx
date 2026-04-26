import React from "react";
import { useSong } from "../context/SongContext";

export default function RecentSongs() {
  const { history, updateStreamUrl } = useSong();

  if (!history || history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        No recent songs yet 🎵
      </div>
    );
  }

  return (
    <div className=" bg-zinc-950 !p-9">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {history.map((song, index) => (
          <div
            key={index}
            className="group bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:bg-zinc-800 transition"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-full h-40 object-cover"
              />

              {/* overlay play button */}
              <button
                onClick={() => updateStreamUrl(song)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white  text-xl font-bold">
                  ▶
                </div>
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-1">
              <div className="text-white font-semibold truncate">
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