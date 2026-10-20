import React from 'react';
import { PlotStatus } from '../../types';

interface StatusBadgeProps {
  status: PlotStatus;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true
}) => {
  const configs = {
    AVAILABLE: {
      label: 'Available',
      bg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
      dot: 'bg-emerald-600',
      description: 'Ready for booking & immediate registration'
    },
    RESERVED: {
      label: 'In Process / Reserved',
      bg: 'bg-amber-50 text-amber-900 border-amber-300',
      dot: 'bg-amber-500',
      description: 'Under token verification or bank loan sanction'
    },
    SOLD: {
      label: 'Sold Out',
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      dot: 'bg-rose-500',
      description: 'Registered to property owner'
    },
    UNAVAILABLE: {
      label: 'Unavailable',
      bg: 'bg-slate-100 text-slate-700 border-slate-300',
      dot: 'bg-slate-500',
      description: 'Not available for booking'
    }
  };

  const current = configs[status] || configs.AVAILABLE;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs font-sans-clean ${sizeClasses[size]} ${current.bg}`}
    >
      {showDot && (
        <span
          className={`h-2 w-2 rounded-full ${current.dot} ${
            status === 'AVAILABLE' ? 'animate-pulse' : ''
          }`}
        />
      )}
      {current.label}
    </span>
  );
};

export const DemoTag: React.FC<{ label?: string }> = ({ label = 'Demo Preview' }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1e4d3b]/10 text-[#163e2f] border border-[#1e4d3b]/20">
    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
    {label}
  </span>
);
