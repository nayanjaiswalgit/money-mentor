import { createContext, useContext, ReactNode } from 'react';
import config from '../config/app.config';

interface ThemeContextType {
  theme: typeof config.theme;
  layout: typeof config.layout;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ theme: config.theme, layout: config.layout }}>
      {children}
    </ThemeContext.Provider>
  );
}; 