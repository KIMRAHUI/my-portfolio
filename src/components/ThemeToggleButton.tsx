// ThemeToggleButton.tsx
import useTheme from '../hooks/useTheme';
import './ThemeToggleButton.css';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-button ${theme}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
