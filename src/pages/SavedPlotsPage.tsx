import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StatusBadge } from '../components/common/Badge';
import { PlotComparisonModal } from '../components/plots/PlotComparisonModal';
import { formatINR, formatPricePerSqFt, formatSqFt } from '../utils/formatters';

import {
  Scale,
  Car,
  Trash2,
  MapPin
} from 'lucide-react';

export const SavedPlotsPage: React.FC = () => {
  const {
    savedPlotIds,
    plots,
    projects,
    toggleSavePlot,
    toggleComparisonPlot,
    isPlotInComparison
  } = useApp();

  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const savedPlotsList = plots.filter((p) => savedPlotIds.includes(p.id));

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Saved Plots' }]} />
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Shortlist
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0f2e22] mt-0.5">
                Saved Plots ({savedPlotsList.length})
              </h1>
            </div>

            {savedPlotsList.length > 1 && (
              <button
                type="button"
                onClick={() => setIsCompareOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Plots</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {savedPlotsList.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border border-[#e5ece8] max-w-md mx-auto space-y-3">
            <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
              Shortlist is Empty
            </h3>
            <p className="text-xs text-[#55635c] leading-relaxed">
              Bookmark plots on any masterplan layout to track their status and compare them side by side.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
            >
              <span>Explore Enclaves</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlotsList.map((plot) => {
              const project = projects.find((p) => p.id === plot.projectId);
              const inComparison = isPlotInComparison(plot.id);

              return (
                <div
                  key={plot.id}
                  className="bg-white rounded-xl p-5 border border-[#e5ece8] flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-editorial text-xl font-medium text-[#0f2e22]">
                          Plot #{plot.plotNumber}
                        </h3>
                        <div className="text-xs text-[#7b998a] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{project?.name}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSavePlot(plot.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-md transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <StatusBadge status={plot.status} size="sm" />
                      <button
                        type="button"
                        onClick={() => toggleComparisonPlot(plot.id)}
                        className={`text-xs font-medium px-2 py-0.5 rounded-md border transition-colors ${
                          inComparison
                            ? 'bg-[#0f2e22] text-[#d8b879] border-[#0f2e22]'
                            : 'text-[#0f2e22] border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {inComparison ? 'In Compare' : '+ Compare'}
                      </button>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2 bg-[#faf8f5] rounded-lg">
                        <span className="text-[#7b998a] block text-[10px]">Area</span>
                        <span className="font-medium text-[#0f2e22]">{formatSqFt(plot.areaSqFt)}</span>
                      </div>
                      <div className="p-2 bg-[#faf8f5] rounded-lg">
                        <span className="text-[#7b998a] block text-[10px]">Dimensions</span>
                        <span className="font-medium text-[#0f2e22]">{plot.dimensions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e5ece8] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-[#7b998a] block">Price</span>
                        <span className="font-sans text-base font-bold text-[#0f2e22]">
                          {formatINR(plot.price)}
                        </span>
                      </div>
                      <span className="text-xs text-[#7b998a]">
                        {formatPricePerSqFt(plot.pricePerSqFt)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/projects/${project?.slug}?plotId=${plot.id}`}
                        className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#0f2e22] rounded-lg hover:bg-[#163e2f] transition-colors"
                      >
                        Inspect on Plan
                      </Link>
                      {plot.status === 'AVAILABLE' && (
                        <Link
                          to={`/site-visit?projectId=${project?.id}&plotId=${plot.id}&plotNumber=${plot.plotNumber}`}
                          className="px-3 py-2 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors flex items-center justify-center"
                          title="Free Cab"
                        >
                          <Car className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PlotComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
};
