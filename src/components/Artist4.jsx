import React from 'react'

const Artist4 = ({click_function}) => {
  return (
  <>
    <div class="top" style={{backgroundColor:"#23b9c7"}}>
        <div>
            <img src="images/artist-4.jpeg" alt="img" class="pls" style={{boxShadow : "0px 3px 20px 16px #cae3e2"}}/>
        </div>
        <div>
            <h1>A.R rehman</h1> <div>41,342,501 monthly listner</div>
        </div>
       
    </div>
    <section id="main">
 
        <h2>
            Popular
        </h2>
        <div id="song-list">
            
                <div class="song-container" onClick={()=>click_function("agar tum sath ho")}>
                    <div class="song-infoo">1.</div>
                    <img src="song-images/ar reham 2use.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Agar tum sath ho
                    </div>

                </div>
          
        

                <div class="song-container" onClick={()=>click_function("kabhi kabhi kabhi aditi")}>
                    <div class="song-infoo">2.</div>
                    <img src="song-images/ar reham 2use.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Kabhi Kabhi aditi
                    </div>

                </div>
            

          

                <div class="song-container"onClick={()=>click_function("Kun Faya kun")} >
                    <div class="song-infoo">3.</div>
                    <img src="song-images/kun faya kun.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Kun Faya kun
                    </div>
                </div>
          

                <div class="song-container" onClick={()=>click_function("Water Packet")}>  
                    <div class="song-infoo">4.</div>
                    <img src="song-images/water packet.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Water Packet
                    </div>
                </div>
            

           


        </div>
    </section>

  </>
  )
}

export default Artist4