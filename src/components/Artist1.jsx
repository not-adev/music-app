import React from 'react'

const Artist1 = ({click_function}) => {
    return (
        <>
            <div class="top">
                <div>
                    <img src="images/artist-1.jpeg" alt="img" class="pls"/>
                </div>
                <div>
                    <h1>Pritam</h1>
                    <div>41,342,501 monthly listner</div>
                </div>

            </div>
            <section id="main">

                <h2>
                    Popular
                </h2>
                <div id="song-list">
                 
                        <div class="song-container" onClick={()=>click_function("Tum se hi")}>
                            <div class="song-infoo">1.</div>
                            <img src="song-images/tum-se-hi.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Tum se hi
                                </div>

                        </div>
                 
                  

                        <div class="song-container" onClick={()=>click_function("O Mahi")}>
                            <div class="song-infoo">2.</div>
                            <img src="song-images/maahi.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    O Mahi
                                </div>

                        </div>
                  

                   

                        <div class="song-container" onClick={()=>click_function("Shayad")}>
                            <div class="song-infoo">3.</div>
                            <img src="song-images/shayad.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Shayad
                                </div>
                        </div>
                 
                  

                        <div class="song-container" onClick={()=>click_function("Tera Hone Laga")}>
                            <div class="song-infoo">4.</div>
                            <img src="song-images/tera-hone laga.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Tera Hone Laga
                                </div>
                        </div>
                

                  
                        <div class="song-container" onClick={()=>click_function("Kesaria")}>
                            <div class="song-infoo">5.</div>
                            <img src="song-images/kesariya.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Kesaria
                                </div>
                        </div>
                  

                </div>
            </section>
        </>
    )
}

export default Artist1