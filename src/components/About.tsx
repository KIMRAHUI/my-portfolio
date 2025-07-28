import './About.css';
import raccoonImg from '../assets/raccoon-bw.png'; // 너구리 이미지

export default function About() {
  return (
    <section className="about-section" id="about">
      <h2 className="section-title">About Me</h2>

      <div className="about-content">
        <img
          src={raccoonImg}
          alt="흑백 너구리"
          className="raccoon-image"
        />

        <p className="about-intro">
          안녕하세요.<br />
          겸손한 자세로 끊임없이 배우고 성장하는<br />
          <strong>UX잡는 손</strong> 김라희입니다.<br /><br />
          언제나 호기심 가득한 너구리처럼,<br />
          복잡한 문제도 빠르게 탐색하며 해결하는<br />
          민첩하고 꼼꼼한 <strong>프론트엔드 개발자</strong>로 성장하고자 노력합니다.
        </p>
      </div>
    </section>
  );
}
