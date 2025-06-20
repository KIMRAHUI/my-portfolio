import { useState } from 'react';
import ChatBot from './ChatBot';
import './ChatToggleButton.css';

export default function ChatToggleButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      {isOpen && <ChatBot />}

      <div className="chat-toggle-wrapper">
        <button
          className="chat-toggle-button"
          onClick={handleToggle}
          aria-label="챗봇 열기"
        >
          <img src="/chat-icon.jpg" alt="챗봇 아이콘" />
        </button>
        <div className="chat-toggle-label">24시간 챗상담 가능</div>
      </div>
    </>
  );
}
