import { useState } from 'react';
import { FileText } from 'lucide-react';
import './ResumeQR.css';
import qrImage from '../assets/resume-qr.png';

/* 노션 이력서 링크 */
const notionLink =
  'https://smoggy-gymnast-0ed.notion.site/21e77fa64f7f8033a8b8d1c900be982c?source=copy_link';

export default function ResumeQR() {
  /* 토글 상태 관리 */
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* 전체 이력서 컴포넌트 wrapper */
    <div className="resume-wrapper">
      {/* 이력서 보기 버튼 */}
      <button className="resume-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="resume-btn-content">
          <FileText size={16} />
          <span>이력서 보기</span>
        </span>
      </button>

      {/* 버튼 클릭 시 드롭다운 영역 */}
      {isOpen && (
        <div className="resume-dropdown">
          {/* QR 코드 이미지 */}
          <img src={qrImage} alt="이력서 QR코드" className="resume-qr-img" />
          
          {/* 노션 이력서 버튼 */}
          <a
            href={notionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link-button"
          >
            노션 이력서
          </a>
        </div>
      )}
    </div>
  );
}
