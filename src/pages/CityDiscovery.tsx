import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/mockData';
import { LeafletCityMap } from '../components/map/LeafletCityMap';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatPricePerSqFt } from '../utils/formatters';

import {
  MapPin,
  Compass,
  Building,
  Search
} from 'lucide-react';

export const CityDiscovery: React.FC = () => {
  const { citySlug } = useParams<{ citySlug?: string }>();
  const navigate = useNavigate();
  const { projects, plots } = useApp();

  const [selectedCitySlug, setSelectedCitySlug] = useState<string>(citySlug || 'all');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  useEffect(() => {
    if (citySlug) {
      setSelectedCitySlug(citySlug);
    }
  }, [citySlug]);

  const activeCity = CITIES.find((c) => c.slug === selectedCitySlug);

  // Filter cities by search term
  const filteredCities = useMemo(() => {
    if (!citySearchTerm) return CITIES;
    return CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
        c.state.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
  }, [citySearchTerm]);

  // Projects belonging to active city (or all)
  const cityProjects = useMemo(() => {
    if (selectedCitySlug === 'all') return projects;
    return projects.filter((p) => p.cityId === selectedCitySlug || p.slug.includes(selectedCitySlug));
  }, [projects, selectedCitySlug]);

  const handleCitySelect = (slug: string) => {
    setSelectedCitySlug(slug);
    if (slug === 'all') {
      navigate('/cities');
    } else {
      navigate(`/cities/${slug}`);
    }
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Editorial Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Cities', href: '/cities' },
              ...(activeCity ? [{ label: `${activeCity.name}` }] : [])
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pt-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Geographic Markets
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0f2e22] mt-0.5">
                {activeCity ? `${activeCity.name} Developments` : 'Plotted Cities'}
              </h1>
              <p className="text-xs text-[#55635c] mt-1 max-w-xl">
                {activeCity
                  ? activeCity.description
                  : 'Vetted plotted developments across 8 strategic growth corridors in South India.'}
              </p>
            </div>

            {/* Map / List View Toggle */}
            <div className="flex items-center gap-1 bg-[#f4f7f5] p-1 rounded-lg border border-[#e5ece8]">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'map' ? 'bg-[#0f2e22] text-white' : 'text-[#55635c] hover:text-[#0f2e22]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'list' ? 'bg-[#0f2e22] text-white' : 'text-[#55635c] hover:text-[#0f2e22]'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>List ({cityProjects.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* City Filter Strip */}
        <div className="bg-white p-3.5 rounded-xl border border-[#e5ece8] space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => handleCitySelect('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCitySlug === 'all'
                  ? 'bg-[#0f2e22] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Cities ({projects.length})
            </button>
            {filteredCities.map((city) => {
              const projectCount = projects.filter(
                (p) => p.cityId === city.id || p.cityId === city.slug || p.slug.includes(city.slug)
              ).length;
              return (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.slug)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedCitySlug === city.slug
                      ? 'bg-[#0f2e22] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{city.name}</span>
                  <span className="text-[10px] opacity-75">({projectCount})</span>
                </button>
              );
            })}
          </div>

          {activeCity && (
            <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-[#55635c]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0f2e22]">Corridors:</span>
                {activeCity.keyGrowthCorridors.map((corridor, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-[#f4f7f5] text-[#0f2e22] text-[11px]">
                    {corridor}
                  </span>
                ))}
              </div>
              <div className="text-[#0f2e22] font-medium">
                Avg: {formatPricePerSqFt(activeCity.avgPricePerSqFt)}
              </div>
            </div>
          )}
        </div>

        {/* View Content (Map View or List View) */}
        {activeTab === 'map' ? (
          <div className="space-y-8">
            <LeafletCityMap
              projects={cityProjects}
              center={activeCity ? activeCity.coordinates : [12.9716, 77.5946]}
              zoom={activeCity ? 11 : 6}
              className="h-[520px] w-full rounded-xl overflow-hidden border border-[#e5ece8]"
            />

            {/* Enclave Cards below Map */}
            <div className="space-y-4">
              <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
                Developments in this Area ({cityProjects.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityProjects.map((project) => {
                  const projectPlots = plots.filter((p) => p.projectId === project.id);
                  const availableCount = projectPlots.filter((p) => p.status === 'AVAILABLE').length;

                  return (
                    <div
                      key={project.id}
                      className="bg-white rounded-xl overflow-hidden border border-[#e5ece8] p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-[#7b998a]">
                          <span>{project.locality}</span>
                          <span className="text-emerald-700 font-medium">{availableCount} Plots</span>
                        </div>
                        <h4 className="font-editorial text-lg font-medium text-[#0f2e22]">
                          {project.name}
                        </h4>
                        <p className="text-xs text-[#55635c] line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#e5ece8] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#7b998a] block">Starting from</span>
                          <span className="font-sans text-xs font-semibold text-[#0f2e22]">
                            {project.priceRangeText}
                          </span>
                        </div>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
                        >
                          View Layout
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityProjects.map((project) => {
              const projectPlots = plots.filter((p) => p.projectId === project.id);
              const availableCount = projectPlots.filter((p) => p.status === 'AVAILABLE').length;

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#e5ece8] p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-[#7b998a]">
                      <span>{project.locality}, {project.cityName}</span>
                      <span className="text-emerald-700 font-medium">{availableCount} Available</span>
                    </div>
                    <h4 className="font-editorial text-lg font-medium text-[#0f2e22]">
                      {project.name}
                    </h4>
                    <p className="text-xs text-[#55635c] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#e5ece8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#7b998a] block">Starting from</span>
                      <span className="font-sans text-xs font-semibold text-[#0f2e22]">
                        {project.priceRangeText}
                      </span>
                    </div>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
                    >
                      View Layout
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
