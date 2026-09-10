'use client';
import { useEffect } from 'react';
import { useTheme, type Theme } from '@/context/ThemeContext';

export function ThemeSetter({ theme }: { theme: Theme }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);
  return null;
}
