import React from 'react';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  isLight = false,
  showTagline = true
}) => {
  const textColor = isLight ? 'text-[#0f2e22]' : 'text-white';
  const strokeColor = isLight ? '#0f2e22' : '#ffffff';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric Origami "N" Emblem from promoterdemo.lovable.app */}
      <svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 shrink-0"
      >
        <polyline
          points="5,22 5,6 21,22 21,6"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="22" r="1.5" fill="#c5a059" />
      </svg>

      <div className="flex flex-col text-left">
        <div className="flex items-baseline">
          <span className={`font-sans font-medium text-[17px] tracking-tight lowercase leading-tight ${textColor}`}>
            navanextventures
          </span>
          <span className="text-[#c5a059] font-bold text-[17px] leading-none">.</span>
        </div>
        {showTagline && (
          <span className="text-[7.5px] font-bold tracking-[0.22em] text-[#7b998a] uppercase -mt-0.5 leading-tight">
            LAND. LIFE. POSSIBILITIES.
          </span>
        )}
      </div>
    </div>
  );
};
