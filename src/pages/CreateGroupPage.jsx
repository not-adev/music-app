import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";

export default function CreateGroupPage() {
    const { getToken } = useAuth();

    const mods = [
        { value: "HOST", label: "Host😌" },
        { value: "FREE", label: "Free 🎉" },
        { value: "VOTING", label: "VOTING 👌" },
    ];

    const [groupName, setGroupName] = useState("");
    const [mode, setMode] = useState("HOST");
    const [isPrivate, setIsPrivate] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupData = {
            name: groupName,
            mode,
            isPrivate,
        };

        try {
            setLoading(true);
            const token = await getToken();

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.post(
                `${backendUrl}/groupCrud/create`,
                groupData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data.data);
        } catch (err) {
            console.error("Failed to create group:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" w-full flex items-center justify-center bg-zinc-950 !px-4">
            <div className="w-full bg-zinc-900 rounded-2xl !p-6 shadow-xl border border-white/10">
                <div className="text-5xl font-bold text-white !mb-6 text-center">
                    Create a Group 🎧
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-zinc-400">Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Enter group name"
                            className="w-full !mt-1 !px-4 !py-3 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="!mb-5">
                        <label className="text-sm text-zinc-400">Group Mod</label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 !mt-2">
                            {mods.map((m) => (
                                <button
                                    key={m.value}
                                    type="button"
                                    onClick={() => setMode(m.value)}
                                    disabled={loading}
                                    className={`!px-3 !py-2 rounded-xl text-sm font-medium transition border
                                    ${
                                        mode === m.value
                                            ? "bg-red-600 text-black border-red-400"
                                            : "bg-zinc-800 text-white border-transparent hover:bg-zinc-700"
                                    }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-zinc-800 !p-4 rounded-xl">
                        <div className="text-white text-sm">
                            Private Group
                            <div>Allow any one to become a member of group</div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsPrivate(!isPrivate)}
                            disabled={loading}
                            className={`w-12 h-6 flex items-center rounded-full !p-1 transition
                            ${isPrivate ? "bg-red-600" : "bg-zinc-600"}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full transform transition
                                ${isPrivate ? "translate-x-6" : ""}`}
                            />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full !py-3 rounded-xl font-semibold transition
                        ${
                            loading
                                ? "bg-zinc-600 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-500 text-black"
                        }`}
                    >
                        {loading ? "Creating Group..." : "Create Group"}
                    </button>
                </form>
            </div>
        </div>
    );
}