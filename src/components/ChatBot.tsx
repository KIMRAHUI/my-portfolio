import { useEffect, useRef, useState } from 'react';
import { createSocket } from '../socket';
import './ChatBot.css';
import * as axios from 'axios';


const predefinedAnswers: Record<string, string> = {
  '학력': '메이필드호텔전문학교 식음료학과 졸업 후, 경희사이버대학교 글로벌경영학과를 졸업했습니다.🎓 경영과 마케팅, 서비스 디자인 관련 수업을 자율 수강하며 UI/UX 기초를 다졌습니다.🎓',
  '경력': '계획성과 꼼꼼함이 강점이며, 흐름을 정리하고 공유하는 데 익숙합니다. 피드백을 유연하게 수용해 함께 성장하는 협업 태도를 지향합니다.💼',
  '성격': '계획적으로 움직이고, 일의 흐름을 논리적으로 정리하는 것을 선호합니다. 피드백을 유연하게 수용해 함께 성장하는 것을 지향합니다.',
  '직무전환': '사용자 흐름과 UI 설계에 흥미를 느껴 프론트엔드 직무로 전환을 결심했습니다. 실무형 웹 프로젝트를 통해 구조적 사고를 실습했습니다.🔄',
  '포부': '사용자 중심의 UI/UX 설계를 통해 팀에 기여하고, 실무에서 신뢰받는 디자이너로 성장하는 것이 목표입니다.🌱',
  '포트폴리오': 'MyCar360, Film Dreams, Continental, MyPortfolio를 직접 기획·디자인·구현하며 실무형 UI/UX 역량을 다졌습니다.🗂️',
  '기술': 'React, JavaScript, TypeScript, Supabase, Node.js를 사용해 인증 처리, API 연동 등 다양한 기능을 구현했습니다.🛠️',
  '깃허브': 'GitHub 기반 브랜치 전략과 커밋 관리로 협업 및 코드 이력을 체계적으로 관리한 경험이 있습니다.🔗',
  '디자인': 'Photoshop, Illustrator, After Effects를 활용해 UI 요소 및 인트로 영상을 제작한 실무 경험이 있습니다.🎨',
  '자격증': 'SNS 마케팅, GTQ 1급, 웹디자인 기능사를 취득했으며, 정보처리기사 필기를 합격했습니다. 현재 SQLD와 정보처리기사 실기, 정보처리산업기사 필기를 준비 중이며, 실무 적응력을 높이기 위해 꾸준히 자격 역량을 확장해 나가고 있습니다📜',
  '연락': '포트폴리오 및 이력 관련 문의는 이메일(rho0531@naver.com)로 부탁드립니다.✉️',
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
