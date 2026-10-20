import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  Layers,
  ArrowRight,
  Bookmark,
  Phone
} from 'lucide-react';

import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { savedPlotIds, bookings } = useApp();

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Cities', path: '/cities' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Site Visit', path: '/site-visit' },
    {
      name: 'Saved Plots',
      path: '/my-saved-plots',
      badge: savedPlotIds.length > 0 ? savedPlotIds.length : undefined
    },
    {
      name: 'My Bookings',
      path: '/my-bookings',
      badge: bookings.length > 0 ? bookings.length : undefined
    },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f2e22] text-white border-b border-[#163e2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center group focus:outline-hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Navanext Home"
          >
            <Logo isLight={false} />
          </Link>

          {/* Desktop Navigation Links (Simplified to Essential Items) */}
          <nav className="hidden lg:flex items-center space-x-1 font-sans-clean text-xs">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    active
                      ? 'text-white bg-[#163e2f]'
                      : 'text-[#c2d1c9] hover:text-white hover:bg-[#163e2f]/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#c5a059] text-[#0a1f17]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Single Distinct Primary CTA & Concierge Call */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917200386806"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#c2d1c9] hover:text-[#d8b879] transition-colors py-1 px-2 rounded-md hover:bg-[#163e2f]/50"
              title="Call Real Estate Advisor"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>+91 72003 86806</span>
            </a>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors shadow-xs"
            >
              <span>Explore Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/my-saved-plots"
              className="p-1.5 text-[#c2d1c9] hover:text-white relative"
              aria-label="Saved Plots"
            >
              <Bookmark className="w-4 h-4" />
              {savedPlotIds.length > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#c5a059] text-[#0a1f17] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedPlotIds.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-[#c2d1c9] hover:text-white hover:bg-[#163e2f] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1f17] border-b border-[#163e2f] px-4 pt-3 pb-6 space-y-1 font-sans-clean text-xs">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${
                  active ? 'text-white bg-[#163e2f]' : 'text-[#c2d1c9] hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#c5a059] text-[#0a1f17]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#163e2f]">
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] flex items-center justify-center gap-1.5"
            >
              <span>Explore Available Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
