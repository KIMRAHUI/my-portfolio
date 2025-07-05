import { useState } from 'react';
import './ProjectSection.css';
import SlideViewer from './SlideViewer';
import ProjectDetail from './ProjectDetail';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import githubLogo from '../assets/github-logo.png';
import vercelLogo from '../assets/vercel-logo.png';

/* MyCar360 이미지 */
import myThumb from '../assets/MyCar360/thumbnail.jpg';
import my1 from '../assets/MyCar360/MyCar360_1.jpg';
import my2 from '../assets/MyCar360/MyCar360_2.jpg';
import my3 from '../assets/MyCar360/MyCar360_3.jpg';
import my4 from '../assets/MyCar360/MyCar360_4.jpg';
import my5 from '../assets/MyCar360/MyCar360_5.jpg';
import my6 from '../assets/MyCar360/MyCar360_6.jpg';
import my7 from '../assets/MyCar360/MyCar360_7.jpg';
import my8 from '../assets/MyCar360/MyCar360_8.jpg';
import my9 from '../assets/MyCar360/MyCar360_9.jpg';
import my10 from '../assets/MyCar360/MyCar360_10.jpg';
import my11 from '../assets/MyCar360/MyCar360_11.jpg';
import my12 from '../assets/MyCar360/MyCar360_12.jpg';
import my13 from '../assets/MyCar360/MyCar360_13.jpg';
import my14 from '../assets/MyCar360/MyCar360_14.jpg';
import my15 from '../assets/MyCar360/MyCar360_15.jpg';
import my16 from '../assets/MyCar360/MyCar360_16.jpg';
import my17 from '../assets/MyCar360/MyCar360_17.jpg';
import my18 from '../assets/MyCar360/MyCar360_18.jpg';

/* FilmDream 이미지 */
import filmThumb from '../assets/FilmDream/thumbnail.jpg';
import film1 from '../assets/FilmDream/FilmDream_1.jpg';
import film2 from '../assets/FilmDream/FilmDream_2.jpg';
import film3 from '../assets/FilmDream/FilmDream_3.jpg';
import film4 from '../assets/FilmDream/FilmDream_4.jpg';
import film5 from '../assets/FilmDream/FilmDream_5.jpg';
import film6 from '../assets/FilmDream/FilmDream_6.jpg';
import film7 from '../assets/FilmDream/FilmDream_7.jpg';
import film8 from '../assets/FilmDream/FilmDream_8.jpg';
import film9 from '../assets/FilmDream/FilmDream_9.jpg';
import film10 from '../assets/FilmDream/FilmDream_10.jpg';
import film11 from '../assets/FilmDream/FilmDream_11.jpg';
import film12 from '../assets/FilmDream/FilmDream_12.jpg';
import film13 from '../assets/FilmDream/FilmDream_13.jpg';
import film14 from '../assets/FilmDream/FilmDream_14.jpg';
import film15 from '../assets/FilmDream/FilmDream_15.jpg';
import film16 from '../assets/FilmDream/FilmDream_16.jpg';
import film17 from '../assets/FilmDream/FilmDream_17.jpg';
import film18 from '../assets/FilmDream/FilmDream_18.jpg';
import film19 from '../assets/FilmDream/FilmDream_19.jpg';

/* Continental 이미지 */
import conThumb from '../assets/Continental/thumbnail.jpg';
import con1 from '../assets/Continental/Continental_1.jpg';
import con2 from '../assets/Continental/Continental_2.jpg';
import con3 from '../assets/Continental/Continental_3.jpg';
import con4 from '../assets/Continental/Continental_4.jpg';
import con5 from '../assets/Continental/Continental_5.jpg';
import con6 from '../assets/Continental/Continental_6.jpg';
import con7 from '../assets/Continental/Continental_7.jpg';
import con8 from '../assets/Continental/Continental_8.jpg';
import con9 from '../assets/Continental/Continental_9.jpg';
import con10 from '../assets/Continental/Continental_10.jpg';
import con11 from '../assets/Continental/Continental_11.jpg';
import con12 from '../assets/Continental/Continental_12.jpg';
import con13 from '../assets/Continental/Continental_13.jpg';
import con14 from '../assets/Continental/Continental_14.jpg';
import con15 from '../assets/Continental/Continental_15.jpg';

/* 포트폴리오 썸네일 */
import myPortfolioThumb from '../assets/MyPortfolio/thumbnail.png';

