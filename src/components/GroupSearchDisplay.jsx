import React, { useState } from "react";

export default function GroupList({ groups, loading, handleToGroup }) {
  const [joiningId, setJoiningId] = useState(null);

  const handleJoinClick = async (groupId) => {
    try {
      setJoiningId(groupId);
      await handleToGroup(groupId);
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="!mt-10 grid gap-6">
      {!loading && groups.length === 0 && (
        <div className="text-zinc-500 text-center !py-12 text-lg">
          No groups found
        </div>
      )}

      {groups.map((group) => {
        const isJoining = joiningId === group._id;

        return (
          <div
            key={group._id}
            className="group bg-zinc-900/90 border border-zinc-800 rounded-3xl !p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:border-red-400/40 hover:bg-zinc-800/90 transition-all duration-300 shadow-lg hover:shadow-red-500/10"
          >
            {/* LEFT */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white group-hover:text-red-400 transition">
                {group.name}
              </h2>

              <p className="text-xs text-zinc-500 font-mono">
                ID: {group._id}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-zinc-400 !mt-2">
                <span className="bg-zinc-800 !px-3 !py-1 rounded-xl">
                  Mode: {group.mode}
                </span>

                <span
                  className={`!px-3 !py-1 rounded-xl ${
                    group.live
                      ? "bg-green-500/20 text-green-400"
                      : "bg-zinc-700 text-zinc-400"
                  }`}
                >
                  {group.live ? "● Online" : "Offline"}
                </span>

                <span className="bg-zinc-800 !px-3 !py-1 rounded-xl">
                  {group.members?.length || 0} Members
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleJoinClick(group._id)}
                disabled={isJoining}
                className={`!px-6 !py-2.5 rounded-xl font-medium transition-all duration-200 shadow-md ${
                  isJoining
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-red-500 text-black hover:bg-red-400 hover:scale-[1.03] active:scale-[0.97] shadow-red-500/20"
                }`}
              >
                {isJoining ? "Joining..." : "Follow"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}