import './Header.css';
import logoImage from '../assets/rahui-logo.png';

/* 상단 헤더 컴포넌트 */
export default function Header() {
  /* 로고 클릭 시 새로고침 */
  const refreshPage = () => {
    window.location.reload();
  };

  /* 섹션으로 스크롤 이동 */
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      {/* 로고 클릭 시 페이지 새로고침 */}
      <h1 className="logo" style={{ cursor: 'pointer' }} onClick={refreshPage}>
        <img src={logoImage} alt="Rahui 로고" className="logo-image" />
      </h1>

      {/* 내비게이션 메뉴 */}
      <nav className="nav">
        <button onClick={() => scrollToSection('about')}>About</button>
        <button onClick={() => scrollToSection('stack')}>Stack</button>
        <button onClick={() => scrollToSection('projects')}>Projects</button>
      </nav>
    </header>
  );
}
