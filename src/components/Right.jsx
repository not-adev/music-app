import React from 'react'
import ArtistCard from './ArtistCard'
import Album from './Album'
import Footer from './Footer'

const Right = ({click_function}) => {
    return (
        <>
           
                <h2 className="heading-polular-artist">Popular artist </h2>
                <section className='popular-artist'>
                    <ArtistCard name="pritam"  image={"images/artist-1.jpeg"} link={"/artist1"} />
                    <ArtistCard name="" image={"images/artist-2.jpeg"} link={"/artist2"} />
                    <ArtistCard name="Arjit singh" image={"images/artist-3.jpeg"} link={"/artist3"} />
                    <ArtistCard name="AR Rehman" image={"images/artist-4.jpeg"} link={"/artist4"} />
                    <ArtistCard name="Atif Aslam" image={"images/artist-5.jpeg"} link={"/artist5"} />

                </section><br />

                <br />
                <h2 className="heading-polular-artist">Album </h2>

                <section className="anime">
                    <Album click_function={click_function} image={"images/album-1.jpeg"} title={"Tum hi ho"} class1={"anime-card"} classimgae={"anime-imgae"} class2={"aime-info"} />
                    <Album click_function={click_function} image={"images/album-2.jpeg"} title={"payal"} class1={"anime-card"} classimgae={"anime-imgae"} class2={"aime-info"} />
                    <Album click_function={click_function} image={"images/album-3.jpeg"} title={"Jo tum mere ho"} class1={"anime-card"} classimgae={"anime-imgae"} class2={"aime-info"} />
                    <Album click_function={click_function} image={"images/album-4.jpeg"} title={"Ashiqi 2"} class1={"anime-card"} classimgae={"anime-imgae"} class2={"aime-info"} />
                    <Album click_function={click_function} image={"images/album-5.jpeg"} title={"Ye jawani hai dwani"} class1={"anime-card"} classimgae={"anime-imgae"} class2={"aime-info"} />

                </section><br />

                <br />
                <h2 className="heading-polular-artist">Anime </h2>
                <section className='anime'>
                    <Album click_function={click_function} image={"images/your name.jpeg"}   title={"Your Name "}       class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                    <Album click_function={click_function} image={"images/tokyo Ghoul.webp"} title={"tokyo Ghoul"}      class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                    <Album click_function={click_function} image={"images/suzume.jpg"}       title={"Suzume "}          class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                    <Album click_function={click_function} image={"images/naruto.jpg"}       title={"Blue Bird"}        class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                    <Album click_function={click_function} image={"images/hunter.jpg"}       title={"Hunter X Hunter"}  class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />


                </section>
                <h2 className="heading-polular-artist">Foooter </h2>

                <section>
                    <Footer />
                </section>
           
        </>
    )
}

export default Right