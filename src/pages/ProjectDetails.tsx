import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PlotSitePlan } from '../components/plots/PlotSitePlan';
import { PlotComparisonModal } from '../components/plots/PlotComparisonModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import type { Plot } from '../types';

import {
  MapPin,
  Car,
  Bookmark,
  Share2,
  CheckCircle2,
  Layers,
  Scale,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { LegalVerificationModal } from '../components/common/LegalVerificationModal';
import { PlotAppreciationCalculator } from '../components/plots/PlotAppreciationCalculator';

export const ProjectDetails: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    getProjectBySlug,
    getPlotsForProject,
    toggleSaveProject,
    isProjectSaved,
    showToast,
    comparisonPlotIds
  } = useApp();

  const project = getProjectBySlug(projectSlug || 'park-avenue');
  const projectPlots = project ? getPlotsForProject(project.id) : [];

  // Selected Plot state
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Check URL param ?plotId=... to auto-open drawer
  useEffect(() => {
    const plotIdFromUrl = searchParams.get('plotId');
    if (plotIdFromUrl && projectPlots.length > 0) {
      const match = projectPlots.find((p) => p.id === plotIdFromUrl);
      if (match) setSelectedPlot(match);
    }
  }, [searchParams, projectPlots]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center font-sans-clean">
        <div className="space-y-4 max-w-md">
          <Layers className="w-12 h-12 text-[#7b998a] mx-auto" />
          <h2 className="font-editorial text-2xl text-[#0f2e22]">
            Project Not Found
          </h2>
          <p className="text-xs text-[#55635c]">
            The requested plotted development does not exist.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0f2e22]"
          >
            Explore All Enclaves
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = isProjectSaved(project.id);
  const availableCount = projectPlots.filter((p) => p.status === 'AVAILABLE').length;
  const reservedCount = projectPlots.filter((p) => p.status === 'RESERVED').length;
  const soldCount = projectPlots.filter((p) => p.status === 'SOLD').length;

  const handleShareProject = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Project link copied to clipboard', 'info');
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Editorial Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Explore', href: '/explore' },
              { label: project.cityName, href: `/cities/${project.cityId}` },
              { label: project.name }
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                <span>{project.approvalAuthority} Sanctioned • Ref #{project.approvalNumber}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0f2e22] tracking-tight">
                {project.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#55635c]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0f2e22]" />
                  {project.locality}, {project.cityName}
                </span>
                <span>•</span>
                <span>{project.totalAreaAcres} Acres</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{availableCount} Plots Available</span>
              </div>
            </div>

            {/* Price & Primary Action */}
            <div className="flex flex-col sm:items-end gap-3">
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#7b998a] block">Starting from</span>
                <div className="font-sans text-2xl font-bold text-[#0f2e22]">
                  {project.priceRangeText}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareProject}
                  className="p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-[#55635c] transition-colors"
                  title="Share"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleSaveProject(project.id)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isSaved
                      ? 'bg-[#c5a059] text-[#0a1f17] border-[#c5a059]'
                      : 'border-gray-300 hover:bg-gray-50 text-[#55635c]'
                  }`}
                  title="Save"
                  aria-label="Save"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsLegalModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#0f2e22] bg-[#e5ece8] hover:bg-[#d4ded7] transition-colors cursor-pointer"
                  title="View Verified DTCP / RERA Clearances"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Legal Clearances</span>
                </button>

                <Link
                  to={`/site-visit?projectId=${project.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Free Site Visit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-16">
        {/* Gallery & Quick Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Photo & Thumbnails */}
          <div className="lg:col-span-8 space-y-3">
            <div className="aspect-16/10 rounded-xl overflow-hidden bg-gray-100 border border-[#e5ece8]">
              <img
                src={project.galleryImages[activeImageIndex] || project.heroImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {project.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#0f2e22] ring-1 ring-[#0f2e22]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Dossier Specs */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#e5ece8] space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Specifications
              </span>
              <h3 className="font-editorial text-lg font-medium text-[#0f2e22] mt-0.5">
                Enclave Summary
              </h3>
            </div>

            <div className="space-y-2 text-xs divide-y divide-gray-100">
              <div className="flex justify-between py-1.5">
                <span className="text-[#55635c]">Total Acreage</span>
                <span className="font-medium text-[#0f2e22]">{project.totalAreaAcres} Acres</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#55635c]">Total Parcels</span>
                <span className="font-medium text-[#0f2e22]">{project.totalPlots} Units</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#55635c]">Available for Sale</span>
                <span className="font-semibold text-emerald-700">{availableCount} Units</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#55635c]">In Process</span>
                <span className="font-semibold text-amber-700">{reservedCount} Units</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#55635c]">Sold</span>
                <span className="font-semibold text-rose-700">{soldCount} Units</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#55635c]">Road Widths</span>
                <span className="font-medium text-[#0f2e22]">30ft & 40ft Blacktop</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e5ece8]">
              <div className="text-xs font-medium text-[#0f2e22]">{project.developer.name}</div>
              <div className="text-[11px] text-[#7b998a]">
                {project.developer.experienceYears} Years Track Record • {project.developer.completedProjects} Projects Delivered
              </div>
            </div>

            {comparisonPlotIds.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(true)}
                className="w-full py-2 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Plots ({comparisonPlotIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* CORE INTERACTIVE SECTION: Masterplan Site Layout */}
        <section id="site-plan-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-[#e5ece8] gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Interactive Blueprint
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0f2e22] mt-0.5">
                Masterplan Layout
              </h2>
            </div>
            <p className="text-xs text-[#55635c]">
              Click any numbered plot polygon to inspect dimensions, pricing, and book a visit.
            </p>
          </div>

          <PlotSitePlan
            project={project}
            plots={projectPlots}
            selectedPlot={selectedPlot}
            onSelectPlot={(plot) => setSelectedPlot(plot)}
            onOpenEmiModal={(plot) => {
              navigate(`/emi-calculator?price=${plot.price}&plotNumber=${plot.plotNumber}`);
            }}
          />
        </section>

        {/* Infrastructure & Amenities */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[#e5ece8]">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
              Infrastructure
            </span>
            <h3 className="font-editorial text-2xl font-normal text-[#0f2e22] mt-0.5">
              On-Site Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#e5ece8] space-y-1.5"
              >
                <h4 className="font-editorial text-base font-medium text-[#0f2e22]">
                  {amenity.name}
                </h4>
                <p className="text-xs text-[#55635c] leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Transit */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#e5ece8] space-y-4">
            <h4 className="font-editorial text-xl font-normal text-[#0f2e22]">
              Key Landmarks
            </h4>
            <div className="divide-y divide-gray-100 text-xs">
              {project.landmarks.map((landmark, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <span className="text-[#1c2421]">{landmark.name}</span>
                  <span className="text-[#7b998a] font-medium">{landmark.distance}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#e5ece8] space-y-4">
            <h4 className="font-editorial text-xl font-normal text-[#0f2e22]">
              Road & Corridor Access
            </h4>
            <ul className="space-y-2.5 text-xs text-[#55635c]">
              {project.roadConnectivity.map((conn, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                  <span>{conn}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Real Estate Appreciation & ROI Horizon */}
        <section className="space-y-4">
          <PlotAppreciationCalculator
            initialPrice={project.minPrice}
            projectName={project.name}
          />
        </section>

        {/* Disclaimer */}
        <div className="text-[11px] text-[#7b998a] leading-relaxed border-t border-[#e5ece8] pt-6">
          <strong>Statutory Disclosure:</strong> Plot boundaries and dimensions shown are based on the sanctioned layout plan #{project.approvalNumber} issued by {project.approvalAuthority}. Physical copies of the approved blueprint and title deed documentation are available during your site inspection.
        </div>
      </div>

      {/* Comparison Modal */}
      <PlotComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      {/* Legal Due Diligence Dossier Modal */}
      <LegalVerificationModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        project={project}
      />
    </div>
  );
};
