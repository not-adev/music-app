import React, { useState } from "react";

export default function SearchGroupPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("name");

  const filters = ["name", "mode", "status"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white !p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold !mb-8 bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
          Search Groups
        </h1>

        {/* Search Container */}
        <form className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-3xl !p-6 shadow-2xl space-y-5">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder={`Search by ${activeFilter}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-zinc-800/80 rounded-2xl !px-5 !py-4 outline-none text-white placeholder:text-zinc-500 border border-zinc-700 focus:border-red-400 transition"
            />

            <button
              type="submit"
              className="!px-8 !py-4 rounded-2xl bg-red-500 text-black font-semibold hover:bg-red-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-red-500/20"
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
                className={`!px-5 !py-2.5 rounded-2xl font-medium capitalize transition-all duration-200 border ${
                  activeFilter === filter
                    ? "bg-red-500 text-black border-red-400 shadow-lg shadow-red-500/20"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                }`}
              >
                Search by {filter}
              </button>
            ))}
          </div>
        </form>

        {/* Results */}
        <div className="!mt-10 grid gap-5">
          {[1, 2, 3].map((group) => (
            <div
              key={group}
              className="group rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-red-400/40 hover:bg-zinc-800/90 transition-all duration-300 !p-6 shadow-lg hover:shadow-red-500/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-red-400 transition">
                    Group {group}
                  </h2>
                  <p className="text-zinc-400 text-sm !mt-2">
                    Mode: Public • Status: Live • 12 Members
                  </p>
                </div>

                <button className="!px-5 !py-2 rounded-xl bg-zinc-800 text-sm text-zinc-300 hover:bg-red-500 hover:text-black transition">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}