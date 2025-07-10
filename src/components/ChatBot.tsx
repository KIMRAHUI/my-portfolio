import { useEffect, useRef, useState } from 'react';
import { createSocket } from '../socket';
import './ChatBot.css';
import * as axios from 'axios';


const predefinedAnswers: Record<string, string> = {
  '학력': '메이필드호텔전문학교 식음료학과 졸업 후, 경희사이버대학교 글로벌경영학과를 2024년 8월에 졸업하였습니다.🎓',
  '경력': '에스씨케이컴퍼니(2017~2018), 케이엘이엔씨(2020~2024)에서 고객 응대 및 관리 업무를 수행했습니다. IT 분야는 신입으로 도전 중입니다.💼',
  '성격': '계획적으로 움직이고, 일의 흐름을 논리적으로 정리하는 것을 선호합니다',
  '직무전환': '구조 설계와 흐름 중심의 개발에 더 흥미를 느껴 프론트엔드 직무로 전환을 결심하게 되었습니다.🔄',
  '직무': '사용자 흐름과 데이터 연결이 설계된 화면의 중요성을 느꼈습니다.🔄',
  '포부': '협업할 수 있는 프론트엔드 개발자로 성장하는 것이 목표입니다.🌱',
  '포트폴리오': 'MyCar360, YTS 영화 플랫폼 등 직접 기획하고 구현했습니다.🗂️',
  '기술': 'React, TypeScript, Supabase, Node.js 등 사용했습니다.🛠️',
  '깃허브': 'GitHub에 정리되어 있으며 히스토리를 남겼습니다.🔗',
  '디자인': '포토샵, 일러스트, AE로 인트로 영상 제작 경험이 있습니다.🎨',
  '자격증': 'SNS 마케팅, GTQ 1급, 웹디자인 기능사 등 자격증을 보유하고 있으며 계속 준비 중입니다.📜',
  '연락': '이메일(rho0531@naver.com)로 문의주세요.✉️',
};

type Message = {
  sender: 'user' | 'bot' | 'interviewer';
  text: string;
};

