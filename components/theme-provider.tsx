'use client';

import { ReactNode, useEffect } from 'react';

export function ThemeProvider(props: { children: ReactNode }) {
  useEffect(() => {
    // Check for theme on initial load
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply theme
    document.documentElement.classList.toggle('dark', isDark);

    // Listen for system theme changes when in system mode
    if (!('theme' in localStorage)) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle('dark', e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return props.children;
}
