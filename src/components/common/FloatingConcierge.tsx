import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Phone,
  Car,
  Scale,
  ArrowUp,
  X,
  Compass
} from 'lucide-react';
import { PlotComparisonModal } from '../plots/PlotComparisonModal';

export const FloatingConcierge: React.FC = () => {
  const { comparisonPlotIds } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Bottom Concierge & Actions */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 font-sans-clean select-none">
        
        {/* Floating Compare Plots Pill if plots are selected */}
        {comparisonPlotIds.length > 0 && (
          <div className="bg-[#0f2e22] text-white px-3.5 py-2 rounded-full shadow-2xl border border-[#c5a059] flex items-center gap-2.5 animate-bounce text-xs">
            <Scale className="w-4 h-4 text-[#c5a059]" />
            <span className="font-medium">
              Comparing <strong className="text-[#f4d58d]">{comparisonPlotIds.length}</strong> {comparisonPlotIds.length === 1 ? 'Plot' : 'Plots'}
            </span>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="bg-[#c5a059] hover:bg-[#d8b879] text-[#0a1f17] font-bold text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              View Compare
            </button>
          </div>
        )}

        {/* Speed-dial / Expanded options */}
        {isMenuOpen && (
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-[#c2d1c9] flex flex-col gap-1.5 min-w-[210px] animate-page-enter text-xs text-[#0f2e22]">
            <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-[#7b998a]">
                Land Concierge Desk
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-md"
                aria-label="Close Concierge"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href="https://wa.me/917200386806?text=Hello%20Navanext%2C%20I%20am%20interested%20in%20verifying%20plots%20in%20Tamil%20Nadu.%20Please%20guide%20me."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50 text-emerald-800 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-xs leading-none">WhatsApp Advisor</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Instant plot layout details</div>
              </div>
            </a>

            <a
              href="tel:+917200386806"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-[#0f2e22] text-[#c5a059] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-xs leading-none">Call Desk</div>
                <div className="text-[10px] text-gray-500 mt-0.5">+91 72003 86806</div>
              </div>
            </a>

            <Link
              to="/site-visit"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-900 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-[#c5a059] text-[#0a1f17] flex items-center justify-center shrink-0">
                <Car className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-xs leading-none">Book Free Cab Visit</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Complimentary pickup & drop</div>
              </div>
            </Link>

            <Link
              to="/emi-calculator"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-gray-100 text-[#0f2e22] flex items-center justify-center shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-xs leading-none">EMI & Land ROI</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Calculate monthly loan</div>
              </div>
            </Link>
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex items-center gap-2">
          {/* Scroll To Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/95 text-[#0f2e22] shadow-lg border border-[#c2d1c9] hover:bg-[#0f2e22] hover:text-white transition-all flex items-center justify-center cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}

          {/* Quick WhatsApp Direct Button */}
          <a
            href="https://wa.me/917200386806?text=Hello%20Navanext%2C%20I%20am%20interested%20in%20verifying%20plots%20in%20Tamil%20Nadu.%20Please%20guide%20me."
            target="_blank"
            rel="noreferrer"
            className="h-11 px-3.5 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] transition-all flex items-center gap-2 cursor-pointer font-medium text-xs hover:shadow-2xl"
            title="Chat with Real Estate Advisor on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp Help</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </a>

          {/* Concierge Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-11 h-11 rounded-full shadow-xl flex items-center justify-center transition-all cursor-pointer ${
              isMenuOpen
                ? 'bg-white text-[#0f2e22] border border-[#c2d1c9]'
                : 'bg-[#0f2e22] text-[#c5a059] border border-[#163e2f] hover:bg-[#163e2f]'
            }`}
            title="Real Estate Support & Quick Tools"
            aria-label="Open Concierge Menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Global Comparison Modal */}
      <PlotComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </>
  );
};
