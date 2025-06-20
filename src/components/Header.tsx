import './Header.css';
import logoImage from '../assets/rahui-logo.png';

export default function Header() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <header className="header">
      <h1 className="logo" style={{ cursor: 'pointer' }} onClick={refreshPage}>
        <img src={logoImage} alt="Rahui 로고" className="logo-image" />
      </h1>

      <nav className="nav">
        <a href="#about">About</a>
        <a href="#stack">Stack</a>
        <a href="#projects">Projects</a>
      </nav>
    </header>
  );
}
