import React, { useState } from "react";

export default function SearchGroupPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("name");

  const filters = ["name", "mode", "status"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Group</h1>

        {/* Search Container */}
        <form className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder={`Search by ${activeFilter}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-zinc-800 rounded-xl px-4 py-3 outline-none text-white placeholder:text-zinc-500"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
            >
              Search
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                Search by {filter}
              </button>
            ))}
          </div>
        </form>

        {/* Results Placeholder */}
        <div className="mt-8 grid gap-4">
          {[1, 2, 3].map((group) => (
            <div
              key={group}
              className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition"
            >
              <div className="text-lg font-semibold">Group {group}</div>
              <div className="text-zinc-400 text-sm mt-1">
                Mode: Public • Status: Live • 12 Members
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}