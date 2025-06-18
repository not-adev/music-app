import React from 'react'

const Artist5 = ({click_function}) => {
    return (
        <>
            <div class="top" style={{backgroundColor : "#e7f0f1"}}>
                <div>
                    <img src="images/artist-5.jpeg" alt="img" class="pls" style={{boxShadow : "0px 3px 20px 16px #a3b3b2"}} />
                </div>
                <div>
                    <h1>Aniruth</h1><div>41,342,501 monthly listner</div>
                </div>

            </div>
            <section id="main">

                <h2>
                    Popular
                </h2>
                <div id="song-list">
                  
                        <div class="song-container" onClick={()=>click_function(" Wishes")}>
                            <div class="song-info">1.</div>
                            <img src="song-images/wishes.jpg" alt="img" class="song-img"/>
                                <div class="song-info">
                                    Wishes
                                </div>

                        </div>
                  
                        <div class="song-container"  onClick={()=>click_function("Samjho Na")}>
                            <div class="song-info">2.</div>
                            <img src="song-images/samjho na.jpg" alt="img" class="song-img"/>
                                <div class="song-info">
                                    Samjho Na
                                </div>

                        </div>
                 

                   

                        <div class="song-container" onClick={()=>click_function(" one love")}>
                            <div class="song-info">3.</div>
                            <img src="song-images/one love.jpg" alt="img" class="song-img"/>
                                <div class="song-info">
                                    one love
                                </div>
                        </div>
                    
                   

                        <div class="song-container" onClick={()=>click_function("Ishq")}>
                            <div class="song-info">4.</div>
                            <img src="song-images/ishq.jpg" alt="img" class="song-img"/>
                                <div class="song-info">
                                    Ishq
                                </div>
                        </div>
                    




                </div>
            </section>
        </>
    )
}

export default Artist5