import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import type { PlotStatus, SiteVisitBooking } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StatusBadge } from '../components/common/Badge';
import { formatINR, formatPricePerSqFt, formatSqFt, formatDate } from '../utils/formatters';

import {
  ShieldAlert,
  Layers,
  Car,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Edit3,
  Trash2,
  ArrowRight,
  TrendingUp,
  Building
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    plots,
    projects,
    bookings,
    enquiries,
    updatePlotStatus,
    updateBookingStatus,
    resetAllDemoData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'bookings' | 'enquiries'>('inventory');

  // Inventory Table Filter State
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [plotSearchQuery, setPlotSearchQuery] = useState<string>('');

  // Metrics
  const totalPlots = plots.length;
  const availablePlots = plots.filter((p) => p.status === 'AVAILABLE').length;
  const reservedPlots = plots.filter((p) => p.status === 'RESERVED').length;
  const soldPlots = plots.filter((p) => p.status === 'SOLD').length;
  const totalGrossInventoryValue = plots.reduce((acc, p) => acc + p.price, 0);

  // Filtered Plots
  const filteredPlots = useMemo(() => {
    return plots.filter((p) => {
      if (selectedProjectFilter !== 'ALL' && p.projectId !== selectedProjectFilter) return false;
      if (selectedStatusFilter !== 'ALL' && p.status !== selectedStatusFilter) return false;
      if (plotSearchQuery) {
        const q = plotSearchQuery.toLowerCase();
        if (!p.plotNumber.toLowerCase().includes(q) && !p.dimensions.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [plots, selectedProjectFilter, selectedStatusFilter, plotSearchQuery]);

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Top Banner */}
      <div className="bg-[#0a1f17] text-white pt-8 pb-12 border-b border-[#163e2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ label: 'Developer & Admin Console (Demo)' }]} />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-xs font-semibold text-amber-300 mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Simulated Admin Environment</span>
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Inventory & Operations Console
              </h1>
              <p className="text-xs sm:text-sm text-[#c2d1c9] mt-2 max-w-xl">
                Manage live plotted inventory states, update plot statuses in real time (propagates across SVG masterplans), and review buyer site-visit requests.
              </p>
            </div>

            <button
              type="button"
              onClick={resetAllDemoData}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-200 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 transition-colors self-start sm:self-end"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#c2d1c9]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#55635c]">
              Total Plots Tracked
            </span>
            <div className="font-display font-bold text-3xl text-[#0f2e22] mt-1">
              {totalPlots}
            </div>
            <div className="text-[11px] text-[#7b998a] mt-1">
              Across {projects.length} Masterplan Projects
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#c2d1c9]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Available for Sale
            </span>
            <div className="font-display font-bold text-3xl text-emerald-700 mt-1">
              {availablePlots}
            </div>
            <div className="text-[11px] text-[#55635c] mt-1">
              {Math.round((availablePlots / totalPlots) * 100)}% of total portfolio
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#c2d1c9]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Reserved / Token
            </span>
            <div className="font-display font-bold text-3xl text-amber-700 mt-1">
              {reservedPlots}
            </div>
            <div className="text-[11px] text-[#55635c] mt-1">
              Under verification or bank loan
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#c2d1c9]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              Sold Out / Registered
            </span>
            <div className="font-display font-bold text-3xl text-rose-700 mt-1">
              {soldPlots}
            </div>
            <div className="text-[11px] text-[#55635c] mt-1">
              Deeds registered to buyers
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-[#0f2e22] text-[#0f2e22]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Plot Inventory Status Editor ({plots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-[#0f2e22] text-[#0f2e22]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Site Visit Chauffeur Requests ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'enquiries'
                ? 'border-[#0f2e22] text-[#0f2e22]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Buyer Enquiries Log ({enquiries.length})</span>
          </button>
        </div>

        {/* Tab 1: Plot Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 border border-[#c2d1c9] shadow-sm space-y-5">
            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Filter by plot #..."
                  value={plotSearchQuery}
                  onChange={(e) => setPlotSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                />
              </div>

              <div>
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                >
                  <option value="ALL">All Projects ({projects.length})</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.cityName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="AVAILABLE">Available Only</option>
                  <option value="RESERVED">Reserved Only</option>
                  <option value="SOLD">Sold Out Only</option>
                </select>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[#55635c] uppercase">
                    <th className="py-3 px-3 font-bold">Plot #</th>
                    <th className="py-3 px-3 font-bold">Project</th>
                    <th className="py-3 px-3 font-bold">Dimensions</th>
                    <th className="py-3 px-3 font-bold">Area</th>
                    <th className="py-3 px-3 font-bold">Facing</th>
                    <th className="py-3 px-3 font-bold">Price</th>
                    <th className="py-3 px-3 font-bold">Current Status</th>
                    <th className="py-3 px-3 font-bold text-right">Toggle Live Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPlots.map((plot) => {
                    const project = projects.find((p) => p.id === plot.projectId);
                    return (
                      <tr key={plot.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-display font-bold text-sm text-[#0f2e22]">
                          #{plot.plotNumber}
                        </td>
                        <td className="py-3 px-3 text-[#55635c]">
                          {project?.name || plot.projectId}
                        </td>
                        <td className="py-3 px-3 text-[#1c2421] font-medium">
                          {plot.dimensions}
                        </td>
                        <td className="py-3 px-3 text-[#55635c]">
                          {formatSqFt(plot.areaSqFt)}
                        </td>
                        <td className="py-3 px-3 text-[#55635c]">
                          {plot.facing}
                        </td>
                        <td className="py-3 px-3 font-bold text-[#0f2e22]">
                          {formatINR(plot.price)}
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={plot.status} size="sm" />
                        </td>
                        <td className="py-3 px-3 text-right">
                          <select
                            value={plot.status}
                            onChange={(e) =>
                              updatePlotStatus(plot.id, e.target.value as PlotStatus)
                            }
                            className="text-xs font-semibold p-1.5 rounded-lg border border-gray-300 focus:outline-hidden bg-[#faf8f5]"
                          >
                            <option value="AVAILABLE">AVAILABLE (Green)</option>
                            <option value="RESERVED">RESERVED (Amber)</option>
                            <option value="SOLD">SOLD OUT (Red)</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Site Visit Requests */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 border border-[#c2d1c9] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-display font-bold text-lg text-[#0f2e22]">
                Site Visit Chauffeur Requests ({bookings.length})
              </h3>
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">
                No site visit requests recorded yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-[#55635c] uppercase">
                      <th className="py-3 px-3 font-bold">Booking Ref</th>
                      <th className="py-3 px-3 font-bold">Customer</th>
                      <th className="py-3 px-3 font-bold">Project / Plot</th>
                      <th className="py-3 px-3 font-bold">Date & Time</th>
                      <th className="py-3 px-3 font-bold">Pickup Address</th>
                      <th className="py-3 px-3 font-bold">Status</th>
                      <th className="py-3 px-3 font-bold text-right">Operator Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-mono font-bold text-[#0f2e22]">
                          {b.bookingReference}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#1c2421]">{b.customerName}</div>
                          <div className="text-[11px] text-[#55635c]">{b.customerPhone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-[#0f2e22]">{b.projectName}</div>
                          {b.plotNumber && (
                            <div className="text-[11px] text-emerald-700 font-semibold">
                              Plot #{b.plotNumber}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-[#55635c]">
                          {b.visitDate} <br /> {b.timeSlot}
                        </td>
                        <td className="py-3 px-3 text-[#55635c] max-w-[180px] truncate">
                          {b.pickupLocation}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'Requested'
                                ? 'bg-amber-100 text-amber-800'
                                : b.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <select
                            value={b.status}
                            onChange={(e) =>
                              updateBookingStatus(b.id, e.target.value as SiteVisitBooking['status'])
                            }
                            className="text-xs p-1.5 rounded-lg border border-gray-300 focus:outline-hidden bg-white"
                          >
                            <option value="Requested">Requested</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Enquiries Log */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 border border-[#c2d1c9] shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-[#0f2e22]">
              Customer Inquiries Log ({enquiries.length})
            </h3>

            {enquiries.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">
                No customer inquiries logged yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-[#55635c] uppercase">
                      <th className="py-3 px-3 font-bold">Date</th>
                      <th className="py-3 px-3 font-bold">Customer</th>
                      <th className="py-3 px-3 font-bold">Project / Plot</th>
                      <th className="py-3 px-3 font-bold">Category</th>
                      <th className="py-3 px-3 font-bold">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 text-[#7b998a]">
                          {formatDate(enq.createdAt)}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#1c2421]">{enq.name}</div>
                          <div className="text-[11px] text-[#55635c]">{enq.phone}</div>
                        </td>
                        <td className="py-3 px-3 text-[#0f2e22] font-medium">
                          {enq.projectName}
                          {enq.plotNumber && ` (Plot #${enq.plotNumber})`}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e5ece8] text-[#163e2f]">
                            {enq.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#55635c] max-w-xs truncate">
                          {enq.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
