import Header from './components/Header';
import MainVideo from './components/MainVideo';
import About from './components/About';
import Stack from './components/Stack';
import ProjectSection from './components/ProjectSection';
import Footer from './components/Footer';
import ChatToggleButton from './components/ChatToggleButton';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header /> {/* 내부에서 <a href="#about"> 구조로 이동 */}

      <main className="main-sections">
        <section id="main-video">
          <MainVideo />
        </section>

        <section id="about" className="sticky-section">
          <About />
        </section>

        <section id="stack">
          <Stack />
        </section>

        <section id="projects">
          <ProjectSection />
        </section>
      </main>

      <Footer />
      <ChatToggleButton />
    </div>
  );
}

export default App;
