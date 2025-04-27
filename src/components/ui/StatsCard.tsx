import React from 'react';
import { ElementType } from 'react';
import { Card } from './Card';

interface StatsCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  icon?: ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  subtitle,
  value,
  icon,
  trend,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    : value;

  const trendColor = trend
    ? trend.isPositive
      ? 'text-green-500'
      : 'text-red-500'
    : '';

  const trendIcon = trend?.isPositive ? '↑' : '↓';

  return (
    <Card
      title={title}
      subtitle={subtitle}
      icon={icon}
      className={className}
      bodyClassName="pt-2"
    >
      <div className="flex items-baseline">
        {prefix && <span className="text-gray-500 mr-1">{prefix}</span>}
        <span className="text-2xl font-semibold text-gray-900">
          {formattedValue}
        </span>
        {suffix && <span className="text-gray-500 ml-1">{suffix}</span>}
      </div>
      {trend && (
        <div className={`mt-2 flex items-center ${trendColor}`}>
          <span className="text-sm font-medium">
            {trendIcon} {Math.abs(trend.value)}%
          </span>
        </div>
      )}
    </Card>
  );
}; 