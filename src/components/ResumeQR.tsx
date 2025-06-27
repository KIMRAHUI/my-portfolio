import './ResumeQR.css';
import qrImage from '../assets/resume-qr.png';
const notionLink = 'https://smoggy-gymnast-0ed.notion.site/21e77fa64f7f8033a8b8d1c900be982c?source=copy_link'; 

export default function ResumeQR() {
  return (
    <div className="resume-qr-container">
      <p className="resume-label">📎 이력서 보기</p>
      <img src={qrImage} alt="이력서 QR코드" className="resume-qr-img" />
      <a
        href={notionLink}
        target="_blank"
        rel="noopener noreferrer"
        className="resume-link-button"
      >
        Notion 이력서 열기
      </a>
    </div>
  );
}
