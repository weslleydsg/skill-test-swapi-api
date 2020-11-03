import React, { createContext, useContext } from 'react';

import usePersistedState from '../utils/usePersistedState';

interface ThemeContextData {
  themeName: string;
  toggleTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeName, setTheme] = usePersistedState<string>('theme', 'dark');

  const toggleTheme = () => setTheme(themeName === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
