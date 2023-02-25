import React, { useRef, useState } from "react";
import styles from "./VideoPlayer.module.scss";
import videoDani from "./../../../media/VideoAdOficialFullHD.mp4";
import playButton from "./playButton.svg";
import pauseButton from "./pauseButton.svg";
import { useSenseScreen } from "../../hooks/senseHook/useScrollSense";
const videoWEBM =
  "https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/ProductPoster%2FMobileAd.webm?alt=media&token=c3cd5a52-744a-4bb7-bde4-12881b3feed3";
const VideoPlayer = () => {
  let video =
    "https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/ProductPoster%2FMobileAd.mp4?alt=media&token=bf2d1099-6f8b-434f-b195-67ab9abb0402";

  const vidRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [videoState, setVideoState] = useState<"playing" | "paused">("paused");
  const [showButton, setShowButton] = useState<boolean>(true);
  // const [volume, setVolume] = useState<string>("0");
  // useSenseScreen(videoContainerRef, window.location.pathname, () => {
  //   if (vidRef.current) {
  //     if (videoState === "paused") {
  //       vidRef.current.play();
  //       setVideoState("playing");
  //       setTimeout(() => {
  //         setShowButton(false);
  //       }, 1500);
  //     }
  //   }
  //   console.log("firing");
  // });
  //We need to draw some progressive loading before doing this,
  //because when Product Title and Picture load, it will be display:none, which means
  //the Video will appear at top => resulting in Video Player to be triggered to play.

  const handlePlayVideo = () => {
    if (vidRef.current) {
      if (videoState === "paused") {
        vidRef.current.play();

        setVideoState("playing");
        setTimeout(() => {
          setShowButton(false);
        }, 3000);
      } else {
        vidRef.current.pause();
        setVideoState("paused");
      }
    }
  };

  // const goFullScreen = () => {
  //   if (vidRef.current) vidRef.current.requestFullscreen();
  // };

  // const changeVolume = () => {
  //   if (vidRef.current) vidRef.current.volume = parseInt(volume) / 100;
  // };

  const hidePlayButton = () => {
    return videoState !== "paused" ? setShowButton(false) : null;
  };

  const showPlayButton = () => {
    setShowButton(true);
  };

  return (
    <>
      <div ref={videoContainerRef} className={styles.videoPlayer}>
        <video
          poster="https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/ProductPoster%2FposterBre.jpg?alt=media&token=7a59e0b0-803d-4fac-bb90-035b67a4f912"
          muted
          playsInline
          loop
          onMouseLeave={hidePlayButton}
          onMouseEnter={showPlayButton}
          ref={vidRef}
          id="video1"
          className={styles.oasisVideo}
          // autoPlay
          onPause={() => {
            setVideoState("paused");
            setShowButton(true);
          }}
          onPlaying={() => {
            setVideoState("playing");
          }}
          onEnded={() => {
            setVideoState("paused");
            setShowButton(true);
          }}
          // onLoadStart={() => (vidRef.current.volume = 0.75)}
          onClick={() => {
            handlePlayVideo();
          }}
        >
          <source src={video} type="video/mp4" />
          <source src={videoWEBM} type="video/webm" />
          Nu exista sursa video
        </video>
        {showButton ? (
          <img
            onMouseLeave={hidePlayButton}
            onMouseEnter={showPlayButton}
            className={styles.playButton}
            src={videoState === "paused" ? playButton : pauseButton}
            onClick={() => {
              handlePlayVideo();
            }}
          />
        ) : null}
        <div className={styles.videoButtons}>
          {/* <input
          className={styles.volumeSlider}
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <img
          onMouseLeave={hidePlayButton}
          onMouseEnter={showPlayButton}
          onClick={goFullScreen}
          src={playButton}
          className={styles.fullScreenButton}
        /> */}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
