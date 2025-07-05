import { useEffect, useState } from 'react';
import './MainVideo.css';

/* 가로/세로 화면에 따라 분기되는 비디오 소스 import */
import mainVideo from '../assets/main-video.mp4';
import mainVideoVertical from '../assets/main-video-vertical.mp4';

export default function MainVideo() {
  /* 현재 선택된 영상 소스 상태 */
  const [videoSrc, setVideoSrc] = useState(mainVideo);

  /* 컴포넌트 마운트 시 및 창 크기 변경 시 비디오 소스 갱신 */
  useEffect(() => {
    /* 화면 방향에 따라 적절한 영상 선택 */
    const updateVideo = () => {
      const isVertical = window.innerHeight > window.innerWidth;
      setVideoSrc(isVertical ? mainVideoVertical : mainVideo);
    };

    updateVideo(); /* 초기 렌더 시 영상 설정 */
    window.addEventListener('resize', updateVideo); /* 리사이즈 감지 */

    /* 컴포넌트 언마운트 시 이벤트 제거 */
    return () => window.removeEventListener('resize', updateVideo);
  }, []);

  return (
    /* 메인 영상 섹션 */
    <section id="main-video" className="main-video">
      <video
        className="video-bg"
        autoPlay /* 자동 재생 */
        muted /* 음소거 */
        loop /* 반복 재생 */
        playsInline /* 인라인 재생 (iOS 대응) */
      >
        <source src={videoSrc} type="video/mp4" />
        당신의 브라우저는 영상을 지원하지 않아요 😢
      </video>
    </section>
  );
}
