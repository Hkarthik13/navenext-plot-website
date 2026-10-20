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
      {/* Navanext mark */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 shrink-0"
      >
        <path
          d="M6 32V8L34 32V8M6 32L20 20L34 32"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col text-left">
        <div className="flex items-baseline">
          <span className={`font-sans font-semibold text-[17px] tracking-tight lowercase leading-tight ${textColor}`}>
            nava<span className="text-[#c5a059]">next</span>
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
