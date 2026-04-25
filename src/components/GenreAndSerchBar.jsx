export default function GenreAnadSearchaBar({SearchGenerFunction}) {
    const url = '/genre'
    const cards = [
        { title: 'Pop Hits', image: `${url}/pop.jpg` },
        { title: 'Phonk', image: `${url}/phonk.jpg` },
        { title: 'Chill', image: `${url}/chill.jpg` },
        { title: 'Indie', image: `${url}/indie.jpg` },
        { title: 'Romantic', image: `${url}/romantic.jpg` },
        { title: 'Rock', image: `${url}/rock.jpg` },
        { title: 'Hip Hop', image: `${url}/hip hop.jpg` },
        { title: 'Electronic', image: `${url}/electronic.jpg` },
        { title: 'Lofi', image: `${url}/lofi.jpg` },
        { title: 'Sad', image: `${url}/sad.jpg` },
        { title: 'Party', image: `${url}/party.jpg` },

    ];
    return (
        <div className="max-w-6xl mx-auto space-y-6">
                {/* Grid Rows */}
            <div className="!px-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        onClick={()=>SearchGenerFunction(card.title)}
                        key={index}
                        className="relative h-40 transition-all duration-150  rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 w-full  h-full  object-cover blur-[px] scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-1  text-white text-2xl font-bold">
                            {card.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}