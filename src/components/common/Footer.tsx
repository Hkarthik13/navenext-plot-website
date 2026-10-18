import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Car,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { CITIES } from '../../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1f17] text-[#c2d1c9] border-t border-[#163e2f] pt-12 pb-10 font-sans-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#163e2f]">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="inline-block" aria-label="Navanextventures Home">
              <Logo isLight={false} />
            </Link>
            <p className="text-xs text-[#8fa89b] leading-relaxed">
              A home to call your own. An investment in tomorrow. Discover possibilities with Navanextventures — where your aspirations find their ground.
            </p>
            <div className="text-[11px] text-[#c5a059] font-medium tracking-wide">
              உங்கள் கனவுக்கு, ஒரு புதிய தொடக்கம்.
            </div>
            <div className="flex items-center gap-2 text-xs text-[#c5a059] font-medium pt-1">
              <Car className="w-3.5 h-3.5" />
              <span>Free Doorstep Pickup & Return</span>
            </div>
          </div>

          {/* Plotted Cities */}
          <div className="space-y-2.5">
            <h4 className="font-editorial text-sm font-medium text-white">
              Cities
            </h4>
            <ul className="space-y-2 text-xs">
              {CITIES.slice(0, 5).map((city) => (
                <li key={city.id}>
                  <Link
                    to={`/cities/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.name} Plots
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/cities" className="text-[#d8b879] hover:underline font-medium">
                  View All Cities &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Buyer Tools */}
          <div className="space-y-2.5">
            <h4 className="font-editorial text-sm font-medium text-white">
              Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Explore Masterplans
                </Link>
              </li>
              <li>
                <Link to="/emi-calculator" className="hover:text-white transition-colors">
                  Loan EMI Simulator
                </Link>
              </li>
              <li>
                <Link to="/site-visit" className="hover:text-white transition-colors">
                  Book Free Site Visit
                </Link>
              </li>
              <li>
                <Link to="/my-saved-plots" className="hover:text-white transition-colors">
                  Saved Plots & Comparison
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#8fa89b] hover:text-[#d8b879] transition-colors">
                  Admin Console (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="font-editorial text-sm font-medium text-white">
              Contact
            </h4>
            <div className="space-y-2 text-xs text-[#8fa89b]">
              <a
                href="tel:+917200386806"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="text-white font-medium">+91 72003 86806</span>
              </a>
              <a
                href="mailto:navanextventures@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>navanextventures@gmail.com</span>
              </a>
              <a
                href="https://wa.me/917200386806?text=Hello%20Navanextventures%2C%20I%20am%20interested%20in%20exploring%20plots%20in%20Tamil%20Nadu.%20Please%20share%20the%20available%20locations%20and%20details."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: +91 72003 86806</span>
              </a>
              <a
                href="https://www.instagram.com/nava_next_ventures"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="text-[#c5a059] text-xs font-bold leading-none">IG</span>
                <span>@nava_next_ventures</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-[#8fa89b]">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#55635c]">
          <p>© {new Date().getFullYear()} Navanextventures. Land for living. Possibilities for tomorrow.</p>
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="hover:text-[#c2d1c9]">
              Contact
            </Link>
            <Link to="/contact" className="hover:text-[#c2d1c9]">
              Privacy & Terms
            </Link>
            <Link to="/admin" className="text-[#c5a059] hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
