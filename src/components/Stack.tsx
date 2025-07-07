import { useEffect } from 'react';
import './Stack.css';
import eggImage from '../assets/egg-boiled.png';
import notionIcon from '../assets/Notion-logo.png';

/* 기술 스택 그룹 정보 (Frontend, Backend, Design, Learning) */
const techStacks = [
  {
    category: 'Frontend',
    notionUrl: 'https://smoggy-gymnast-0ed.notion.site/Web-Development-Study-Notes-21677fa64f7f80f3bd28ffbfbd4c615f?source=copy_link',
    notionLabel: 'web',
    stacks: [
      { name: 'JavaScript', level: '반숙', desc: '기초 문법과\nDOM 제어를 프로젝트 기반 학습 중' },
      { name: 'TypeScript', level: '반숙', desc: 'React 프로젝트에서 타입 시스템을\n점차 익혀가는 중' },
      { name: 'React', level: '반숙', desc: '컴포넌트 기반 개발과\n상태 관리 학습 중' },
    ],
  },
  {
    category: 'Backend',
    notionUrl: 'https://smoggy-gymnast-0ed.notion.site/My-sql-1f077fa64f7f80458446cb808af26fa6?source=copy_link',
    notionLabel: 'sql',
    stacks: [
      { name: 'MySQL', level: '반숙', desc: 'SELECT, INSERT, UPDATE, DELETE 등 기본 쿼리를 작성해보고, 간단한 테이블 구조를 다뤄본 경험 있음' },
      { name: 'Supabase', level: '반숙', desc: '프로젝트에서 인증과 데이터 관리를\n실제로 적용' },
      { name: 'Express', level: '반숙', desc: 'REST API의 라우팅을 직접 구성해보고, 간단한 요청/응답 흐름과 미들웨어 사용을 연습 중' },
    ],
  },
  {
    category: 'Design',
    stacks: [
      {
        name: 'Illustrator',
        level: '완숙',
        desc: '계란 아이콘, MyCar360 피피티\n Illustrator로 제작해\nUI를 시각적으로 전달',
      },
      {
        name: 'After Effects',
        level: '반숙',
        desc: '포트폴리오의 첫 인상을 위해\n간단한 인트로 영상을 직접 제작',
      },
      {
        name: 'Photoshop',
        level: '완숙',
        desc: 'GTQ 1급 자격을 바탕으로,\n실무에 빠르게 적응할 수 있게 꾸준히 학습 중',
      },
    ],
  },
  {
    category: 'Learning',
    notionLinks: [
      { label: 'Java', url: 'https://smoggy-gymnast-0ed.notion.site/JAVA-1f077fa64f7f807bade7d0643a4a18ab?source=copy_link' },
      { label: 'Python', url: 'https://smoggy-gymnast-0ed.notion.site/Python-1f077fa64f7f805e9b81eaca9c2d24e0?source=copy_link' },
    ],
    stacks: [
      { name: 'Java', level: '반숙', desc: '자료형, 제어문, 배열, 클래스·상속·인터페이스 등을 중심 객체지향 구조를 익히고, 간단한 예제로 문법과 설계 흐름 학습 중' },
      { name: 'Python', level: '반숙', desc: '기초 문법과 자료구조를 학습하고 알고리즘 문제 풀이로\n 흐름을 익히는 중, 자동화나 데이터 처리 실습도 병행 중' },
    ],
  },
];

/* Stack 컴포넌트 */
export default function Stack() {
  /* 페이지 로딩 시 최상단으로 스크롤 */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="stack-section" id="stack">
      <h2 className="section-title">Tech Stack</h2>

      {techStacks.map((group) => (
        <div key={group.category} className="stack-group">
          {/* 카테고리 제목 + Notion 링크 */}
          <h3 className="stack-category">
            {group.category}
            {group.notionLinks ? (
              group.notionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notion-category-link"
                  title={`${link.label} 노션 페이지`}
                >
                  <img src={notionIcon} alt="Notion" className="notion-icon" />
                  <span className="notion-label">{link.label}</span>
                </a>
              ))
            ) : group.notionUrl ? (
              <a
                href={group.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="notion-category-link"
              >
                <img src={notionIcon} alt="Notion" className="notion-icon" />
                <span className="notion-label">{group.notionLabel}</span>
              </a>
            ) : null}
          </h3>

          {/* 각 스택 카드 렌더링 */}
          <div className="stack-grid">
            {group.stacks.map((tech) => (
              <div
                className={`stack-card ${getLevelClass(tech.level)}`}
                key={tech.name}
              >
                {/* / * 기본 카드 레이아웃 (이미지 + 이름 + 숙련도) */ }
                <div className="card-default">
                  <img src={eggImage} alt="egg" className="egg-img" />
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-level">{tech.level}</div>
                </div>

                 {/* 호버 시 상세 설명 표시  */}
                <div className="card-description">
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* 숙련도 텍스트에 따라 클래스 반환하는 함수 */
function getLevelClass(level: string) {
  switch (level) {
    case '흰자만 익음':
      return 'level-soft';
    case '반숙':
      return 'level-medium';
    case '완숙':
      return 'level-hard';
    default:
      return '';
  }
}
