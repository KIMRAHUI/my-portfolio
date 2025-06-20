import './ProjectDetail.css';

interface Project {
  stack: string;
  summary: string;
  difficulty: string;
  learned: string;
  links: {
    url: string;
    label: string;
    icon: string;
  }[];
}

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  return (
    <div className="project-detail">
      <div className="detail-section">
        <h3>📌 사용 기술 (스택)</h3>
        <p>{project.stack}</p>
      </div>

      <div className="detail-section">
        <h3>📝 프로젝트 설명</h3>
        <p>{project.summary}</p>
      </div>

      <div className="detail-section">
        <h3>🧩개발 과정의 이슈 및 해결 방법</h3>
        <p><strong>문제점:</strong> {project.difficulty}</p>
        <p><strong>해결 방법:</strong> {project.learned}</p>
      </div>
    </div>
  );
}
