import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryError, setEnquiryError] = useState('');

  React.useEffect(() => {
    setShowEnquiryForm(false);
    setEnquirySent(false);
    setEnquiryName('');
    setEnquiryPhone('');
    setEnquiryError('');
  }, [plot?.id]);

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

  const handleEnquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedName = String(formData.get('customerName') || enquiryName).trim();
    const submittedPhone = String(formData.get('customerPhone') || enquiryPhone).trim();
    const cleanPhone = submittedPhone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    if (!submittedName) {
      setEnquiryError('Please enter your name.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setEnquiryError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    try {
      submitEnquiry({
        name: submittedName,
        phone: submittedPhone,
        email: '',
        projectId: project.id,
        projectName: project.name,
        plotNumber: plot.plotNumber,
        type: 'plot_inquiry',
        message: `Enquiry for Plot #${plot.plotNumber} (${plot.dimensions}, ${plot.areaSqFt} sq.ft, ${plot.status.toLowerCase()})`
      });
      setEnquiryError('');
      setEnquirySent(true);
    } catch (error) {
      console.error('Plot enquiry submission failed:', error);
      setEnquiryError('Enquiry could not be sent. Please try again.');
    }
  };

  const isAvailable = plot.status === 'AVAILABLE';
  const isReserved = plot.status === 'RESERVED';
  const isSold = plot.status === 'SOLD';
  const isUnavailable = plot.status === 'UNAVAILABLE';

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
              <span className="font-semibold text-white">{plot.facing ?? 'To be confirmed'}</span>
              {plot.facing && (plot.facing.includes('East') || plot.facing.includes('North')) && (
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

        {isUnavailable && (
          <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-700/60 text-slate-200 text-xs">
            <div className="font-semibold mb-0.5 text-slate-100">Plot Unavailable</div>
            <p className="text-slate-300/80 leading-relaxed text-[11px]">
              This plot is not currently offered for booking. Contact Navanext to confirm its status.
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

      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-[#0f221a] border-t border-[#1b3327] space-y-2 shrink-0">
        <button
          type="button"
          onClick={() => {
            setEnquirySent(false);
            setEnquiryError('');
            setShowEnquiryForm(true);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors shadow-md"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Enquire about Plot #{plot.plotNumber}</span>
        </button>

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
                  `Hello Navanext, I am interested in Plot #${plot.plotNumber} (${plot.areaSqFt} sq.ft, ${plot.facing ?? 'facing to be confirmed'}) in ${project.name}. Please share layout drawing and price breakdown.`
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
              onClick={() => {
                if (onOpenEmiModal) onOpenEmiModal(plot);
                else navigate(`/emi-calculator?price=${plot.price}&plotNumber=${plot.plotNumber}`);
              }}
              className="w-full py-1.5 text-center text-xs text-[#8fa89b] hover:text-white transition-colors"
            >
              Estimate EMI & Amortization
            </button>
          </>
        ) : isSold ? (
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
        ) : (
          <div className="space-y-1">
            <button
              disabled
              className="w-full py-2 px-4 rounded-lg font-medium text-xs text-gray-500 bg-[#16231c] cursor-not-allowed border border-[#23382c]"
            >
              Plot Unavailable (Booking Disabled)
            </button>
            <p className="text-[10px] text-center text-[#7b998a]">
              Please contact Navanext to confirm availability.
            </p>
          </div>
        )}
      </div>

      {showEnquiryForm && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowEnquiryForm(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="plot-enquiry-title"
            className="w-full max-w-sm rounded-xl border border-[#294536] bg-[#0c1813] p-5 text-white shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 id="plot-enquiry-title" className="font-editorial text-xl">Enquire about Plot #{plot.plotNumber}</h3>
                <p className="mt-1 text-xs text-[#8fa89b]">Share your contact details and our team will get in touch.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEnquiryForm(false)}
                className="rounded-md p-1.5 text-[#8fa89b] hover:bg-[#162e24] hover:text-white"
                aria-label="Close enquiry form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {enquirySent ? (
              <div aria-live="polite" className="py-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b879]/40 bg-[#c5a059]/15 text-4xl" role="img" aria-label="Plot enquiry sent">
                  🏡
                </div>
                <p className="text-lg font-semibold text-white">Details sent!</p>
                <p className="mt-1 text-sm text-[#8fa89b]">Your enquiry for Plot #{plot.plotNumber} has been sent. Our team will contact you.</p>
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(false)}
                  className="mt-5 w-full rounded-lg bg-[#c5a059] py-3 text-sm font-semibold text-[#0a1f17] transition-colors hover:bg-[#d8b879]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3">
                <div>
                  <label htmlFor="plot-enquiry-name" className="mb-1 block text-xs text-[#c2d1c9]">Your name</label>
                  <input
                    id="plot-enquiry-name"
                    name="customerName"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    required
                    value={enquiryName}
                    onChange={(event) => {
                      setEnquiryName(event.target.value);
                      setEnquiryError('');
                    }}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-[#234737] bg-[#0a1611] p-3 text-sm text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label htmlFor="plot-enquiry-phone" className="mb-1 block text-xs text-[#c2d1c9]">Mobile number</label>
                  <input
                    id="plot-enquiry-phone"
                    name="customerPhone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={enquiryPhone}
                    onChange={(event) => {
                      setEnquiryPhone(event.target.value);
                      setEnquiryError('');
                    }}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-[#234737] bg-[#0a1611] p-3 text-sm text-white outline-none focus:border-[#c5a059]"
                  />
                  <p className="mt-1 text-[10px] text-[#7b998a]">Enter a valid 10-digit Indian mobile number.</p>
                </div>
              {enquiryError && <p role="alert" className="text-xs text-rose-300">{enquiryError}</p>}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#c5a059] py-3 text-sm font-semibold text-[#0a1f17] transition-colors hover:bg-[#d8b879]"
                >
                  Send enquiry
                </button>
              </form>
            )}
          </section>
        </div>,
        document.fullscreenElement || document.body
      )}
    </div>
    </>
  );
};
