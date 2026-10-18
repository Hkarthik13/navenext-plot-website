import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-1">
      <ol className="flex items-center space-x-2 text-xs sm:text-sm text-[#55635c]">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#0f2e22] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#7b998a]" />
            <span className="sr-only sm:not-sr-only font-medium">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-[#0f2e22] font-semibold truncate max-w-[200px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-[#0f2e22] transition-colors font-medium truncate max-w-[160px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
