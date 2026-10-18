import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/mockData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

import {
  Search,
  MapPin,
  Car,
  Layers,
  Bookmark,
  RotateCcw,
  Grid,
  List
} from 'lucide-react';

export const ExploreProjects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, plots, toggleSaveProject, isProjectSaved } = useApp();

  // URL state sync
  const cityParam = searchParams.get('city') || '';
  const budgetParam = searchParams.get('budget') || '';

  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedBudget, setSelectedBudget] = useState(budgetParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'plots'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // City
      if (selectedCity && project.cityId !== selectedCity && project.slug !== selectedCity) {
        return false;
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(q);
        const matchesLocality = project.locality.toLowerCase().includes(q);
        const matchesCity = project.cityName.toLowerCase().includes(q);
        if (!matchesName && !matchesLocality && !matchesCity) return false;
      }

      // Budget Range
      if (selectedBudget === 'under-40' && project.minPrice > 4000000) return false;
      if (selectedBudget === '40-70' && (project.maxPrice < 4000000 || project.minPrice > 7000000)) return false;
      if (selectedBudget === '70-100' && (project.maxPrice < 7000000 || project.minPrice > 10000000)) return false;
      if (selectedBudget === 'above-100' && project.maxPrice < 10000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.minPrice - b.minPrice;
      if (sortBy === 'price-desc') return b.maxPrice - a.maxPrice;
      if (sortBy === 'plots') return b.totalPlots - a.totalPlots;
      return 0;
    });
  }, [projects, selectedCity, selectedBudget, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCity('');
    setSelectedBudget('');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Editorial Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Explore Plotted Developments' }]} />
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Directory
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0f2e22] mt-0.5">
                Plotted Communities
              </h1>
            </div>
            <span className="text-xs text-[#7b998a]">
              Showing <strong className="text-[#0f2e22]">{filteredProjects.length}</strong> Enclaves
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Compact Filter Toolbar */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c2d1c9] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-2">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search enclave or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0f2e22] text-[#1c2421]"
              />
            </div>

            {/* City */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full sm:w-auto py-1.5 px-3 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0f2e22] text-[#1c2421] cursor-pointer"
            >
              <option value="">All 8 Cities</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Budget */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full sm:w-auto py-1.5 px-3 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0f2e22] text-[#1c2421] cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="under-40">Under ₹40 Lakhs</option>
              <option value="40-70">₹40 L – ₹70 Lakhs</option>
              <option value="70-100">₹70 L – ₹1 Crore</option>
              <option value="above-100">Above ₹1 Crore</option>
            </select>

            {(selectedCity || selectedBudget || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-[#7b998a] hover:text-[#0f2e22] flex items-center gap-1 font-medium ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden text-[#1c2421] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="plots">Plot Count</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md ${
                  viewMode === 'grid' ? 'bg-[#0f2e22] text-white' : 'text-gray-400 hover:text-gray-700'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded-md ${
                  viewMode === 'list' ? 'bg-[#0f2e22] text-white' : 'text-gray-400 hover:text-gray-700'
                }`}
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Showcase */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border border-[#e5ece8] space-y-3 max-w-md mx-auto">
            <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
              No Enclaves Found
            </h3>
            <p className="text-xs text-[#55635c] leading-relaxed">
              No plotted developments matched your filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const projectPlots = plots.filter((p) => p.projectId === project.id);
              const availablePlotsCount = projectPlots.filter((p) => p.status === 'AVAILABLE').length;
              const isSaved = isProjectSaved(project.id);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#e5ece8] shadow-2xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleSaveProject(project.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-[#c5a059] text-[#0a1f17]' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      aria-label="Save project"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#7b998a]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {project.locality}, {project.cityName}
                        </span>
                        <span className="text-emerald-700 font-medium">
                          {availablePlotsCount} Available
                        </span>
                      </div>

                      <h3 className="font-editorial text-xl font-medium text-[#0f2e22]">
                        {project.name}
                      </h3>

                      <p className="text-xs text-[#55635c] line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e5ece8] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#7b998a] block">Starting from</span>
                        <span className="font-sans text-sm font-semibold text-[#0f2e22]">
                          {project.priceRangeText}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
                        >
                          View Layout
                        </Link>
                        <Link
                          to={`/site-visit?projectId=${project.id}`}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors"
                          title="Free Site Visit"
                        >
                          <Car className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-[#e5ece8] bg-white rounded-xl border border-[#e5ece8]">
            {filteredProjects.map((project) => {
              const projectPlots = plots.filter((p) => p.projectId === project.id);
              const availablePlotsCount = projectPlots.filter((p) => p.status === 'AVAILABLE').length;

              return (
                <div
                  key={project.id}
                  className="p-5 flex flex-col sm:flex-row gap-5 items-center justify-between hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-2/3">
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      className="w-full sm:w-36 h-24 object-cover rounded-lg shrink-0"
                    />
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#7b998a]">
                        <span>{project.locality}, {project.cityName}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-medium">{availablePlotsCount} Available</span>
                      </div>
                      <h3 className="font-editorial text-lg font-medium text-[#0f2e22]">
                        {project.name}
                      </h3>
                      <p className="text-xs text-[#55635c] line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-5">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#7b998a] block">Price</span>
                      <span className="font-sans text-sm font-semibold text-[#0f2e22]">
                        {project.priceRangeText}
                      </span>
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0f2e22] hover:bg-[#163e2f] transition-colors"
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
