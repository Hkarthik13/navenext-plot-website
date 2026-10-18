import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import confetti from 'canvas-confetti';
import {
  Car,
  MapPin,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const SiteVisitBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { projects, plots, createSiteVisitBooking, showToast } = useApp();

  const projectIdFromUrl = searchParams.get('projectId');
  const plotIdFromUrl = searchParams.get('plotId');
  const plotNumberFromUrl = searchParams.get('plotNumber');

  // Form Fields
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projectIdFromUrl || (projects[0]?.id || '')
  );
  const [selectedPlotId, setSelectedPlotId] = useState<string>(plotIdFromUrl || '');
  const [selectedPlotNumber, setSelectedPlotNumber] = useState<string>(plotNumberFromUrl || '');

  // Pickup Location
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [sameReturnLocation, setSameReturnLocation] = useState<boolean>(true);
  const [dropLocation, setDropLocation] = useState<string>('');

  // Date and Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [visitDate, setVisitDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning 10:00 AM');
  const [passengers, setPassengers] = useState<number>(2);

  // Customer Contact
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Submission & Confirmation state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');

  const currentProject = projects.find((p) => p.id === selectedProjectId);
  const projectPlots = currentProject
    ? plots.filter((p) => p.projectId === currentProject.id)
    : [];

  useEffect(() => {
    if (projectIdFromUrl) {
      setSelectedProjectId(projectIdFromUrl);
    }
  }, [projectIdFromUrl]);

  useEffect(() => {
    if (plotIdFromUrl && projectPlots.length > 0) {
      const match = projectPlots.find((p) => p.id === plotIdFromUrl);
      if (match) {
        setSelectedPlotId(match.id);
        setSelectedPlotNumber(match.plotNumber);
      }
    }
  }, [plotIdFromUrl, projectPlots]);

  useEffect(() => {
    if (sameReturnLocation) {
      setDropLocation(pickupLocation);
    }
  }, [pickupLocation, sameReturnLocation]);

  // Quick Transit Hub Suggestions
  const transitHubs: Record<string, string[]> = {
    chennai: [
      'Tambaram Station',
      'Kilambakkam Bus Terminus',
      'Chennai Airport'
    ],
    bengaluru: [
      'Kempegowda Airport',
      'Majestic Station',
      'Silk Board'
    ],
    hyderabad: [
      'Rajiv Gandhi Airport',
      'Gachibowli',
      'Secunderabad'
    ],
    coimbatore: [
      'Coimbatore Airport',
      'Gandhipuram'
    ],
    mysuru: [
      'Mysuru Station',
      'Suburban Bus Stand'
    ]
  };

  const currentCityHubs = currentProject
    ? transitHubs[currentProject.cityId] || ['City Center', 'Airport']
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProjectId || !currentProject) {
      showToast('Please select a project destination', 'warning');
      return;
    }
    if (!pickupLocation) {
      showToast('Please enter your pickup location address', 'warning');
      return;
    }
    if (!visitDate) {
      showToast('Please choose a preferred inspection date', 'warning');
      return;
    }
    if (!customerName || !customerPhone) {
      showToast('Please provide your name and phone number', 'warning');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showToast('Please enter a valid 10-digit phone number', 'warning');
      return;
    }

    const newBooking = createSiteVisitBooking({
      projectId: currentProject.id,
      projectName: currentProject.name,
      city: currentProject.cityName,
      plotId: selectedPlotId || undefined,
      plotNumber: selectedPlotNumber || undefined,
      pickupLocation,
      dropLocation: sameReturnLocation ? pickupLocation : dropLocation,
      visitDate,
      timeSlot,
      passengerCount: passengers,
      customerName,
      customerPhone,
      customerEmail: 'demo.buyer@example.com',
      notes
    });

    setConfirmedBookingRef(newBooking.bookingReference);
    setIsSubmitted(true);

    try {
      confetti({ particleCount: 70, spread: 55, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumbs items={[{ label: 'Free Site Visit' }]} />
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
              Private Inspection
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0f2e22] mt-0.5">
              Request Site Visit Cab
            </h1>
            <p className="text-xs text-[#55635c] mt-1 max-w-lg">
              Complimentary private chauffeur pickup and return to inspect the plotted community in person.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-xl p-8 sm:p-10 border border-[#e5ece8] shadow-xs max-w-lg mx-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-normal text-[#0f2e22]">
                Visit Requested
              </h2>
              <p className="text-xs text-[#55635c]">
                Booking Reference: <strong className="font-mono text-[#0f2e22]">{confirmedBookingRef}</strong>
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#faf8f5] border border-gray-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#55635c]">Destination:</span>
                <span className="font-medium text-[#0f2e22]">{currentProject?.name}</span>
              </div>
              {selectedPlotNumber && (
                <div className="flex justify-between">
                  <span className="text-[#55635c]">Target Plot:</span>
                  <span className="font-medium text-emerald-700">Plot #{selectedPlotNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#55635c]">Date & Time:</span>
                <span className="font-medium text-[#0f2e22]">{visitDate} • {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55635c]">Pickup:</span>
                <span className="font-medium text-[#0f2e22] truncate max-w-[180px]">{pickupLocation}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-[#55635c]">Cost:</span>
                <span className="font-semibold text-emerald-700">₹0 (Free)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link
                to="/my-bookings"
                className="flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
              >
                View My Bookings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setPickupLocation('');
                  setNotes('');
                }}
                className="py-2.5 px-4 rounded-lg text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Book Another Visit
              </button>
            </div>
          </div>
        ) : (
          /* Guided Form Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-[#e5ece8] space-y-6"
            >
              {/* Step 1: Destination */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                    1. Destination
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Free Pickup & Drop
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Enclave</label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => {
                        setSelectedProjectId(e.target.value);
                        setSelectedPlotId('');
                        setSelectedPlotNumber('');
                      }}
                      className="w-full p-2.5 rounded-lg border border-gray-200 text-xs font-medium text-[#0f2e22] focus:outline-hidden"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.cityName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Specific Plot (Optional)</label>
                    <select
                      value={selectedPlotId}
                      onChange={(e) => {
                        setSelectedPlotId(e.target.value);
                        const match = projectPlots.find((p) => p.id === e.target.value);
                        setSelectedPlotNumber(match ? match.plotNumber : '');
                      }}
                      className="w-full p-2.5 rounded-lg border border-gray-200 text-xs text-[#0f2e22] focus:outline-hidden"
                    >
                      <option value="">General Layout Tour</option>
                      {projectPlots
                        .filter((p) => p.status === 'AVAILABLE')
                        .map((plot) => (
                          <option key={plot.id} value={plot.id}>
                            Plot #{plot.plotNumber} — {plot.dimensions} ({plot.facing})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Pickup Location */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a] block pb-2 border-b border-gray-100">
                  2. Pickup Point
                </span>

                {currentCityHubs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentCityHubs.map((hub, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPickupLocation(hub)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                          pickupLocation === hub
                            ? 'bg-[#0f2e22] text-[#d8b879] border-[#0f2e22]'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                        }`}
                      >
                        {hub}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter residence address, hotel, or transit station..."
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden focus:border-[#0f2e22]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="same-return"
                    checked={sameReturnLocation}
                    onChange={(e) => setSameReturnLocation(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#0f2e22] rounded-xs cursor-pointer"
                  />
                  <label htmlFor="same-return" className="text-xs text-[#55635c] cursor-pointer">
                    Return to the same pickup address
                  </label>
                </div>

                {!sameReturnLocation && (
                  <input
                    type="text"
                    placeholder="Alternative return drop-off address..."
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden"
                  />
                )}
              </div>

              {/* Step 3: Schedule & Contact */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a] block pb-2 border-b border-gray-100">
                  3. Schedule & Contact
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Date</label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Time Slot</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden"
                    >
                      <option value="Morning 10:00 AM">Morning 10:00 AM</option>
                      <option value="Mid-day 12:00 PM">Mid-day 12:00 PM</option>
                      <option value="Afternoon 02:30 PM">Afternoon 02:30 PM</option>
                      <option value="Evening 04:30 PM">Evening 04:30 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Party Size</label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden"
                    >
                      <option value={1}>1 Passenger</option>
                      <option value={2}>2 Passengers</option>
                      <option value={3}>3 Passengers</option>
                      <option value={4}>4+ Passengers (SUV)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#55635c] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98401 23456"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 text-xs text-[#1c2421] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors flex items-center justify-center gap-2"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Request Free Site Visit Cab</span>
                </button>
              </div>
            </form>

            {/* Itinerary Summary Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#0f2e22] text-white p-6 rounded-xl space-y-4">
                <h3 className="font-editorial text-lg font-medium text-white">
                  Visit Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#7b998a] block text-[10px] uppercase tracking-wider">Pickup</span>
                    <span className="font-medium text-white">{pickupLocation || 'Not specified'}</span>
                  </div>

                  <div>
                    <span className="text-[#7b998a] block text-[10px] uppercase tracking-wider">Destination</span>
                    <span className="font-medium text-white">{currentProject?.name}</span>
                    {selectedPlotNumber && (
                      <span className="block text-emerald-400 font-semibold mt-0.5">
                        Plot #{selectedPlotNumber}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[#7b998a] block text-[10px] uppercase tracking-wider">Return Drop</span>
                    <span className="font-medium text-white">
                      {sameReturnLocation ? (pickupLocation || 'Same as pickup') : (dropLocation || 'Custom')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1b382d] flex justify-between items-center text-xs">
                  <span className="text-[#7b998a]">Chauffeur Fare:</span>
                  <span className="font-bold text-emerald-400">₹0 (Free)</span>
                </div>
              </div>

              <div className="text-[11px] text-[#7b998a] leading-relaxed flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0f2e22] shrink-0 mt-0.5" />
                <span>Private AC car coordinated directly with developers. Zero sales pressure or booking fees.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
