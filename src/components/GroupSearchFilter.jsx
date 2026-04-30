// GroupSearch.jsx
import React from "react";

export default function GroupSearch({
  query,
  setQuery,
  activeFilter,
  changeFilter,
  searchLiveGroups,
  searchByMode,
  handleSearch,
  handleModeSelect,
  loading,
}) {
  const filters = ["name", "mode", "live"];
  const modes = ["HOST", "FREE", "VOTING"];

  return (
    <form
      onSubmit={handleSearch}
      className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-3xl !p-6 shadow-2xl space-y-5"
    >
      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const onClickFunction =
            filter === "live"
              ? () => searchLiveGroups(filter)
              : () => changeFilter(filter);

          return (
            <button
              key={filter}
              type="button"
              onClick={onClickFunction}
              className={`!px-5 !py-2.5 rounded-2xl font-medium capitalize border ${
                activeFilter === filter
                  ? "bg-red-500 text-black border-red-400"
                  : "bg-zinc-800 text-zinc-300 border-zinc-700"
              }`}
            >
              Search by {filter}
            </button>
          );
        })}
      </div>

      {/* NAME SEARCH */}
      {activeFilter === "name" && (
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            placeholder="Search by name..."
            className="flex-1 bg-zinc-800 rounded-xl !px-4 !py-3 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="!px-6 !py-3 bg-red-500 text-black rounded-xl"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      )}

      {/* MODE SEARCH */}
      {activeFilter === "mode" && (
        <div className="space-y-4 !s">
          <div className="flex gap-3 flex-wrap">
            {modes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeSelect(mode)}
                className={`!px-5 !m-1 !py-2 rounded-xl ${
                  query === mode
                    ? "bg-red-500 text-black"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={!query || loading}
            onClick={searchByMode}
            className="!px-6 !py-3 bg-red-500 text-black rounded-xl"
          >
            Search by Mode
          </button>
        </div>
      )}
    </form>
  );
}