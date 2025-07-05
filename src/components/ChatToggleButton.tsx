import { useState, useEffect } from 'react';
import ChatBot from './ChatBot';
import './ChatToggleButton.css';

export default function ChatToggleButton() {
  const [isOpen, setIsOpen] = useState(false); // 챗봇 열림 여부
  const [isHover, setIsHover] = useState(false); // 버튼 호버 여부
  const [isFloating, setIsFloating] = useState(true); // 버튼 고정 여부

  const handleToggle = () => {
    setIsOpen(prev => !prev); // 너구리 버튼 토글
  };

  useEffect(() => {
    const handleScroll = () => {
      const pptSection = document.getElementById('ppt-section');
      if (pptSection) {
        const rect = pptSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 120;
        setIsFloating(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isOpen && <ChatBot />} {/* 챗봇 열려 있을 때만 표시 */}

      <div className={`chat-toggle-wrapper ${isFloating ? 'floating' : 'hidden'}`}>
        <button
          className="chat-toggle-button"
          onClick={handleToggle}
          aria-label="챗봇 열기"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={isHover ? '/chat-hover.png' : '/chat-icon.jpg'}
            alt="챗봇 아이콘"
          />
        </button>

        <div className="chat-toggle-label">24시간 챗상담 가능</div>
      </div>
    </>
  );
}
