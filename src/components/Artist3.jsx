import React from 'react'

const Artist3 = ({click_function}) => {
    return (
        <>
            <div class="top" style={{backgroundColor : "#db8531"}}>
                <div>
                    <img src="images/artist-3.jpeg" alt="img" class="pls" style={{boxShadow: "0px 3px 20px 16px #b38347" }} />
                </div>
                <div>
                    <h1>Arjit Singh</h1> <div>41,342,501 monthly listner</div>
                </div>

            </div>
            <section id="main">

                <h2>
                    Popular
                </h2>
                <div id="song-list">
                  
                        <div class="song-container" onClick={()=>click_function("Sajni Re")}>
                            <div class="song-infoo">1.</div>
                            <img src="song-images/sajni.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Sajni Re
                                </div>

                        </div>
                    

                        <div class="song-container" onClick={()=>click_function("Tijhe kitne Chahne Lage Hum")}>
                            <div class="song-infoo">2.</div>
                            <img src="song-images/tujhe kitna chahne lage.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Tijhe kitne Chahne Lage Hum
                                </div>

                        </div>
                    

                  

                        <div class="song-container" onClick={()=>click_function("Apna Bana Le")}>
                            <div class="song-infoo">3.</div>
                            <img src="song-images/apna bana le.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Apna Bana Le
                                </div>
                        </div>
                    
                  

                        <div class="song-container" onClick={()=>click_function(" Satranga")}>
                            <div class="song-infoo">4.</div>
                            <img src="song-images/santranga.jpeg" alt="img" class="song-img"/>
                                <div class="song-infoo">
                                    Satranga
                                </div>
                        </div>
                    
                </div>
            </section>
        </>
    )
}

export default Artist3