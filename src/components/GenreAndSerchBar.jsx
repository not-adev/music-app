import React, { useState } from "react";
import axios from "axios";

export default function GenreAnadSearchaBar({onClickPlay}) {
    const url = "/genre";
    const [loadingGenre, setLoadingGenre] = useState(null);

    const cards = [
        { title: "PopHits", image: `${url}/pop.jpg` },
        { title: "Phonk", image: `${url}/phonk.jpg` },
        { title: "Chill", image: `${url}/chill.jpg` },
        { title: "Indie", image: `${url}/indie.jpg` },
        { title: "Romantic", image: `${url}/romantic.jpg` },
        { title: "Rock", image: `${url}/rock.jpg` },
        { title: "HipHop", image: `${url}/hiphop.jpg` },
        { title: "Electronic", image: `${url}/electronic.jpg` },
        { title: "Lofi", image: `${url}/lofi.jpg` },
        { title: "Sad", image: `${url}/sad.jpg` },
        { title: "Party", image: `${url}/party.jpg` },
    ];


    const handleGenreClick = async (genre) => {
        try {
            setLoadingGenre(genre);
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.get(
                `${backendUrl}/search/genre/${genre}`
            );

            console.log("Genre Songs:", res.data);
            onClickPlay(res.data.data)
           

        } catch (err) {
            console.error("Genre fetch failed:", err);
        } finally {
            setLoadingGenre(null);
        }
    };

    return (
        <div className="max-w mx-auto space-y-6">
            <div className="px-2 grid grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card, index) => {
                    const isLoading = loadingGenre === card.title;

                    return (
                        <div
                            onClick={() => handleGenreClick(card.title)}
                            key={index}
                            className="relative h-40 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center cursor-pointer"
                        >
                            {/* Image */}
                            <img
                                src={card.image}
                                alt={card.title}
                                className={`absolute inset-0 w-full h-full object-cover scale-110 transition ${isLoading ? "blur-md brightness-50" : ""
                                    }`}
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/40" />

                            {/* Loading State */}
                            {isLoading ? (
                                <div className="relative z-10 flex flex-col items-center">
                                    <img
                                        src="/buffer.gif"
                                        alt="loading"
                                        className="w-full h-full "
                                    />
                                  
                                </div>
                            ) : (
                                <div className="relative z-10 text-white text-2xl font-bold">
                                    {card.title}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}