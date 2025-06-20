import { useEffect } from 'react';
import './Stack.css';
import eggImage from '../assets/egg-boiled.png';
import notionIcon from '../assets/Notion-logo.png';

const techStacks = [
  {
    category: 'Frontend',
    notionUrl: 'https://smoggy-gymnast-0ed.notion.site/Web-Development-Study-Notes-21677fa64f7f80f3bd28ffbfbd4c615f?source=copy_link',
    notionLabel: 'web',
    stacks: [
      { name: 'JavaScript', level: '반숙', desc: '기초 문법과\nDOM 제어를 이해하고 있습니다.' },
      { name: 'TypeScript', level: '반숙', desc: 'React 프로젝트에서 타입 시스템을\n점차 익혀가고 있습니다.' },
      { name: 'React', level: '완숙', desc: '컴포넌트 기반 개발과\n상태 관리에 익숙합니다.' },
    ],
  },
  {
    category: 'Backend',
    notionUrl: 'https://smoggy-gymnast-0ed.notion.site/My-sql-1f077fa64f7f80458446cb808af26fa6?source=copy_link',
    notionLabel: 'sql',
    stacks: [
      { name: 'MySQL', level: '흰자만 익음', desc: '기본적인 SELECT/INSERT 쿼리를\n작성할 수 있습니다.' },
      { name: 'Supabase', level: '반숙', desc: '프로젝트에서 인증과 데이터 관리를\n실제로 적용해보았습니다.' },
      { name: 'Express', level: '흰자만 익음', desc: '간단한 API 라우팅을\n구성해본 경험이 있습니다.' },
    ],
  },
  {
    category: 'Design',
    stacks: [
      {
        name: 'Illustrator',
        level: '완숙',
        desc: '스택 섹션에 사용된 계란 아이콘을\n직접 그리고 조합하여 디자인했습니다.',
      },
      {
        name: 'After Effects',
        level: '반숙',
        desc: '포트폴리오의 첫 인상을 위해\n간단한 인트로 영상을 직접 제작해보았습니다.',
      },
      {
        name: 'Photoshop',
        level: '완숙',
        desc: 'GTQ 1급 자격을 바탕으로,\n실무에서도 감각 있게 활용할 수 있게 꾸준히 연습하고 있습니다.',
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
      { name: 'Java', level: '흰자만 익음', desc: '객체지향 구조와\n기본 문법을 차근히 익히고 있습니다.' },
      { name: 'Python', level: '흰자만 익음', desc: '데이터 처리와 알고리즘 중심으로\n기초를 학습 중입니다.' },
    ],
  },
];

export default function Stack() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="stack-section" id="stack">
      <h2 className="section-title">Tech Stack</h2>
      {techStacks.map((group) => (
        <div key={group.category} className="stack-group">
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
          <div className="stack-grid">
            {group.stacks.map((tech) => (
              <div
                className={`stack-card ${getLevelClass(tech.level)}`}
                key={tech.name}
              >
                <img src={eggImage} alt="egg" className="egg-img" />
                <div className="tech-name">{tech.name}</div>
                <div className="tech-level">{tech.level}</div>
                <div
                  className="tech-description"
                  style={{ whiteSpace: 'pre-line' }}
                >
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
