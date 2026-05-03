import React, { useState } from "react";
import axios from "axios";
import playSong from "../utilities/playSong";
import { useSong } from "../context/SongContext";
import getStreamUrl from "../utilities/getStreamUrl";
import { socket } from "../socket";
const RenderSearchSongs = ({ songs = [] }) => {
    const [loadingId, setLoadingId] = useState(null);
    const [loadingAddButton, setLoadingAddButton] = useState(null)
    const { updateStreamUrl, addToQueue, isInGroup } = useSong();
    const handlePlay = async (song) => {
        const videoId = song?.id?.videoId || song?.id;
        try {
            setLoadingId(videoId);
            const newObject = {
                videoId: videoId,
                title: song?.snippet?.title,
                thumbnailUrl:
                    song?.snippet?.thumbnails?.high?.url ||
                    song?.snippet?.thumbnails?.medium?.url ||
                    song?.snippet?.thumbnails?.default?.url,
                channelTitle: song?.snippet?.channelTitle,
            };
            await playSong(newObject, updateStreamUrl, isInGroup)
        } catch (err) {
            console.error("Failed to play song:", err);
        } finally {
            setLoadingId(null);
        }
    };

    const addingToQueue = async (song) => {
        const videoId = song?.id?.videoId || song?.id;

        try {
            setLoadingAddButton(videoId);

            const newObject = {
                videoId,
                title: song?.snippet?.title,
                thumbnailUrl:
                    song?.snippet?.thumbnails?.high?.url ||
                    song?.snippet?.thumbnails?.medium?.url ||
                    song?.snippet?.thumbnails?.default?.url,
                channelTitle: song?.snippet?.channelTitle,
            };

            const newSong = await getStreamUrl(newObject);

            const isAdded = addToQueue(newSong);

            if (!isAdded) {
                alert("Queue can only have max 5 songs");
                return;
            }

        } catch (error) {
            console.error("Failed to add song:", error);
        } finally {
            setLoadingAddButton(null);
        }
    };

    const addToGroup = ()=>{
        socket.emit("")
    }

    return (
        <div className="grid gap-4 w-full">
            {songs.map((song) => {
                const videoId = song?.id?.videoId || song?.id;

                const thumbnailUrl =
                    song?.snippet?.thumbnails?.high?.url ||
                    song?.snippet?.thumbnails?.medium?.url ||
                    song?.snippet?.thumbnails?.default?.url ||
                    "";

                const title = song?.snippet?.title || "Untitled";
                const channelTitle = song?.snippet?.channelTitle || "Unknown channel";

                const isLoading = loadingId === videoId;
                const bufferAdd = loadingAddButton == videoId

                return (
                    <div
                        key={videoId}
                        className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 !p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition overflow-hidden"
                    >
                        {/* Song Info */}
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                            <img
                                src={thumbnailUrl}
                                alt={title}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
                            />

                            <div className="min-w-0 flex-1">
                                <div className="text-white font-semibold truncate">
                                    {title}
                                </div>
                                <div className="text-zinc-400 text-sm truncate">
                                    {channelTitle}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        { !isInGroup &&
                            <div className="flex gap-2 w-full sm:w-auto shrink-0">
                                <button
                                    onClick={() => handlePlay(song)}
                                    disabled={isLoading}
                                    className="!px-4 !py-2 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-50"
                                >
                                    {isLoading ? "Loading..." : "Play"}
                                </button>

                                <button onClick={() => addingToQueue(song)} className="!px-4 !py-2 rounded-xl bg-zinc-700 text-white font-semibold hover:bg-zinc-600">
                                    {bufferAdd ? "Loading..." : "Add"}
                                </button>
                            </div>
                        }
                        { isInGroup ? 
                            <div className="flex gap-2 w-full sm:w-auto shrink-0">
                                <button onClick={() => addToGroup(song)} className="!px-4 !py-2 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-900">
                                    {bufferAdd ? "Loading..." : "Add To Group"}
                                </button>
                            </div> : ""
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default RenderSearchSongs;