/* 프로젝트 정보 배열 */
const projects = [
  {
    id: 1,
    title: 'MyCar360',
    thumbnail: myThumb,
    slides: [my1, my2, my3, my4, my5, my6, my7, my8, my9, my10, my11, my12, my13, my14, my15, my16, my17, my18],
    stack: 'React, Supabase, Express.js (Node.js)',
    summary: '360도 차량 점검 및 정비 이력 관리 플랫폼입니다.',
    difficulty: '점검 이력과 추천 주기를 비교해서 다음 점검 시기를 예측하는 기능이\n 처음에는 막막했습니다. 어떤 기준으로 계산할지 정하는 데 어려움이 있었습니다.',
    learned: '각 점검 항목에 주기 데이터를 추가하고,\n 마지막 점검일 기준으로 다음 점검 시점을 계산하는 로직을 백엔드에서 구현하며\n 하나씩 정리해 나갔습니다.',
    links: [
      { url: 'https://github.com/KIMRAHUI/mycar360-frontend', label: 'Frontend', icon: githubLogo },
      { url: 'https://github.com/KIMRAHUI/mycar360-backend', label: 'Backend', icon: githubLogo },
      { url: 'https://mycar360-frontend.vercel.app/', icon: vercelLogo },
    ],
  },
  {
    id: 2,
    title: 'FilmDream',
    thumbnail: filmThumb,
    slides: [film1, film2, film3, film4, film5, film6, film7, film8, film9, film10, film11, film12, film13, film14, film15, film16, film17, film18, film19],
    stack: 'React, Supabase, Express.js (Node.js)',
    summary: 'YTS API 기반의 영화 리뷰 및 통계 서비스입니다.',
    difficulty: '리뷰 기능에서 로그인한 사용자에 따라 수정/삭제 버튼을 제어하는 부분이\n 처음에 어려웠습니다. 권한 처리도 명확하게 되지 않아 고민이 많았습니다.',
    learned: 'Supabase에서 사용자 UUID를 활용해 작성자 여부를 확인하고,\n 조건에 따라 버튼을 다르게 보여주는 방식으로 문제를 차분히 해결했습니다.',
    links: [
      { url: 'https://github.com/KIMRAHUI/yts-ott', label: 'Frontend', icon: githubLogo },
      { url: 'https://github.com/KIMRAHUI/yts-backend', label: 'Backend', icon: githubLogo },
      { url: 'https://yts-ott.vercel.app/', label: 'Vercel', icon: vercelLogo },
    ],
  },
  {
    id: 3,
    title: 'Continental',
    thumbnail: conThumb,
    slides: [con1, con2, con3, con4, con5, con6, con7, con8, con9, con10, con11, con12, con13, con14, con15],
    stack: 'React, Supabase, Express.js (Node.js)',
    summary: '존윅 세계관 기반 호텔 예약 시스템입니다.',
    difficulty: '요원 전용 시설에 비밀 코드를 입력해 접근하도록 만드는 흐름이\n 생각보다 복잡하게 느껴졌고, 사용자 경험이 자연스럽지 않다는 생각이 들었습니다.',
    learned: '입력 성공 여부를 상태로 관리하고, 그에 따라 페이지 흐름과 버튼 노출을\n 조정하면서 점차 원하는 흐름을 구현해갈 수 있었습니다.',
    links: [
      { url: 'https://github.com/KIMRAHUI/johnwick-continental', label: 'Frontend', icon: githubLogo },
      { url: 'https://github.com/KIMRAHUI/johnwick-board-backend', label: 'Backend', icon: githubLogo },
      { url: 'https://johnwick-continental.vercel.app/', label: 'Vercel', icon: vercelLogo },
    ],
  },
  {
    id: 4,
    title: 'My Portfolio',
    thumbnail: myPortfolioThumb,
    slides: [],
    stack: 'React, TypeScript',
    summary: '개인 프로젝트와 기술 스택을 소개하는 포트폴리오 웹사이트로서,\n 탭기반의 프로젝트 전환과 깔끔한 섹션 구성을 중심으로 제작되었습니다.',
    difficulty: '24시간 상담이 가능한 챗봇 기능을 추가하고자 했습니다.\n 하지만 페이지 구성 요소들과 충돌없이 언제든 접근 가능하면서 UI를 방해하지 않는\n 인터페이스를 구현하는데 어려움이 있었습니다.',
    learned: '하단 우측 고정 토글 버튼을 클릭하면\n 챗봇이 조건부로 열리도록 구현하고,useState,z-index,fixed 속성을 활용해 \n다른 UI와 충돌없이 상시 접근가능하게 구성했습니다.',
    links: [
      { url: 'https://github.com/KIMRAHUI/my-portfolio', label: 'GitHub', icon: githubLogo },
    ],
  },
];

/* 프로젝트 섹션 컴포넌트 */
export default function ProjectSection() {
  /* 선택된 프로젝트 상태 */
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  /* 슬라이드 뷰어 모달 열림 상태 */
  const [showViewer, setShowViewer] = useState(false);

  return (
    <section id="projects" className="projects-wrapper">
      <h2 className="section-title">Projects</h2>

      <div className="project-section">

        {/* 좌측 썸네일 및 슬라이드 목록 */}
        <div className="project-left">
          <img
            src={selectedProject.thumbnail}
            alt={`${selectedProject.title} 썸네일`}
            className="main-thumbnail"
            onClick={() => selectedProject.slides.length > 0 && setShowViewer(true)}
          />

          {selectedProject.slides.length > 0 && (
            <div className="slide-thumbnails">
              <Swiper
                spaceBetween={8}
                slidesPerView={'auto'}
                freeMode={true}
                grabCursor={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="thumbnail-swiper"
              >
                {selectedProject.slides.map((src, idx) => (
                  <SwiperSlide key={idx} style={{ width: 90 }}>
                    <img
                      src={src}
                      className="slide-thumb"
                      onClick={() => setShowViewer(true)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* 우측 탭 버튼 + 상세 정보 + 링크들 */}
        <div className="project-right">

          {/* 탭 버튼 영역 */}
          <div className="project-tabs">
            {projects.map((proj) => (
              <button
                key={proj.id}
                className={`tab-button ${proj.id === selectedProject.id ? 'active' : ''}`}
                onClick={() => setSelectedProject(proj)}
              >
                {proj.title}
              </button>
            ))}
          </div>

          {/* 상세 정보 출력 */}
          <ProjectDetail project={selectedProject} />

          {/* 링크 버튼 영역 */}
          <div className="project-links">
            {selectedProject.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <img src={link.icon} alt={link.label} className="link-icon" />
                <span className="link-label">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 전체 슬라이드 보기 모달 */}
        {showViewer && (
          <SlideViewer
            slides={selectedProject.slides}
            onClose={() => setShowViewer(false)}
          />
        )}
      </div>
    </section>
  );
}
