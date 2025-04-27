import React from 'react';
import { ElementType } from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  icon?: ElementType;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon: Icon,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  onClick,
  children,
}) => {
  const cardClasses = `
    bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className={`p-4 border-b border-gray-100 ${headerClassName}`}>
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="h-5 w-5 text-gray-500" />}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
    </div>
  );
}; 