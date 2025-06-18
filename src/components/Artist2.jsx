import React from 'react'

const Artist2 = ({click_function}) => {
  return (
    <>
     <div class="top" style={{backgroundColor : "lightblue" }}>
        <div>
            <img src="images/artist-2.jpeg" alt="img"class="pls" style={{boxShadow: "0px 3px 20px 16px #a3b3b2"}}/>
        </div>
      
    <div>
            <h1>Sachin-Jigar</h1><div>41,342,501 monthly listner</div>
        </div>
        
    </div>
    <section id="main">
       
        <h2>
            Popular
        </h2>
        <div id="song-list">
           
                <div class="song-container" onClick={()=>click_function("Aaj ki rat")}>
                    <div class="song-infoo">1.</div>
                    <img src="song-images/ajj ki raat.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Aaj ki rat
                    </div>

                </div>
           
                <div class="song-container" onClick={()=>click_function(" Aayi nahi")}>
                    <div class="song-infoo">2.</div>
                    <img src="song-images/a yi nai.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Aayi nahi
                    </div>

                </div>
           
                <div class="song-container" onClick={()=>click_function("Khoobsurat")}>
                    <div class="song-infoo">3.</div>
                    <img src="song-images/khoobsurat.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Khoobsurat
                    </div>
                </div>
           
                <div class="song-container" onClick={()=>click_function("Tumhare hi rahenge hum")}>
                    <div class="song-infoo">4.</div>
                    <img src="song-images/tumhare hi raheng hum.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Tumhare hi rahenge hum
                    </div>
                </div>
          

                <div class="song-container" >onClick={()=>click_function("Apna bana le")}
                    <div class="song-infoo">5.</div>
                    <img src="song-images/apna bana le.jpeg" alt="img" class="song-img"/>
                    <div class="song-infoo">
                        Apna bana le 
                    </div>
                </div>
          

        </div>
    </section>
    </>
  )
}

export default Artist2