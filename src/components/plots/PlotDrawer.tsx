import React, { useState } from 'react';
import { Plot, Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';
import { formatINR, formatPricePerSqFt, formatSqFt } from '../../utils/formatters';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Car,
  Calculator,
  Bookmark,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  MessageSquare,
  Scale
} from 'lucide-react';

interface PlotDrawerProps {
  plot: Plot | null;
  project: Project;
  onClose: () => void;
  onOpenEmiModal?: (plot: Plot) => void;
  className?: string;
}

export const PlotDrawer: React.FC<PlotDrawerProps> = ({
  plot,
  project,
  onClose,
  onOpenEmiModal,
  className = ''
}) => {
  const navigate = useNavigate();
  const {
    toggleSavePlot,
    isPlotSaved,
    showToast,
    submitEnquiry,
    toggleComparisonPlot,
    isPlotInComparison
  } = useApp();
  const [copied, setCopied] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');

  if (!plot) return null;

  const saved = isPlotSaved(plot.id);
  const inComparison = isPlotInComparison(plot.id);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/projects/${project.slug}?plotId=${plot.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      showToast(`Link for Plot #${plot.plotNumber} copied`, 'info');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) {
      showToast('Please provide your name and phone number', 'warning');
      return;
    }
    submitEnquiry({
      name: enquiryName,
      phone: enquiryPhone,
      email: '',
      projectId: project.id,
      projectName: project.name,
      plotNumber: plot.plotNumber,
      type: 'plot_inquiry',
      message: `Enquiry for Plot #${plot.plotNumber} (${plot.dimensions}, ${plot.areaSqFt} sq.ft)`
    });
    setShowEnquiryForm(false);
    setEnquiryName('');
    setEnquiryPhone('');
    showToast('Enquiry submitted successfully', 'success');
  };

  const isAvailable = plot.status === 'AVAILABLE';
  const isReserved = plot.status === 'RESERVED';
  const isSold = plot.status === 'SOLD';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className="lg:hidden fixed inset-0 bg-black/65 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-2xl border-t-2 border-[#c5a059] lg:static lg:inset-auto lg:z-20 lg:rounded-none lg:border-t-0 lg:border-l lg:border-[#1b3327] lg:max-h-none w-full lg:w-[380px] xl:w-[410px] shrink-0 bg-[#0c1813] text-white flex flex-col font-sans-clean overflow-hidden shadow-2xl animate-page-enter ${className}`}
      >
        {/* Mobile Pull Handle */}
        <div className="lg:hidden flex justify-center pt-2.5 pb-1 bg-[#0f221a]">
          <div className="w-12 h-1.5 bg-[#2a4d3a] rounded-full" />
        </div>
      {/* Top Header */}
      <div className="px-5 py-3.5 bg-[#0f221a] border-b border-[#1b3327] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-editorial text-2xl font-normal text-white">
            Plot #{plot.plotNumber}
          </span>
          <StatusBadge status={plot.status} size="sm" />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-1.5 text-[#8fa89b] hover:text-white rounded-md hover:bg-[#162e24] transition-colors"
            title="Share Plot"
            aria-label="Share Plot"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => toggleSavePlot(plot.id)}
            className={`p-1.5 rounded-md transition-colors ${
              saved
                ? 'text-[#c5a059] bg-[#1a3528]'
                : 'text-[#8fa89b] hover:text-white hover:bg-[#162e24]'
            }`}
            title="Save Plot"
            aria-label="Save Plot"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8fa89b] hover:text-white rounded-md hover:bg-[#162e24] transition-colors ml-1"
            title="Close"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body: Clear Information Hierarchy */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Primary Information: Price & Area */}
        <div className="space-y-1 pb-3 border-b border-[#1b3327]">
          <div className="text-[11px] uppercase tracking-wider text-[#7b998a] font-semibold">
            Direct Developer Price
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-editorial text-2xl sm:text-3xl font-medium text-white">
              {formatINR(plot.price)}
            </span>
            <span className="text-xs text-[#8fa89b]">
              ({formatPricePerSqFt(plot.pricePerSqFt)})
            </span>
          </div>
          <div className="text-xs text-[#8fa89b] pt-0.5">
            Plot Area: <strong className="text-white font-semibold">{formatSqFt(plot.areaSqFt)}</strong>
          </div>
        </div>

        {/* Compact Metadata Grid with Vastu and Specifications */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-2.5 bg-[#12241c] rounded-lg border border-[#1f3a2d]">
            <div className="flex items-center justify-between text-[#7b998a] text-[10px] mb-0.5 font-medium">
              <span>Facing</span>
              <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-white">{plot.facing}</span>
              {(plot.facing.includes('East') || plot.facing.includes('North')) && (
                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold px-1.5 py-0.2 rounded">
                  Vastu
                </span>
              )}
            </div>
          </div>

          <div className="p-2.5 bg-[#12241c] rounded-lg border border-[#1f3a2d]">
            <span className="text-[#7b998a] block text-[10px] mb-0.5 font-medium">Dimensions</span>
            <span className="font-semibold text-white">{plot.dimensions}</span>
          </div>

          <div className="p-2.5 bg-[#12241c] rounded-lg border border-[#1f3a2d]">
            <span className="text-[#7b998a] block text-[10px] mb-0.5 font-medium">Road Width</span>
            <span className="font-semibold text-white">{plot.roadWidthFt} FT Blacktop</span>
          </div>

          <div className="p-2.5 bg-[#12241c] rounded-lg border border-[#1f3a2d]">
            <span className="text-[#7b998a] block text-[10px] mb-0.5 font-medium">Layout Type</span>
            <span className="font-semibold text-white truncate block">
              {plot.cornerPlot ? 'Corner Villa Plot' : 'Standard Plot'}
            </span>
          </div>
        </div>

        {/* Status Messaging */}
        {isReserved && (
          <div className="p-3 bg-amber-950/40 rounded-lg border border-amber-800/60 text-amber-200 text-xs">
            <div className="font-semibold mb-0.5 text-amber-300">Plot In Process / Reserved</div>
            <p className="text-amber-200/80 leading-relaxed text-[11px]">
              A reservation token is currently in process. You can join the priority waitlist if the token expires.
            </p>
          </div>
        )}

        {isSold && (
          <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/60 text-rose-200 text-xs">
            <div className="font-semibold mb-0.5 text-rose-300">Plot Sold Out</div>
            <p className="text-rose-200/80 leading-relaxed text-[11px]">
              Registration complete. Explore neighboring available plots highlighted in green.
            </p>
          </div>
        )}

        {/* Progressive Disclosure: Additional Details */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#c2d1c9] py-2 border-y border-[#1b3327] hover:text-white transition-colors"
          >
            <span>{showFullDetails ? 'Hide additional specifications' : 'View full specifications & approval'}</span>
            {showFullDetails ? <ChevronUp className="w-4 h-4 text-[#7b998a]" /> : <ChevronDown className="w-4 h-4 text-[#7b998a]" />}
          </button>

          {showFullDetails && (
            <div className="pt-3 space-y-2.5 text-xs text-[#8fa89b] leading-relaxed">
              <div className="flex justify-between py-1 border-b border-[#182b21]">
                <span>Sanction Authority:</span>
                <span className="font-medium text-white">{project.approvalAuthority}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#182b21]">
                <span>Title Status:</span>
                <span className="font-medium text-emerald-400">Clear Title • Patta Eligible</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#182b21]">
                <span>Phase / Sector:</span>
                <span className="font-medium text-white">{plot.phase || 'Phase 1'}</span>
              </div>
              {plot.notes && (
                <div className="p-2.5 bg-[#12241c] rounded-md text-[11px] text-[#c2d1c9] border border-[#1f3a2d]">
                  💡 {plot.notes}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Enquiry Form (if expanded) */}
        {showEnquiryForm && (
          <form onSubmit={handleEnquirySubmit} className="p-3.5 bg-[#12241c] rounded-lg border border-[#1f3a2d] space-y-2.5">
            <div className="font-editorial text-sm font-medium text-white">
              Instant Enquiry for Plot #{plot.plotNumber}
            </div>
            <div>
              <label className="text-[10px] text-[#8fa89b] block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={enquiryName}
                onChange={(e) => setEnquiryName(e.target.value)}
                placeholder="Full Name"
                className="w-full text-xs p-2 rounded-md bg-[#0a1611] text-white border border-[#234737] focus:outline-hidden focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#8fa89b] block mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={enquiryPhone}
                onChange={(e) => setEnquiryPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs p-2 rounded-md bg-[#0a1611] text-white border border-[#234737] focus:outline-hidden focus:border-[#c5a059]"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-1.5 text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] rounded-md transition-colors"
              >
                Send Request
              </button>
              <button
                type="button"
                onClick={() => setShowEnquiryForm(false)}
                className="py-1.5 px-3 text-xs text-[#8fa89b] bg-[#162e24] rounded-md hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-[#0f221a] border-t border-[#1b3327] space-y-2 shrink-0">
        {isAvailable ? (
          <>
            <Link
              to={`/site-visit?projectId=${project.id}&plotId=${plot.id}&plotNumber=${plot.plotNumber}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors shadow-md"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Book Free Site Visit for Plot #{plot.plotNumber}</span>
            </Link>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={`https://wa.me/917200386806?text=${encodeURIComponent(
                  `Hello Navanextventures, I am interested in Plot #${plot.plotNumber} (${plot.areaSqFt} sq.ft, ${plot.facing} facing) in ${project.name}. Please share layout drawing and price breakdown.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors shadow-2xs"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onOpenEmiModal) {
                    onOpenEmiModal(plot);
                  } else {
                    navigate(`/emi-calculator?price=${plot.price}&plotNumber=${plot.plotNumber}`);
                  }
                }}
                className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-medium text-[#c2d1c9] hover:text-white bg-[#162e24] hover:bg-[#1d3d30] border border-[#234737] transition-colors"
                title="Calculate Loan EMI"
              >
                <Calculator className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>EMI</span>
              </button>

              <button
                type="button"
                onClick={() => toggleComparisonPlot(plot.id)}
                className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-medium border transition-colors ${
                  inComparison
                    ? 'bg-[#c5a059] text-[#0a1f17] border-[#c5a059] font-bold'
                    : 'bg-[#162e24] text-[#8fa89b] hover:text-white border-[#234737]'
                }`}
                title="Add to Comparison"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{inComparison ? 'Compared' : 'Compare'}</span>
              </button>
            </div>
          </>
        ) : isReserved ? (
          <>
            <button
              type="button"
              onClick={() => setShowEnquiryForm(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors"
            >
              <span>Join Priority Waitlist</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenEmiModal) onOpenEmiModal(plot);
                else navigate(`/emi-calculator?price=${plot.price}&plotNumber=${plot.plotNumber}`);
              }}
              className="w-full py-1.5 text-center text-xs text-[#8fa89b] hover:text-white transition-colors"
            >
              Estimate EMI & Amortization
            </button>
          </>
        ) : (
          <div className="space-y-1">
            <button
              disabled
              className="w-full py-2 px-4 rounded-lg font-medium text-xs text-gray-500 bg-[#16231c] cursor-not-allowed border border-[#23382c]"
            >
              Plot Sold Out (Booking Disabled)
            </button>
            <p className="text-[10px] text-center text-[#7b998a]">
              Please choose any available (green) plot on the layout.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
