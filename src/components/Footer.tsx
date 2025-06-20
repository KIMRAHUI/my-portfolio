import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>📌 사용 기술</h4>
          <ul>
            <li>React, TypeScript, Vite</li>
            <li>Framer Motion (스크롤 애니메이션)</li>
            <li>Swiper (프로젝트 슬라이드/책 넘기기)</li>
            <li>CSS 모듈 기반 스타일링</li>
            <li>Illustrator, Photoshop</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>📮 Contact</h4>
          <p>Email: <a href="mailto:kimrahui.dev@gmail.com">rho0531@naver.com</a></p>
        </div>

        <div className="footer-section footer-family-site">
          <label htmlFor="family-site-select" className="family-label">📂 프로젝트 모음</label>
          <select
            id="family-site-select"
            onChange={(e) => {
              const url = e.target.value;
              if (url) window.open(url, '_blank');
            }}
          >
            <option value="">Site Navigaition</option>
            <option value="https://mycar360-frontend.vercel.app/">MyCar360</option>
            <option value="https://yts-ott.vercel.app/">FilmDream</option>
            <option value="https://johnwick-continental.vercel.app/">Continental</option>
          </select>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 KIMRAHUI PROJECT. All rights reserved.</p>
      </div>
    </footer>
  );
}