export default function ChatBot() {
  const [role, setRole] = useState<'interviewer' | 'applicant' | null>(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [readyToStart, setReadyToStart] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '안녕하세요! 포트폴리오 관련 궁금하신 점을 물어보세요 😊' },
  ]);
  const [available, setAvailable] = useState(false);
  const [applicantStatus, setApplicantStatus] = useState<boolean | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<any>(null);

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const startPromptRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  console.log('[디버깅] isChatting 상태:', isChatting);
}, [isChatting]);


  useEffect(() => {
  if (role === 'interviewer' && readyToStart && !isConfirmed) {
    startPromptRef.current?.focus(); // ✅ 자동 포커스
  }
}, [role, readyToStart, isConfirmed]);

  // ✅ ChatBot 컴포넌트 내부
  // 응답 타입 정의
  type CanStartChatResponse = {
    canStart: boolean;
  };

  const handleConfirmInterviewer = async () => {
    if (!name.trim() || !company.trim()) {
      alert('이름과 회사는 반드시 입력해주세요.');
      return;
    }

    try {
      // ⬇️ 응답 타입 명시해서 TypeScript 오류 방지
      const check = await axios.default.get<CanStartChatResponse>(
        'https://portfolio-interview-chat.onrender.com/can-start-chat'
      );
      console.log('[✅ 응답 확인]', check);

      if (check.data?.canStart === false) {
        alert('현재 다른 면접관과 채팅 중입니다. 이메일(rho0531@naver.com)로 문의 부탁드립니다.');
        return;
      }

      // ✅ 면접관 정보 Supabase에 저장
      await axios.default.post('https://portfolio-interview-chat.onrender.com/save-interviewer', {
        name,
        company,
        email,
        message: '',
      });

      setReadyToStart(true); // 👉 “시작하기” 버튼 표시
    } catch (err) {
      console.error('면접관 정보 저장 실패:', err);
      alert('정보 저장 중 오류가 발생했습니다.');
    }
  };




  const handleStartChat = () => {
    setIsConfirmed(true); // socket 연결 트리거
  };

  const handleToggleAvailability = async () => {
    const newState = !available;
    setAvailable(newState);

    await axios.default.post('https://portfolio-interview-chat.onrender.com/set-availability', { active: newState });

    if (socket.current) {
      socket.current.emit('availability', { status: newState });
    }

    if (newState && !socket.current) {
      socket.current = createSocket('applicant', name, company);
      setupSocketListeners(socket.current, 'applicant');
    }
  };

  function setupSocketListeners(socketInstance: any, currentRole: 'interviewer' | 'applicant') {
    socketInstance.off('message');
    socketInstance.off('auto-reply');
    socketInstance.off('reply');
    socketInstance.off('availability');

    socketInstance.on('message', (data: any) => {
      if (data.senderId === socketInstance.id) return;
      setMessages(prev => [...prev, { sender: 'interviewer', text: data.message }]);

      const matched = Object.keys(predefinedAnswers).find(k => data.message.includes(k));
      if (matched && currentRole === 'applicant') {
        const autoReply = predefinedAnswers[matched];
        socketInstance.emit('reply', { message: autoReply, senderId: socketInstance.id });
        setMessages(prev => [...prev, { sender: 'bot', text: autoReply }]);
      }
    });

    socketInstance.on('auto-reply', (data: any) => {
      if (currentRole === 'applicant') return;
      setMessages(prev => [...prev, { sender: 'bot', text: data.message }]);
    });

    socketInstance.on('reply', (data: any) => {
      setMessages(prev => [...prev, { sender: 'bot', text: data.message }]);
    });

    socketInstance.on('availability', (data: any) => {
      if (currentRole === 'interviewer') setApplicantStatus(data.status);
    });

    socketInstance.on('entry-denied', (data: any) => {
      alert(data.message);
      setIsConfirmed(false);
      setIsChatting(false);
      socketInstance.disconnect();
      socket.current = null;
    });

    socketInstance.on('entry-accepted', () => {
      setIsConfirmed(true);
      setIsChatting(true);
    });
  }

  useEffect(() => {
    if (role && ((role === 'interviewer' && isConfirmed) || role === 'applicant')) {
      if (!socket.current) {
        socket.current = createSocket(role, name, company);
        setupSocketListeners(socket.current, role);

        if (role === 'interviewer') {
          socket.current.emit('interviewer-enter', { name, company });
        }
      }
    }
  }, [role, name, company, isConfirmed]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);

    if (role === 'interviewer') {
      socket.current?.emit('message', { name, company, email, message: input, senderId: socket.current.id });
    } else {
      socket.current?.emit('reply', { message: input, senderId: socket.current.id });
    }

    setInput('');
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {!role && !showPasswordPrompt && (
        <div className="chatbot-init-form">
          <h3>당신은 누구인가요?</h3>
          <button onClick={() => setRole('interviewer')}>👔 면접관</button>
          <button onClick={() => {
            setRole('applicant');
            setShowPasswordPrompt(true);
          }}>💻 지원자(본인)</button>
        </div>
      )}

      {role === 'interviewer' && !isConfirmed && !readyToStart && (
        <div className="chatbot-init-form">
          <h3>면접관 정보 입력</h3>
          <input
            placeholder="이름"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="회사(지점)"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleConfirmInterviewer();
              }
            }}
          />
          <button className="confirm-button" onClick={handleConfirmInterviewer}>
            확인
          </button>
        </div>
      )}

      {role === 'interviewer' && readyToStart && !isConfirmed && (
        <div
          className="chatbot-init-form"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleStartChat();
            }
          }}
          tabIndex={0}
          ref={startPromptRef} // ✅ ref 연결
        >
          <h3>정보가 저장되었습니다.<br />채팅을 시작하시겠습니까?</h3>
          <button onClick={handleStartChat}>✅ 시작하기</button>
        </div>
      )}



      {role === 'applicant' && showPasswordPrompt && (
        <div className="chatbot-init-form">
          <h3>지원자 비밀번호 입력</h3>
          <input
            type="password"
            placeholder="비밀번호"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (passwordInput === '0505') {
                  setShowPasswordPrompt(false);
                  setPasswordInput('');
                  setAuthError('');
                  if (!socket.current) {
                    socket.current = createSocket('applicant', name, company);
                    setupSocketListeners(socket.current, 'applicant');
                  }
                } else {
                  setAuthError('비밀번호가 틀렸습니다.');
                }
              }
            }}
          />
          {authError && <p className="auth-error">{authError}</p>}
          <button onClick={() => {
            if (passwordInput === '0505') {
              setShowPasswordPrompt(false);
              setPasswordInput('');
              setAuthError('');
              if (!socket.current) {
                socket.current = createSocket('applicant', name, company);
                setupSocketListeners(socket.current, 'applicant');
              }
            } else {
              setAuthError('비밀번호가 틀렸습니다.');
            }
          }}>확인</button>
        </div>
      )}

      {(role === 'interviewer' && isConfirmed) || (role === 'applicant' && !showPasswordPrompt) ? (
        <>
          {role === 'applicant' && (
            <div className="chat-status-bar">{available ? '🟢 활동중' : '😴 부재중'}</div>
          )}
          {role === 'interviewer' && applicantStatus !== null && (
            <div className="chat-status-bar">지원자 상태: {applicantStatus ? '🟢 활동중' : '😴 부재중'}</div>
          )}
          {role === 'applicant' && (
            <div className="availability-toggle">
              <button onClick={handleToggleAvailability}>
                상태: {available ? '🟢 활동중' : '😴 부재중'}
              </button>
            </div>
          )}
          <div className="chatbot-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>{msg.text}</div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="예: 기술스택, 디자인, 자격증 등"
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>전송</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
