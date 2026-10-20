import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CITIES, FREQUENT_QUESTIONS } from '../data/mockData';
import { formatINR, formatPricePerSqFt } from '../utils/formatters';
import {
  MapPin,
  Search,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Car,
  CheckCircle2,
  Phone,
  MessageSquare,
  ExternalLink,
  FileCheck,
  TrendingUp
} from 'lucide-react';
import { LegalVerificationModal } from '../components/common/LegalVerificationModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { projects, plots } = useApp();

  // Search State
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Project with the largest number of plots currently marked as sold.
  const flagshipProject = projects[0]; // Park Avenue
  const topSellingProject = projects
    .map((project) => {
      const projectPlots = plots.filter((plot) => plot.projectId === project.id);
      return {
        project,
        soldCount: projectPlots.filter((plot) => plot.status === 'SOLD').length,
        plotCount: projectPlots.length,
        availableCount: projectPlots.filter((plot) => plot.status === 'AVAILABLE').length
      };
    })
    .sort((a, b) => b.soldCount - a.soldCount || b.plotCount - a.plotCount)[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedCity) query.set('city', selectedCity);
    if (selectedBudget) query.set('budget', selectedBudget);
    navigate(`/explore?${query.toString()}`);
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] text-[#1c2421]">
      {/* 1. Hero Section: Rich Real Estate Photographic Backdrop (Compact & Tight Gaps) */}
      <section className="relative pt-6 pb-10 sm:pt-8 sm:pb-12 md:pt-10 md:pb-14 overflow-hidden bg-[#0a1f17] text-white">
        {/* Illustrative aerial photo of a plotted residential development */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-land-development.jpg"
            alt="Aerial view of a residential land development with plots and internal roads"
            className="w-full h-full object-cover object-[center_52%] scale-102"
          />
          {/* Keep the hero copy legible while letting the development photo read clearly. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061811]/78 via-[#0c2a1e]/48 to-[#071c14]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f17]/65 via-[#0a1f17]/10 to-[#0a1f17]/25" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 sm:space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#c5a059]/40 text-xs font-semibold shadow-sm">
              <span className="tracking-widest uppercase text-[10px] text-[#d8b879]">LAND. LIFE. POSSIBILITIES.</span>
              <span className="text-white/40">•</span>
              <span className="text-[11px] font-normal text-white">உங்கள் கனவுக்கு, ஒரு புதிய தொடக்கம்.</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08] drop-shadow-sm">
              Land for your <br />
              <span className="italic text-[#f4d58d]">next chapter.</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#d3e3db] leading-relaxed max-w-2xl font-light">
              A home to call your own. An investment in tomorrow. Discover possibilities with Navanext — where your aspirations find their ground. Explore sanctioned gated layouts with interactive 2D masterplans and complimentary private chauffeur inspections.
            </p>
          </div>

          {/* Elevated Floating Search Card */}
          <div className="mt-5 sm:mt-6 max-w-4xl">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/40 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5"
            >
              {/* City Selection */}
              <div className="flex-1 px-3 py-1.5 text-left border-b sm:border-b-0 sm:border-r border-gray-100">
                <label className="block text-[10px] font-semibold text-[#7b998a] uppercase tracking-wider mb-0.5">
                  City / Corridor
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0f2e22] shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-transparent focus:outline-hidden text-[#0f2e22] cursor-pointer"
                  >
                    <option value="">All 8 Cities</option>
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Selection */}
              <div className="flex-1 px-3 py-1.5 text-left">
                <label className="block text-[10px] font-semibold text-[#7b998a] uppercase tracking-wider mb-0.5">
                  Budget
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0f2e22]">₹</span>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-transparent focus:outline-hidden text-[#0f2e22] cursor-pointer"
                  >
                    <option value="">Any Budget</option>
                    <option value="under-40">Under ₹40 L</option>
                    <option value="40-70">₹40 L – ₹70 L</option>
                    <option value="70-100">₹70 L – ₹1 Cr</option>
                    <option value="above-100">Above ₹1 Cr</option>
                  </select>
                </div>
              </div>

              {/* Search CTA */}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Plots</span>
              </button>
            </form>
          </div>

          {/* Quick Real Estate Trust Strip */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#c2d6cd]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d8b879] shrink-0" />
              <span>A clarity-first approach</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d8b879] shrink-0" />
              <span>Tamil Nadu, at heart</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d8b879] shrink-0" />
              <span>100% DTCP & RERA Sanctions</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#d8b879] shrink-0" />
              <span>Free Doorstep Cab Visit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Plotted Developments (Architectural Drafting Tone) */}
      <section className="py-20 bg-[#f5f1ea] border-b border-[#e2dacf] relative overflow-hidden">
        {/* Subtle plot grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2e2209_1px,transparent_1px),linear-gradient(to_bottom,#0f2e2209_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-4 border-b border-[#ded5c7] gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Curated Portfolio
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0f2e22] mt-1">
                Featured Communities
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-semibold text-[#0f2e22] hover:text-[#163e2f] flex items-center gap-1 group"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => {
              const projectPlots = plots.filter((p) => p.projectId === project.id);
              const availableCount = projectPlots.filter((p) => p.status === 'AVAILABLE').length;

              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group flex flex-col justify-between bg-white p-4 rounded-2xl border border-[#ded5c7] shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div className="aspect-16/10 rounded-xl overflow-hidden bg-gray-100 border border-[#e5ece8] relative">
                      <img
                        src={project.heroImage}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-[#0f2e22]/90 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {project.cityName}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#7b998a]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {project.locality}
                        </span>
                        <span className="text-emerald-700 font-semibold">
                          {availableCount} Available
                        </span>
                      </div>

                      <h3 className="font-editorial text-xl font-medium text-[#0f2e22] group-hover:text-[#163e2f] transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-xs text-[#55635c] line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#f0ede6] flex items-baseline justify-between">
                    <span className="text-xs text-[#7b998a]">From</span>
                    <span className="font-sans text-sm font-semibold text-[#0f2e22]">
                      {project.priceRangeText}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Top-selling development */}
      {topSellingProject && (
        <section className="border-y border-[#e2dacf] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 border-b border-[#e5ece8] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#c5a059]" />
                  <span>Most plots sold</span>
                </div>
                <h2 className="font-editorial text-2xl font-normal text-[#0f2e22] sm:text-3xl">Top-Selling Land</h2>
                <p className="mt-1 text-xs text-[#55635c]">The development with the most plots currently marked sold.</p>
              </div>
              <Link
                to={`/projects/${topSellingProject.project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2e22] hover:underline"
              >
                <span>View project details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-[#ded5c7] bg-[#faf8f4] shadow-sm md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#123326] p-6 text-white sm:p-8">
                <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 18% 24%, #8dac70 0 2px, transparent 3px), radial-gradient(circle at 78% 70%, #d3bd83 0 1px, transparent 2px)', backgroundSize: '34px 34px, 25px 25px' }} />
                <div className="relative flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">Top-selling development</span>
                  <span className="text-xs text-[#d8b879]">{topSellingProject.project.cityName}</span>
                </div>
                <div className="relative mt-10">
                  <div className="text-xs uppercase tracking-[.2em] text-[#c2d6cd]">Land / development</div>
                  <div className="mt-2 max-w-lg font-editorial text-3xl leading-tight text-white sm:text-4xl">{topSellingProject.project.name}</div>
                  <div className="mt-3 text-sm text-[#d6e0d8]">{topSellingProject.project.locality}</div>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#7b998a]">Sales snapshot</div>
                <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#e5ece8] bg-white p-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#7b998a]">Plots sold</div>
                    <div className="mt-1 text-lg font-semibold text-[#0f2e22]">{topSellingProject.soldCount}</div>
                  </div>
                  <div className="rounded-xl border border-[#e5ece8] bg-white p-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#7b998a]">Total listed plots</div>
                    <div className="mt-1 text-lg font-semibold text-[#0f2e22]">{topSellingProject.plotCount}</div>
                  </div>
                  <div className="rounded-xl border border-[#e5ece8] bg-white p-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#7b998a]">Available now</div>
                    <div className="mt-1 text-lg font-semibold text-[#0f2e22]">{topSellingProject.availableCount}</div>
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-[#e5ece8] pt-4">
                  <span className="text-xs text-[#7b998a]">Starting price</span>
                  <span className="font-editorial text-2xl text-[#0f2e22]">{formatINR(topSellingProject.project.minPrice)}</span>
                </div>

                <Link
                  to={`/projects/${topSellingProject.project.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#c5a059] px-5 py-3 text-xs font-semibold text-[#0a1f17] transition-colors hover:bg-[#d8b879] sm:w-fit"
                >
                  Explore this land <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Strategic Cities (Warm Regional Corridors) */}
      <section className="py-20 bg-[#faf8f4] border-b border-[#e2dacf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-4 border-b border-[#ded5c7] gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Key Corridors
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0f2e22] mt-1">
                Plotted Markets
              </h2>
            </div>
            <Link
              to="/cities"
              className="text-xs font-semibold text-[#0f2e22] hover:underline flex items-center gap-1"
            >
              <span>All 8 Cities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CITIES.slice(0, 4).map((city) => (
              <Link
                key={city.id}
                to={`/cities/${city.slug}`}
                className="group space-y-3 bg-white p-3 rounded-2xl border border-[#ded5c7] shadow-xs hover:shadow-md transition-all"
              >
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-gray-100 border border-[#e5ece8]">
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <h3 className="font-editorial text-lg font-medium text-[#0f2e22]">
                      {city.name}
                    </h3>
                    <span className="text-[11px] text-[#7b998a] block">
                      Avg {formatPricePerSqFt(city.avgPricePerSqFt)}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#7b998a] group-hover:text-[#0f2e22] transition-colors">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Methodology (Deep Emerald Real Estate Section) */}
      <section className="py-20 bg-[#0c241b] text-white border-y border-[#183d2f] relative overflow-hidden">
        {/* Subtle blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d8b879]">
              THE NAVA NEXT APPROACH
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-white mt-1">
              A Direct Buying Process
            </h2>
            <p className="text-xs text-[#a9c4b7] mt-2">
              Good decisions begin with honest conversations. Ask for ownership records, layout approvals, and complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#123326] p-6 rounded-2xl border border-[#1f4a38] space-y-3">
              <span className="font-mono text-sm font-bold text-[#d8b879]">01</span>
              <h3 className="font-editorial text-lg font-medium text-white">
                Layout Masterplan
              </h3>
              <p className="text-xs text-[#c2d6cd] leading-relaxed">
                Review 2D layout drawings with sanctioned dimensions, road widths, and direct developer pricing without middleman calls.
              </p>
            </div>

            <div className="bg-[#123326] p-6 rounded-2xl border border-[#1f4a38] space-y-3">
              <span className="font-mono text-sm font-bold text-[#d8b879]">02</span>
              <h3 className="font-editorial text-lg font-medium text-white">
                Complimentary Cab Visit
              </h3>
              <p className="text-xs text-[#c2d6cd] leading-relaxed">
                Schedule a dedicated chauffeur pickup and return from your residence to inspect ground conditions firsthand.
              </p>
            </div>

            <div className="bg-[#123326] p-6 rounded-2xl border border-[#1f4a38] space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-sm font-bold text-[#d8b879]">03</span>
                <h3 className="font-editorial text-lg font-medium text-white">
                  Verified Clear Title
                </h3>
                <p className="text-xs text-[#c2d6cd] leading-relaxed">
                  Review verified parent deeds, DTCP/CMDA sanction blueprint, and nationalized bank loan approvals with 0% brokerage.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLegalModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#d8b879] hover:text-white transition-colors font-semibold cursor-pointer pt-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#d8b879]" />
                <span>Inspect 7-Point Legal Dossier &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Signature Contact Banner from Navanext */}
      <section className="py-14 bg-gradient-to-r from-[#113828] via-[#0d2d20] to-[#0a2318] text-white border-b border-[#1b4332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d8b879]">
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
              Let’s talk about your tomorrow.
            </h2>
            <p className="text-xs text-[#c2d6cd]">
              A simple conversation. A clearer path to owning land.
            </p>
            <p className="text-xs text-[#d8b879] font-medium">
              உங்கள் கனவுக்கு, ஒரு புதிய தொடக்கம்.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+917200386806"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0f2e22] text-xs font-semibold hover:bg-[#f7f5f0] transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 text-[#0f2e22]" />
              <span>+91 72003 86806</span>
            </a>
            <a
              href="https://wa.me/917200386806?text=Hello%20Navanext%2C%20I%20am%20interested%20in%20exploring%20plots%20in%20Tamil%20Nadu.%20Please%20share%20the%20available%20locations%20and%20details."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQs (Accordion) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
            Clarifications
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0f2e22]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#e5ece8] border-y border-[#e5ece8]">
          {FREQUENT_QUESTIONS.slice(0, 4).map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-editorial font-medium text-base sm:text-lg text-[#0f2e22]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#c5a059] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-xs text-[#55635c] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Legal Due Diligence Dossier Modal */}
      <LegalVerificationModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        project={flagshipProject}
      />
    </div>
  );
};
