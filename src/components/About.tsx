import { useState } from 'react';
import './About.css';
import raccoonImg from '../assets/raccoon-bw.png'; // 너구리 이미지

// FAQ 목록 (질문/답변)
const faqList = [
  {
    question: "# 인터페이스 설계자로서 가장 중요하게 생각하는 점은?",
    answer: "직관적인 UI와 경험 흐름을 설계하는 것이 핵심이며, 사용자 관점에서 고민하고\n 꾸준히 성장하려는 태도를 중요하게 생각합니다.",
  },
  {
    question: "# 새로운 기술은 어떻게 배우고 있나요?",
    answer: "작은 개인 프로젝트를 통해 직접 경험해보고,ChatGPT와 같은 AI 도구를 활용해 학습합니다.\n AI 기술에 익숙해지면서도, 너무 의존하지 않고 스스로 고민하는 능력을 키우려고 노력합니다.",
  },
  {
    question: "# 인터페이스 설계자로서 앞으로의 목표는 무엇인가요?",
    answer: "기본기를 바탕으로 변화에 유연하게 대응하며, AI 시대에 걸맞은 창의적이고 책임감 있는\n 개발자로 성장하는 것이 목표입니다.",
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // 열려 있는 질문 인덱스 상태

  // 질문 클릭 시 토글
  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="about-section" id="about">
      <h2 className="section-title">About Me</h2>

      <img
        src={raccoonImg}
        alt="흑백 너구리 이미지"
        className="raccoon-image"
      />

      {/* 자기소개 문장 */}
      <p className="about-intro">
        안녕하세요.<br />
        겸손한 자세로 끊임없이 배우고 성장하는<br />
        <strong>UX잡는 손</strong> 김라희입니다.<br /><br />
        언제나 호기심 가득한 너구리처럼,<br />
        복잡한 문제도 빠르게 탐색하며 해결하는<br />
        민첩하고 꼼꼼한 <strong>UI/UX전문가</strong>로 성장하고자 노력합니다.
      </p>

      {/* FAQ 섹션 */}
      <div className="faq-container">
        {faqList.map(({ question, answer }, idx) => (
          <div
            key={idx}
            className={`faq-item ${openIndex === idx ? 'open' : ''}`}
            onClick={() => toggleIndex(idx)} // 질문 클릭 이벤트
          >
            <button
              className="faq-question"
              aria-expanded={openIndex === idx} // 접근성용 속성
            >
              {question}
              <span className="arrow">
                {openIndex === idx ? '▲' : '▼'} {/* 화살표 토글 */}
              </span>
            </button>

            {openIndex === idx && (
              <div className="faq-answer">
                <p>{answer}</p> {/* 답변 내용 */}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
