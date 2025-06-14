import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const NavItem = ({
  to,
  children,
  className = '',
  activeClassName = '',
}: NavItemProps) => {
  return (
    <Link
      to={to}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
          'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
          isActive && 'border-indigo-500 text-gray-900',
          className,
          isActive && activeClassName
        )
      }
    >
      {children}
    </Link>
  );
};
