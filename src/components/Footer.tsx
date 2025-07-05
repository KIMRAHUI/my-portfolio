import './Footer.css';
import { Mail, Link, Folder } from 'lucide-react';

/* 하단 푸터 컴포넌트 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* 연락처 섹션 */}
        <div className="footer-section">
          <h4 className="footer-title">
            <Mail size={16} /> Contact
          </h4>
          <ul>
            <li>Email: <a href="mailto:rho0531@naver.com">rho0531@naver.com</a></li>
            <li>Location: Daegu, South Korea</li>
          </ul>
        </div>

        {/* 내부 페이지 이동 링크 */}
        <div className="footer-section">
          <h4 className="footer-title">
            <Link size={16} /> Quick Links
          </h4>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stack">Tech Stack</a></li>
          </ul>
        </div>

        {/* 외부 프로젝트 사이트 연결 */}
        <div className="footer-section footer-family-site">
          <label htmlFor="family-site-select" className="footer-title family-label">
            <Folder size={16} /> 프로젝트 모음
          </label>
          <select
            id="family-site-select"
            onChange={(e) => {
              const url = e.target.value;
              if (url) window.open(url, '_blank'); /* 새 탭으로 열기 */
            }}
          >
            <option value="">Site Navigation</option>
            <option value="https://mycar360-frontend.vercel.app/">MyCar360</option>
            <option value="https://yts-ott.vercel.app/">FilmDream</option>
            <option value="https://johnwick-continental.vercel.app/">Continental</option>
          </select>
        </div>

      </div>

      {/* 푸터 하단 저작권 정보 */}
      <div className="footer-bottom">
        <p>&copy; 2025 KIMRAHUI PROJECT. All rights reserved.</p>
      </div>
    </footer>
  );
}
