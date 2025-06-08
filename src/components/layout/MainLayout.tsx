import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { useTheme } from '../../providers/ThemeProvider';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = '' }: MainLayoutProps) => {
  const { theme, layout } = useTheme();

  return (
    <div className={`min-h-screen ${theme.background}`}>
      <Navigation />
      <main className="py-10">
        <div className={`${layout.maxWidth} mx-auto ${layout.padding} ${className}`}>
          {children}
        </div>
      </main>
    </div>
  );
}; 