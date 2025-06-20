import { useState } from 'react';
import './About.css';
import raccoonImg from '../assets/raccoon-bw.png'; // 흑백 너구리 이미지 경로

const faqList = [
  {
    question: "프론트엔드 개발자로서 가장 중요하게 생각하는 점은?",
    answer: "사용자가 편리하게 느낄 수 있는 UI를 만드는 것과, 꾸준히 배우며 성장하는 자세라고 생각합니다.",
  },
  {
    question: "새로운 기술은 어떻게 배우고 있나요?",
    answer: "작은 개인 프로젝트를 통해 직접 경험해보고, ChatGPT와 같은 AI 도구를 활용해 학습하고 있습니다. AI 기술에 익숙해지면서도, 너무 의존하지 않고 스스로 고민하는 능력을 키우려고 노력합니다.",
  },
  {
    question: "개발자로서 앞으로의 목표는 무엇인가요?",
    answer: "빠르게 변화하는 기술 환경 속에서 기본기를 탄탄히 다지고, AI 시대에 발맞춰 창의적이고 책임감 있는 개발자가 되는 것입니다.",
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="about-section" id="about">
      <h2 className="section-title">About Me</h2>
      <img src={raccoonImg} alt="흑백 너구리 이미지" className="raccoon-image" />
      <p className="about-intro">
        안녕하세요.<br />
        겸손한 자세로 끊임없이 배우고 성장하는<br />
        프론트엔드 개발자 김라희입니다.<br /><br />

        언제나 호기심 가득한 너구리처럼,<br />
        복잡한 문제도 빠르게 탐색하며 해결하는<br />
        민첩하고 꼼꼼한 개발자가 되고자 노력합니다.
      </p>

      <div className="faq-container">
        {faqList.map(({ question, answer }, idx) => (
          <div
            key={idx}
            className={`faq-item ${openIndex === idx ? 'open' : ''}`}
            onClick={() => toggleIndex(idx)}
          >
            <button className="faq-question" aria-expanded={openIndex === idx}>
              {question}
              <span className="arrow">{openIndex === idx ? '▲' : '▼'}</span>
            </button>
            {openIndex === idx && (
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
