import React from "react";
import { useGroup } from "../context/GroupContext";
import { socket } from "../socket";
import { useSong } from "../context/SongContext";
export default function InsideAgroup() {
  const { liveGroup, updateLiveGroup ,clearLiveGroup} = useGroup()
  const {isInGroup ,reset} = useSong()
  const handleLeave = () => {
    socket.emit("room:leave" ,{} , ()=>{
        reset(false)
        clearLiveGroup()
    })
  };

  if(!isInGroup) return null 

  return (
    <div className="fixed bottom-1/2 right-7 -translate-x-1/2 z-50">
      <details className="group relative">
        <div className="absolute !mt-3 w-80 left-1/2 -translate-x-1/2 rounded-2xl bg-white shadow-2xl border !p-4">
          <h3 className="text-lg font-semibold !mb-2">Current Room</h3>
          <div className="space-y-1 text-sm text-gray-700 !mb-4">
            <p><strong>Group:</strong> {liveGroup?.name || 'Abcd' }</p>
            <p><strong>Session ID:</strong> {liveGroup?.sessionId || "jkjiistw5625"}</p>
          </div>

          <button
            onClick={handleLeave}
            className="w-full rounded-xl bg-red-500 text-white !py-2 font-medium hover:bg-red-600 transition"
          >
            Leave Room
          </button>
        </div>
        <summary className="list-none cursor-pointer rounded-full bg-green-600 text-white !px-5 !py-3 shadow-xl hover:bg-green-700 transition flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          Live in Group
        </summary>

      </details>
    </div>
  );
}
