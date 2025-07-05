import './ProjectDetail.css';
import { BadgeCheck, FileText, Puzzle, AlertTriangle, Lightbulb } from 'lucide-react'; /* 프로젝트 상세 아이콘 */

/* 프로젝트 타입 정의 */
interface Project {
  stack: string;
  summary: string;
  difficulty: string;
  learned: string;
  links: {
    url: string;
    label?: string;
    icon: string;
  }[];
}

/* props 타입 정의 */
interface Props {
  project: Project;
}

/* 프로젝트 상세 정보 표시 컴포넌트 */
export default function ProjectDetail({ project }: Props) {
  return (
    <div className="project-detail">

      {/* 사용 기술 섹션 */}
      <div className="detail-section">
        <h3>
          <BadgeCheck size={18} style={{ marginRight: '0.5rem' }} />
          사용 기술 (스택)
        </h3>
        <p className="multiline-text">{project.stack}</p>
      </div>

      {/* 프로젝트 설명 섹션 */}
      <div className="detail-section">
        <h3>
          <FileText size={18} style={{ marginRight: '0.5rem' }} />
          프로젝트 설명
        </h3>
        <p className="multiline-text">{project.summary}</p>
      </div>

      {/* 문제/해결 방법 섹션 */}
      <div className="detail-section">
        <h3>
          <Puzzle size={18} style={{ marginRight: '0.5rem' }} />
          개발 과정의 이슈 및 해결 방법
        </h3>

        {/* 문제 설명 박스 */}
        <div className="problem-box hover-layer">
          <p className="multiline-text">
            <AlertTriangle size={16} className="box-icon" />
            <strong> 문제점:</strong> {project.difficulty}
          </p>
        </div>

        {/* 해결 방법 박스 */}
        <div className="solution-box hover-layer">
          <p className="multiline-text">
            <Lightbulb size={16} className="box-icon" />
            <strong> 해결 방법:</strong> {project.learned}
          </p>
        </div>
      </div>

    </div>
  );
}
