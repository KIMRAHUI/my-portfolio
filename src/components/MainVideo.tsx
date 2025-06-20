import { useEffect, useState } from 'react';
import './MainVideo.css';
import mainVideo from '../assets/main-video.mp4';
import mainVideoVertical from '../assets/main-video-vertical.mp4';

export default function MainVideo() {
  const [videoSrc, setVideoSrc] = useState(mainVideo);

  useEffect(() => {
    const updateVideo = () => {
      const isVertical = window.innerHeight > window.innerWidth;
      setVideoSrc(isVertical ? mainVideoVertical : mainVideo);
    };
    updateVideo();
    window.addEventListener('resize', updateVideo);
    return () => window.removeEventListener('resize', updateVideo);
  }, []);

  return (
    <section id="main-video" className="main-video">
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        당신의 브라우저는 영상을 지원하지 않아요 😢
      </video>
    </section>
  );
}
