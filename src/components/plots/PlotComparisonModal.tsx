import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';
import { formatINR, formatPricePerSqFt, formatSqFt } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { X, Scale, Car, Trash2 } from 'lucide-react';

interface PlotComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlot?: (plotId: string) => void;
}

export const PlotComparisonModal: React.FC<PlotComparisonModalProps> = ({
  isOpen,
  onClose
}) => {
  const { comparisonPlotIds, plots, projects, toggleComparisonPlot, clearComparison } = useApp();

  if (!isOpen) return null;

  const comparedPlots = plots.filter((p) => comparisonPlotIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto font-sans-clean">
      <div className="bg-[#faf8f5] text-[#1c2421] w-full max-w-4xl rounded-xl shadow-2xl border border-[#e5ece8] overflow-hidden my-auto flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#e5ece8] flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-xl font-medium text-[#0f2e22]">
              Plot Comparison ({comparedPlots.length})
            </h3>
            <p className="text-xs text-[#7b998a]">Side-by-side technical specifications</p>
          </div>

          <div className="flex items-center gap-2">
            {comparedPlots.length > 0 && (
              <button
                type="button"
                onClick={clearComparison}
                className="text-xs text-[#7b998a] hover:text-[#0f2e22] flex items-center gap-1 px-2 py-1 rounded-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-[#0f2e22] rounded-md"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-x-auto p-6">
          {comparedPlots.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Scale className="w-8 h-8 text-[#7b998a] mx-auto opacity-40" />
              <h4 className="font-editorial text-lg text-[#0f2e22]">
                No plots selected for comparison
              </h4>
              <p className="text-xs text-[#55635c] max-w-xs mx-auto">
                Click "Compare" on any plot to evaluate dimensions, facing, and rates.
              </p>
            </div>
          ) : (
            <div className="min-w-[550px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e5ece8]">
                    <th className="py-3 px-3 font-semibold text-[#7b998a] uppercase text-[10px] w-1/4">
                      Specification
                    </th>
                    {comparedPlots.map((plot) => {
                      const project = projects.find((p) => p.id === plot.projectId);
                      return (
                        <th key={plot.id} className="py-3 px-3 w-1/4">
                          <div className="flex items-center justify-between">
                            <span className="font-editorial text-lg font-medium text-[#0f2e22]">
                              Plot #{plot.plotNumber}
                            </span>
                            <button
                              onClick={() => toggleComparisonPlot(plot.id)}
                              className="text-gray-400 hover:text-rose-600 p-0.5"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-[#7b998a] truncate">
                            {project?.name}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5ece8]">
                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Status</td>
                    {comparedPlots.map((plot) => (
                      <td key={plot.id} className="py-3 px-3">
                        <StatusBadge status={plot.status} size="sm" />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Price</td>
                    {comparedPlots.map((plot) => (
                      <td key={plot.id} className="py-3 px-3">
                        <div className="font-sans font-semibold text-sm text-[#0f2e22]">
                          {formatINR(plot.price)}
                        </div>
                        <div className="text-[10px] text-[#7b998a]">
                          {formatPricePerSqFt(plot.pricePerSqFt)}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Area</td>
                    {comparedPlots.map((plot) => (
                      <td key={plot.id} className="py-3 px-3 font-medium text-[#0f2e22]">
                        {formatSqFt(plot.areaSqFt)}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Dimensions</td>
                    {comparedPlots.map((plot) => (
                      <td key={plot.id} className="py-3 px-3 text-[#1c2421]">
                        {plot.dimensions}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Facing</td>
                    {comparedPlots.map((plot) => (
                      <td key={plot.id} className="py-3 px-3 text-[#1c2421]">
                        {plot.facing}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Type</td>
                    {comparedPlots.map((plot) => (
                      <td key={plot.id} className="py-3 px-3 text-[#1c2421]">
                        {plot.cornerPlot ? 'Corner Plot' : 'Regular'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[#7b998a]">Action</td>
                    {comparedPlots.map((plot) => {
                      const project = projects.find((p) => p.id === plot.projectId);
                      return (
                        <td key={plot.id} className="py-3 px-3">
                          {plot.status === 'AVAILABLE' ? (
                            <Link
                              to={`/site-visit?projectId=${project?.id}&plotId=${plot.id}&plotNumber=${plot.plotNumber}`}
                              onClick={onClose}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879]"
                            >
                              <Car className="w-3 h-3" />
                              <span>Book Cab</span>
                            </Link>
                          ) : (
                            <span className="text-[11px] text-gray-400">Unavailable</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
