import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatDate } from '../utils/formatters';
import {
  Car,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useApp();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleConfirmCancel = (id: string) => {
    cancelBooking(id);
    setCancellingId(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Requested
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumbs items={[{ label: 'My Visits' }]} />
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Itineraries
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0f2e22] mt-0.5">
                Site Visit Bookings
              </h1>
            </div>
            <Link
              to="/site-visit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Book New Visit</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-[#e5ece8] max-w-md mx-auto space-y-3">
            <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
              No Site Visits Scheduled
            </h3>
            <p className="text-xs text-[#55635c] leading-relaxed">
              Schedule a complimentary chauffeur pickup to inspect any plotted enclave in person.
            </p>
            <Link
              to="/site-visit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
            >
              <span>Schedule Free Visit</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl p-6 border border-[#e5ece8] space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-editorial text-xl font-medium text-[#0f2e22]">
                      {b.projectName}
                    </h3>
                    <div className="text-xs text-[#7b998a] flex items-center gap-2">
                      <span>Ref #{b.bookingReference}</span>
                      <span>•</span>
                      <span>Requested on {formatDate(b.createdAt)}</span>
                    </div>
                  </div>

                  <div>{getStatusBadge(b.status)}</div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[#7b998a] block text-[10px] uppercase tracking-wider mb-0.5">
                      Date & Time
                    </span>
                    <div className="font-semibold text-[#0f2e22]">
                      {b.visitDate}
                    </div>
                    <div className="text-[#55635c]">{b.timeSlot}</div>
                  </div>

                  <div>
                    <span className="text-[#7b998a] block text-[10px] uppercase tracking-wider mb-0.5">
                      Pickup Address
                    </span>
                    <div className="text-[#1c2421] font-medium truncate">
                      {b.pickupLocation}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#7b998a] block text-[10px] uppercase tracking-wider mb-0.5">
                      Target Parcel
                    </span>
                    <div className="font-medium text-[#0f2e22]">
                      {b.plotNumber ? `Plot #${b.plotNumber}` : 'Full Enclave Inspection'}
                    </div>
                  </div>
                </div>

                {/* Cancellation & Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium">₹0 Complimentary AC Cab</span>

                  {b.status === 'Requested' && (
                    <div>
                      {cancellingId === b.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-rose-700 font-medium">Cancel request?</span>
                          <button
                            type="button"
                            onClick={() => handleConfirmCancel(b.id)}
                            className="px-2 py-1 text-xs font-semibold text-white bg-rose-700 rounded-md"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setCancellingId(null)}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCancellingId(b.id)}
                          className="text-[#7b998a] hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
