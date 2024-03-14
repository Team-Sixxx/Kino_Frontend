import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

export default function Home() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onReady = event => {
        event.target.playVideo();
        event.target.mute();
    };
    const nextVideo = event => {
        console.log("load video and slide to next trailer");
    };
    const viewMovie = event => {
        console.log("display movie and details on side");
    };

    return (
        <div className="home-container">
            <div className="box">
                <YouTube videoId="U2Qp5pL3ovA" opts={{ width: screenWidth, height: screenWidth*0.6 }} onReady={onReady}  onEnd={nextVideo} onPause={viewMovie}/>
                
            </div>
            <div style={{ 
              position: 'absolute',
              top: screenWidth/4,
              left: '2%',
              zIndex:111,
              background: 'rgba(0, 0, 0, 0.7)', 
              padding: '1rem',
              border: 'none',
              maxWidth: '20%', 
            }}>
             <h1 style={{ marginBottom: '0.5rem', fontSize: `1em` }}>DUNE 2</h1>
              <p style={{ marginBottom: '0', textAlign: 'center', fontSize: `0.5em` }}>Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.</p>
            </div>

        </div>
    );
}
