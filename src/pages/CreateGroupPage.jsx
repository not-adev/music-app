import React, { useState } from "react";

export default function CreateGroupPage() {

    const moods = [
        { value: "chill", label: "Chill 😌" },
        { value: "party", label: "Party 🎉" },
        { value: "sad", label: "Sad 😢" },
        { value: "workout", label: "Workout 💪" },
        { value: "romantic", label: "Romantic ❤️" },
        { value: "focus", label: "Focus 🧠" },
    ];
    const [groupName, setGroupName] = useState("");
    const [mood, setMood] = useState("chill");
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const groupData = {
            name: groupName,
            mood,
            isPrivate,
        };

        console.log("Creating group:", groupData);

        // TODO: send to backend or socket
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 !px-4">
            <div className="w-full  bg-zinc-900 rounded-2xl !p-6 shadow-xl border border-white/10">

                {/* Title */}
                <h1 className="text-2xl font-bold text-white !mb-6 text-center">
                    Create a Group 🎧
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Group Name */}
                    <div>
                        <label className="text-sm text-zinc-400">Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Enter group name"
                            className="w-full !mt-1 !px-4 !py-3 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    {/* Mood */}
                    <div>
                        <label className="text-sm text-zinc-400">Group Mood</label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                            {moods.map((m) => (
                                <button
                                    key={m.value}
                                    type="button"
                                    onClick={() => setMood(m.value)}
                                    className={`!px-3 !py-2 rounded-xl text-sm font-medium transition border
          ${mood === m.value
                                            ? "bg-red-600 text-black border-red-400"
                                            : "bg-zinc-800 text-white border-transparent hover:bg-zinc-700"
                                        }
        `}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Privacy Toggle */}
                    <div className="flex items-center justify-between bg-zinc-800 !p-4 rounded-xl">
                        {/* <div className=""> */}

                        <div className=" text-white text-sm">
                            Private Group
                            <div>
                                Allow any one to become a member of group
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`w-12 h-6 flex items-center rounded-full !p-1 transition ${isPrivate ? "bg-red-600" : "bg-zinc-600"
                                }`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full transform transition ${isPrivate ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>
                    {/* </div> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full !py-3 rounded-xl bg-red-600 hover:bg-red-500 text-black font-semibold transition"
                    >
                        Create Group
                    </button>
                </form>
            </div>
        </div>
    );
}