import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";

export default function MyGroup() {
  const { getToken } = useAuth();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = await getToken();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.get(
          `${backendUrl}/groupCrud/getGroups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGroups(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Groups...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white !p-6">
      <div className="max-w-7xl !mx-auto">
        <h1 className="text-3xl font-bold !mb-8">My Groups</h1>

        {groups.length === 0 ? (
          <div className="text-zinc-400 text-center text-lg">
            You are not in any groups yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 !gap-6">
            {groups.map((group) => (
              <div
                key={group._id}
                className="rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-lg !p-6 shadow-xl hover:scale-[1.02] hover:border-red-500/40 transition-all duration-300"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold truncate">
                    {group.name}
                  </h2>

                  <div className="flex flex-col items-end !gap-2">
                    <span
                      className={`text-xs !px-3 !py-1 rounded-full font-medium
            ${group.publicPrivate
                          ? "bg-red-500/20 text-red-400"
                          : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {group.publicPrivate ? "Private" : "Public"}
                    </span>

                    <span
                      className={`text-xs !px-3 !py-1 rounded-full font-semibold
            ${group.live
                          ? "bg-green-500/20 text-green-400"
                          : "bg-zinc-700 text-zinc-300"
                        }`}
                    >
                      {group.live ? "● LIVE" : "● OFFLINE"}
                    </span>
                  </div>
                </div>

                {/* Mode */}
                <div className="!mt-4 flex items-center !gap-2">
                  <span className="text-zinc-400 text-sm">Mode:</span>
                  <span className="!px-2 !py-1 rounded-lg bg-zinc-800 text-sm font-medium">
                    {group.mode}
                  </span>
                </div>

                {/* Members */}
                <div className="!mt-3 flex items-center !gap-2">
                  <span className="text-zinc-400 text-sm">Members:</span>
                  <span className="text-white font-medium">
                    {group.members?.length || 0}
                  </span>
                </div>

                {/* Created Date */}
                <div className="!mt-4 text-xs text-zinc-500">
                  Created {new Date(group.createdAt).toLocaleDateString()}
                </div>

                <button
                  disabled={!group.live}
                  className={`w-full !mt-5 !py-2 rounded-xl font-semibold transition
    ${group.live
                      ? "bg-red-600 hover:bg-red-500 text-black cursor-pointer"
                      : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    }`}
                >
                  {group.live ? "Join Group" : "Group Offline"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}