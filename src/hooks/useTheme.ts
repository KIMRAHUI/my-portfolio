// src/hooks/useTheme.ts
import { useEffect, useState } from 'react';

export default function useTheme() {
  // 현재 테마 상태 (light | dark), 로컬스토리지에서 불러옴
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // HTML에 테마 속성 적용
    localStorage.setItem('theme', theme); // 테마 상태 저장
  }, [theme]);

  // 테마 토글 (light <-> dark)
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme }; // 테마 상태 및 토글 함수 반환
}
