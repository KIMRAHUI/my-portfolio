import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h4>📮 Contact</h4>
          <ul>
            <li>Email: <a href="mailto:rho0531@naver.com">rho0531@naver.com</a></li>
            <li>Location: Daegu, South Korea</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>🔗 Quick Links</h4>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stack">Tech Stack</a></li>
          </ul>
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
            <option value="">Site Navigation</option>
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
