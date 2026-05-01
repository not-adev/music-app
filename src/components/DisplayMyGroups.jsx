import React from "react";

export default function DisplayMyGroups({
  group,
  onDelete,
  onToggleLive,
  onManageRequests,
  onEdit,
}) {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-white/10 !p-6 shadow-xl hover:border-red-500/30 transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold truncate">{group.name}</h2>

        <span
          className={`text-xs !px-3 !py-1 rounded-full font-medium
          ${
            group.live
              ? "bg-green-500/20 text-green-400"
              : "bg-zinc-700 text-zinc-300"
          }`}
        >
          {group.live ? "LIVE" : "OFFLINE"}
        </span>
      </div>

      {/* Details */}
      <div className="!mt-4 text-sm text-zinc-400">
        Mode: <span className="text-white">{group.mode}</span>
      </div>

      <div className="!mt-2 text-sm text-zinc-400">
        Members: <span className="text-white">{group.members?.length || 0}</span>
      </div>

      <div className="!mt-2 text-sm text-zinc-400">
        Pending Requests:{" "}
        <span className="text-yellow-400 font-medium">
          {group.requests?.length || 0}
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 !gap-3 !mt-6">
        <button
          onClick={() => onManageRequests(group)}
          className="!py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold"
        >
          Requests
        </button>

        <button
          onClick={() => onToggleLive(group._id ,group.live )}
          className={`!py-2 rounded-xl font-semibold
          ${
            group.live
              ? "bg-yellow-600 hover:bg-yellow-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {group.live ? "End Live" : "Go Live"}
        </button>

        <button
          onClick={() => onEdit(group)}
          className="!py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(group._id)}
          className="!py-2 rounded-xl bg-red-600 hover:bg-red-500 font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}