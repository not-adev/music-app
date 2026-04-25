import React from "react";

const RenderSearchSongs = ({ songs, onPlay }) => {
  const dummySongs = [
    {
      id: "1",
      title: "Blinding Lights",
      channelTitle: "The Weeknd",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    },
    {
      id: "2",
      title: "Starboy",
      channelTitle: "The Weeknd",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300",
    },
    {
      id: "3",
      title: "Levitating",
      channelTitle: "Dua Lipa",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?w=300",
    },
  ];

  const songsToRender = songs?.length ? songs : dummySongs;

  return (
    <div className="grid gap-4">
      {songsToRender.map((song) => (
        <div
          key={song.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 !p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition"
        >
          {/* Song Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <img
              src={song.thumbnailUrl}
              alt={song.title}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
            />

            <div className="min-w-0">
              <div className="text-white font-semibold truncate">
                {song.title}
              </div>
              <div className="text-zinc-400 text-sm truncate">
                {song.channelTitle}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => onPlay?.(song)}
              className="flex-1 sm:flex-none !px-4 !py-2 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400"
            >
              Play
            </button>

            <button
              onClick={() => onPlay?.(song)}
              className="flex-1 sm:flex-none !px-4 !py-2 rounded-xl bg-zinc-700 text-white font-semibold hover:bg-zinc-600"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderSearchSongs;