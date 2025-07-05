import Header from './components/Header';
import MainVideo from './components/MainVideo';
import About from './components/About';
import Stack from './components/Stack';
import ProjectSection from './components/ProjectSection';
import Footer from './components/Footer';
import ChatToggleButton from './components/ChatToggleButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import ResumeQR from './components/ResumeQR';
import './App.css'; // 전체 레이아웃 스타일

function App() {
  return (
    <div className="app-container">
      <Header /> {/* 상단 네비게이션 */}

      <main className="main-sections">
        <section id="main-video">
          <MainVideo /> {/* 메인 배경 영상 */}
        </section>

        <section id="about" className="sticky-section">
          <About /> {/* 자기소개 */}
        </section>

        <section id="stack">
          <Stack /> {/* 기술 스택 */}
        </section>

        <section id="projects">
          <ProjectSection /> {/* 프로젝트 목록 */}
        </section>
      </main>

      <Footer /> {/* 하단 정보 */}
      <ResumeQR /> {/* 이력서 QR 코드 */}
      <ThemeToggleButton /> {/* 다크/라이트 전환 */}
      <ChatToggleButton /> {/* 챗봇 버튼 */}
    </div>
  );
}

export default App;
