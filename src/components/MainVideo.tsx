import { useEffect, useState } from 'react';
import './MainVideo.css';

// 가로/세로 화면에 따라 다른 영상 소스를 불러옴
import mainVideo from '../assets/main-video.mp4';
import mainVideoVertical from '../assets/main-video-vertical.mp4';

export default function MainVideo() {
  const [videoSrc, setVideoSrc] = useState(mainVideo); // 현재 영상 소스 상태

  useEffect(() => {
    // 화면 방향에 따라 영상 소스 선택
    const updateVideo = () => {
      const isVertical = window.innerHeight > window.innerWidth;
      setVideoSrc(isVertical ? mainVideoVertical : mainVideo);
    };

    updateVideo(); // 초기 렌더링 시 실행
    window.addEventListener('resize', updateVideo); // 창 크기 변경 감지

    return () => window.removeEventListener('resize', updateVideo); // 이벤트 제거
  }, []);

  return (
    <section id="main-video" className="main-video">
      <video
        key={videoSrc} // 소스 변경 시 자동재생 유지
        className="video-bg"
        autoPlay // 자동 재생
        loop // 반복 재생
        muted={true} // 음소거 (모바일 자동재생 필수)
        playsInline // iOS 인라인 재생
      >
        <source src={videoSrc} type="video/mp4" />
        당신의 브라우저는 영상을 지원하지 않아요
      </video>
    </section>
  );
}
