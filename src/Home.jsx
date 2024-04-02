import React, { useEffect, useState } from "react";
//import YouTube from "react-youtube";
//import ReactPlayer from "react-player/lazy";
import Vimeo from "@u-wave/react-vimeo";
import { Tooltip, Toast, Popover } from "bootstrap";
import "./home.css";

export default function Home() {
  const [isVimeoSource, setIsVimeoSource] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row justify-content-center p-5 mt-5">
        <div className="col-md-12">
          <div className="video-container">
            <video className="full-screen-video" width="100%" playsInline autoPlay muted loop>
              <source src="https://res.cloudinary.com/dlf5gecrf/video/upload/v1658606508/benjaminkratzin-website/BenjaminKratzin_DirectorReel_220722_Desktop_858p_4Mbs_v01_g2ufkx.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
