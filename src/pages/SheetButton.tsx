import React from 'react';

interface ButtonProps {
  text?: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
  ariaLabel?: string;
}

const SheetButton: React.FC<ButtonProps> = ({ text, onClick, color = '', disabled = false, icon, title, className = '', ariaLabel }) => {
  // If no text, make button minimal (icon-only)
  const base = text ? `px-4 py-2` : `p-2`;
  const bg = color && text ? color : '';
  const textColor = text ? 'text-white font-semibold' : 'text-gray-700';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel || text || ''}
      className={`${base} rounded-md shadow-sm transition-colors ${bg} ${textColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      type="button"
    >
      {icon && <span className={text ? 'mr-2' : ''}>{icon}</span>}
      {text}
    </button>
  );
};

export default SheetButton;