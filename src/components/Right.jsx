import React from 'react'
import ArtistCard from './ArtistCard'
import Album from './Album'
import Footer from './Footer'
import Trendings from './Trendings'
import RecentSongs from './RecentSongs'
import MyGroup from './MyGroup'
import Carousel from './Carousel'
const Right = ({ click_function }) => {
    return (
        <>
            <div className='!p-6'>
                <Carousel />
            </div>

            <br />
            <h2 className="text-3xl font-bold !m-2">Trendings </h2>
                <Trendings />


            <h2 className="text-3xl font-bold !m-2">Recent songs </h2>
                <RecentSongs />

            <h2 className="text-3xl font-bold !m-2">My Groups</h2>
                <MyGroup />

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
                <Album click_function={click_function} image={"images/your name.jpeg"} title={"Your Name "} class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                <Album click_function={click_function} image={"images/tokyo Ghoul.webp"} title={"tokyo Ghoul"} class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                <Album click_function={click_function} image={"images/suzume.jpg"} title={"Suzume "} class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                <Album click_function={click_function} image={"images/naruto.jpg"} title={"Blue Bird"} class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />
                <Album click_function={click_function} image={"images/hunter.jpg"} title={"Hunter X Hunter"} class1={"anime-card"} class2={"aime-info"} classimgae={"anime-imgae"} />


            </section>
            <section>
                <Footer />
            </section>

        </>
    )
}

export default Right