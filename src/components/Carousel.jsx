import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const url = "/genre";
const cards = [
  {
    id: 1,
    title: "PopHits",
    subtitle: "Chart-topping tracks everyone loves",
    image: `${url}/pop.jpg`,
  },
  {
    id: 2,
    title: "Phonk",
    subtitle: "Dark bass and drifting energy",
    image: `${url}/phonk.jpg`,
  },
  {
    id: 3,
    title: "Chill",
    subtitle: "Relaxed melodies for peaceful moments",
    image: `${url}/chill.jpg`,
  },
  {
    id: 4,
    title: "Indie",
    subtitle: "Fresh sounds from unique artists",
    image: `${url}/indie.jpg`,
  },
  {
    id: 5,
    title: "Romantic",
    subtitle: "Songs for love and late-night feels",
    image: `${url}/romantic.jpg`,
  },
  {
    id: 6,
    title: "Rock",
    subtitle: "Guitars, drums, and raw energy",
    image: `${url}/rock.jpg`,
  },
  {
    id: 7,
    title: "HipHop",
    subtitle: "Beats, bars, and nonstop flow",
    image: `${url}/hip hop.jpg`,
  },
  {
    id: 8,
    title: "Electronic",
    subtitle: "Synths and drops that hit hard",
    image: `${url}/electronic.jpg`,
  },
  {
    id: 9,
    title: "Lofi",
    subtitle: "Soft beats for study and focus",
    image: `${url}/lofi.jpg`,
  },
  {
    id: 10,
    title: "Sad",
    subtitle: "Emotional tracks for quiet nights",
    image: `${url}/sad.jpg`,
  },
  {
    id: 11,
    title: "Party",
    subtitle: "High-energy anthems to move to",
    image: `${url}/party.jpg`,
  },
];

export default function AutoCarousel() {
  const [active, setActive] = useState(0);
   const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div onClick={()=>navigate('/search-song')} className="w-full !p-7 overflow-hidden rounded-3xl bg-zinc-900 shadow-xl !p-2 md:!p-0">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {cards.map((item) => (
          <div key={item.id} className="min-w-full">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-[70%] h-72 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-[30%] text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {item.title}
                </h2>
                <p className="text-zinc-400 mt-2 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}