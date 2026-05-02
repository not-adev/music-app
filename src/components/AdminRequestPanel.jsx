import React from "react";

export default function AdminRequestPanel({
  isOpen,
  onClose,
  requests = [],
  onAccept,
  onReject,
  requestLoading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      {/* Modal Box */}
      <div className="!w-[90%] max-w-2xl !bg-zinc-900 rounded-2xl shadow-2xl !p-6">

        {/* Header */}
        <div className="flex justify-between items-center !mb-4">
          <h2 className="text-white text-xl font-bold">
            Pending Requests
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Request List */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto !pr-2">
          {requests.length === 0 ? (
            <p className="text-zinc-500">No pending requests</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="!bg-zinc-800 rounded-xl !p-4 flex items-center justify-between"
              >
                {/* Request Info */}
                <div>
                  <p className="text-white font-semibold" >
                    {req.username || "Unknown user"}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {req.email || "Requesting to join "}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onAccept(req)}
                    disabled={requestLoading.userId === req._id}
                    className="!px-4 !py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg text-sm"
                  >
                    {requestLoading.userId === req._id &&
                      requestLoading.action === "accept"
                      ? "Accepting..."
                      : "Accept"}
                  </button>

                  <button
                    onClick={() => onReject(req)}
                    disabled={requestLoading.userId === req._id}
                    className="!px-4 !py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg text-sm"
                  >
                    {requestLoading.userId === req._id &&
                      requestLoading.action === "reject"
                      ? "Rejecting..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}