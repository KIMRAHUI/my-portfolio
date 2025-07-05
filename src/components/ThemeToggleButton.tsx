
import useTheme from '../hooks/useTheme';
import './ThemeToggleButton.css';

export default function ThemeToggleButton() {
   /*현재 테마와 테마 전환 함수 가져오기*/
  const { theme, toggleTheme } = useTheme();

  return (
     /*테마에 따라 버튼 스타일 및 아이콘 표시*/
    <button
      className={`theme-toggle-button ${theme}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
