import React from "react";

export default function MyGroup() {
  const groups = [
    {
      id: 1,
      name: "Late Night Coders",
      description: "12 Members • Live",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    },
    {
      id: 2,
      name: "Gaming Squad",
      description: "8 Members • Offline",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    },
    {
      id: 3,
      name: "Study Together",
      description: "20 Members • Scheduled",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    },
  ];

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6">My Groups</h1> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:bg-zinc-700 transition shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={group.image}
                alt={group.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-zinc-800 shadow-lg"
              />

              <h2 className="text-lg font-semibold mt-4">{group.name}</h2>

              <p className="text-sm text-zinc-400 !mt-1">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}