import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Send,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, submitEnquiry } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Chennai');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please enter your name and contact phone number', 'warning');
      return;
    }

    submitEnquiry({
      name,
      phone,
      email,
      projectId: 'general-contact',
      projectName: `Inquiry for ${city} Plots`,
      type: 'general',
      message: message || `General inquiry regarding ${city} plotted land portfolio`
    });

    setIsSubmitted(true);
    showToast('Your message has been sent successfully! Our concierge will connect with you.', 'success');
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Top Banner */}
      <div className="bg-[#0f2e22] text-white pt-8 pb-12 border-b border-[#163e2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ label: 'Contact & Land Concierge' }]} />
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d8b879]">
              Direct Assistance
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mt-1">
              Connect with Navanextventures
            </h1>
            <p className="text-xs sm:text-sm text-[#c2d1c9] mt-2 leading-relaxed">
              Have questions regarding layout approvals, parent deed verifications, or need help scheduling a private site visit cab? Our advisory team is at your service.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#c2d1c9]">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#0f2e22]">
                  Message Received!
                </h3>
                <p className="text-xs text-[#55635c] max-w-sm mx-auto">
                  Thank you, {name}. A dedicated Navanextventures plotted property advisor will reach out to you within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="pb-2 border-b border-gray-100">
                  <h2 className="font-display font-bold text-xl text-[#0f2e22]">
                    Send a Message
                  </h2>
                  <p className="text-[#55635c] text-xs mt-0.5">
                    Direct communication with verified plotted project desks.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#55635c] font-bold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#55635c] font-bold mb-1">Mobile Phone (India)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98401 23456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#55635c] font-bold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#55635c] font-bold mb-1">Preferred City of Interest</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                    >
                      <option value="Chennai">Chennai (OMR / GST Road)</option>
                      <option value="Bengaluru">Bengaluru (Airport / Sarjapur)</option>
                      <option value="Hyderabad">Hyderabad (Mokila / ORR)</option>
                      <option value="Coimbatore">Coimbatore (Saravanampatti)</option>
                      <option value="Mysuru">Mysuru (Expressway Corridor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#55635c] font-bold mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are looking for (e.g., plot dimension, budget range, investment vs immediate construction)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Property Concierge</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Offices */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Quick Connect Card */}
            <div className="bg-[#163e2f] text-white p-6 rounded-3xl border border-[#29604a] shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Instant WhatsApp Support
                  </h3>
                  <p className="text-xs text-[#c2d1c9]">
                    Connect with an advisor for instant brochure & layout maps
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#c2d1c9] leading-relaxed">
                Receive high-resolution PDF site plan brochures and DTCP approval documents directly on WhatsApp.
              </p>

              <a
                href="https://wa.me/917200386806?text=Hello%20Navanextventures%2C%20I%20am%20interested%20in%20exploring%20plots%20in%20Tamil%20Nadu.%20Please%20share%20the%20available%20locations%20and%20details."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-semibold text-[#0a1f17] bg-[#d8b879] hover:bg-[#c5a059] transition-all"
              >
                <span>Chat on WhatsApp (+91 72003 86806)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Corporate Hubs */}
            <div className="bg-white p-6 rounded-3xl border border-[#c2d1c9] shadow-sm space-y-4 text-xs">
              <h3 className="font-display font-bold text-base text-[#0f2e22]">
                Company Information & Operations
              </h3>

              <div className="space-y-3 divide-y divide-gray-100">
                <div className="pt-2 space-y-1">
                  <div className="font-bold text-[#0f2e22]">Navanextventures Headquarters</div>
                  <p className="text-[#55635c]">Tamil Nadu, India</p>
                  <p className="text-[11px] text-[#c5a059] font-medium">உங்கள் கனவுக்கு, ஒரு புதிய தொடக்கம்.</p>
                  <div className="text-[11px] text-[#7b998a]">Mon – Sat: 9:00 AM – 7:30 PM IST</div>
                </div>

                <div className="pt-3 space-y-1">
                  <div className="font-bold text-[#0f2e22]">Instagram Community</div>
                  <a
                    href="https://www.instagram.com/nava_next_ventures"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0f2e22] hover:text-[#c5a059] flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>@nava_next_ventures</span>
                    <ExternalLink className="w-3 h-3 text-[#7b998a]" />
                  </a>
                  <p className="text-[11px] text-[#7b998a]">Follow for live plot launch updates & site videos</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-[#55635c]">
                <a
                  href="tel:+917200386806"
                  className="flex items-center gap-2 hover:text-[#0f2e22] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span className="font-semibold text-[#0f2e22]">+91 72003 86806</span>
                </a>
                <a
                  href="mailto:navanextventures@gmail.com"
                  className="flex items-center gap-2 hover:text-[#0f2e22] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#c5a059]" />
                  <span>navanextventures@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
