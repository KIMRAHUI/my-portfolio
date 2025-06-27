import { useState } from 'react';
import './ChatBot.css';

const predefinedAnswers: Record<string, string> = {
  '학력': '메이필드호텔전문학교 식음료학과 졸업 후, 경희사이버대학교 글로벌경영학과를 2025년 8월에 졸업하였습니다.🎓',
  '경력': '에스씨케이컴퍼니(2017~2018), 케이엘이엔씨(2020~2024)에서 고객 응대 및 관리 업무를 수행했습니다. IT 분야는 신입으로 도전 중입니다.💼',
  '성격': '계획적으로 움직이며 꼼꼼하게 일처리를 하는 편입니다. 완벽하게 해내려는 성향이 있어 때로는 시간이 오래 걸리기도 했지만, 작은 단위로 나누어 빠르게 실행하고 피드백을 받아 개선하는 방식으로 보완해왔습니다.🧠',
  '직무전환': '다양한 프로젝트를 진행하며 단순히 보이는 화면보다 사용자 흐름과 데이터 연결이 설계된 화면의 중요성을 느꼈습니다. 구조 설계와 흐름 중심의 개발에 더 흥미를 느껴 프론트엔드 직무로 전환을 결심하게 되었습니다.🔄',
  '포부': '사용자 입장에서 편하고 보기 좋은 웹 화면을 구현하는 데 집중하고 싶습니다. 장기적으로는 기획자, 디자이너, 백엔드 개발자와 원활히 협업할 수 있는 프론트엔드 개발자로 성장하는 것이 목표입니다.🌱',
  '포트폴리오': 'MyCar360, YTS 영화 플랫폼 등 프로젝트를 직접 기획하고 화면 흐름을 설계하며 React로 구현까지 수행한 경험이 있습니다.🗂️',
  '기술': 'React, TypeScript, Vite, Supabase, Express.js 등 다양한 기술을 사용하여 전체 흐름을 고려한 화면 설계와 구현을 경험했습니다.🛠️',
  '깃허브': '프로젝트 소스코드는 GitHub에 정리되어 있으며, 포트폴리오 페이지 내에서 확인하실 수 있습니다. 초기에는 일부 기능 구현 및 배포 과정에서 시행착오가 있었고, 이러한 과정은 Git 히스토리에 그대로 남겨두었습니다. 이는 문제를 회피하지 않고 개선해나간 흐름을 보여주는 기록이라고 생각하여 의도적으로 보존하고 있습니다.🔗',
  '디자인': 'GTQ 1급 자격증을 바탕으로 디자인 감각을 기르기 위해 노력하고 있으며, 실무에서도 UI/UX 일관성에 많은 관심을 갖고 있습니다.🎨',
  '자격증': `1) SNS 마케팅 전문가 자격증 – 한국직업능력연구원  
2) GTQ 1급 – 한국생산성본부(KPC)  
3) 웹디자인 기능사 – 한국산업인력공단(HRD Korea)  
4) 정보처리기사 필기 합격이후 실기를 준비 중입니다. 폭넓은 지식 습득과 커리어 기반 마련을 위해 25년 7월 산업기사 필기 또한 병행하고 있습니다.
5) SQLD – 기초 이론 및 실습 병행 중  

현재 보유한 자격증 외에도 IT 기반 역량 강화를 위해 관련 자격 시험을 준비하고 있으며,  
앞으로도 꾸준히 학습하고 성장하는 자세로 실무에 임하고자 합니다.📜`,

  '연락': '추가 궁금하신 사항은 언제든지 이메일(rho0531@naver.com)로 문의 주시면 성실히 답변드리겠습니다.✉️',
};


export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '안녕하세요! 포트폴리오 관련 궁금하신 점을 물어보세요 😊' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };

    const foundKeyword = Object.keys(predefinedAnswers).find(keyword =>
      input.includes(keyword)
    );

    const botResponse = foundKeyword
      ? predefinedAnswers[foundKeyword]
      : '죄송합니다. 해당 내용은 이메일(rho0531@naver.com)로 문의부탁드립니다!';

    const botMessage = { sender: 'bot', text: botResponse };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          placeholder="예: 기술스택, 배포, 자격증 등"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}
