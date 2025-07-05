import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 글로벌 스타일 적용

// 루트 요소에 App 렌더링 (React 18 방식)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> {/* 개발 모드에서 경고 감지용 */}
    <App />
  </React.StrictMode>,
);
