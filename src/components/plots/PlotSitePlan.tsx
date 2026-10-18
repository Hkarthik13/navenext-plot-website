import React, { useState, useRef, useEffect } from 'react';
import { Plot, Project } from '../../types';
import { formatINR } from '../../utils/formatters';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sparkles
} from 'lucide-react';

import { PlotDrawer } from './PlotDrawer';

interface PlotSitePlanProps {
  project: Project;
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot | null) => void;
  className?: string;
  onOpenEmiModal?: (plot: Plot) => void;
}

export const PlotSitePlan: React.FC<PlotSitePlanProps> = ({
  project,
  plots,
  selectedPlot,
  onSelectPlot,
  className = '',
  onOpenEmiModal
}) => {
  // Pan and Zoom State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filters State
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [facingFilter, setFacingFilter] = useState<string>('ALL');
  const [cornerOnly, setCornerOnly] = useState<boolean>(false);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.6));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'siteplan-canvas-bg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan handling for mobile touchscreens
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'svg' ||
        target.id === 'siteplan-canvas-bg' ||
        target.classList.contains('pointer-events-none') ||
        target.tagName === 'line' ||
        target.tagName === 'pattern'
      ) {
        setIsDragging(true);
        setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPanOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Filtered Plots Logic
  const filteredPlots = plots.filter((plot) => {
    if (statusFilter !== 'ALL' && plot.status !== statusFilter) return false;
    if (facingFilter !== 'ALL' && !plot.facing.includes(facingFilter)) return false;
    if (cornerOnly && !plot.cornerPlot) return false;
    return true;
  });

  // Calculate live counts
  const availableCount = plots.filter((p) => p.status === 'AVAILABLE').length;
  const reservedCount = plots.filter((p) => p.status === 'RESERVED').length;
  const soldCount = plots.filter((p) => p.status === 'SOLD').length;

  const config = project.layoutConfig || {
    viewBox: '0 0 1200 800',
    width: 1200,
    height: 800,
    roads: [],
    greenSpaces: [],
    facilities: [],
    gate: { x: 80, y: 360, label: 'MAIN ENTRANCE' }
  };

  // Palette compliance: Green (Available), Amber (In Process), Muted Red (Sold)
  const getPlotFill = (plot: Plot, isMatched: boolean) => {
    if (!isMatched) return '#2a3430'; // Dimmed
    switch (plot.status) {
      case 'AVAILABLE':
        return '#16a34a';
      case 'RESERVED':
        return '#d97706';
      case 'SOLD':
        return '#dc2626';
      default:
        return '#16a34a';
    }
  };

  const getPlotStroke = (plot: Plot, isSelected: boolean) => {
    if (isSelected) return '#c5a059';
    switch (plot.status) {
      case 'AVAILABLE':
        return '#14532d';
      case 'RESERVED':
        return '#78350f';
      case 'SOLD':
        return '#7f1d1d';
      default:
        return '#14532d';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#0d1612] text-white rounded-xl overflow-hidden border border-[#21352b] shadow-xl flex flex-col select-none ${className}`}
    >
      {/* Architectural Minimal Toolbar */}
      <div className="bg-[#0f1f18] border-b border-[#1b3327] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#162e24] text-[#c2d1c9] border border-[#234737] rounded-md px-2.5 py-1 text-xs font-medium focus:outline-hidden focus:border-[#c5a059]"
          >
            <option value="ALL">All ({plots.length})</option>
            <option value="AVAILABLE">Available ({availableCount})</option>
            <option value="RESERVED">In Process ({reservedCount})</option>
            <option value="SOLD">Sold ({soldCount})</option>
          </select>

          <select
            value={facingFilter}
            onChange={(e) => setFacingFilter(e.target.value)}
            className="bg-[#162e24] text-[#c2d1c9] border border-[#234737] rounded-md px-2.5 py-1 text-xs font-medium focus:outline-hidden focus:border-[#c5a059]"
          >
            <option value="ALL">All Facings</option>
            <option value="North">North</option>
            <option value="East">East</option>
            <option value="South">South</option>
            <option value="West">West</option>
          </select>

          <button
            type="button"
            onClick={() => setCornerOnly(!cornerOnly)}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors flex items-center gap-1 ${
              cornerOnly
                ? 'bg-[#c5a059] text-[#0a1f17] border-[#c5a059] font-bold'
                : 'bg-[#162e24] text-[#8fa89b] border-[#234737] hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Corner</span>
          </button>
        </div>

        {/* Compact Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomIn}
            className="p-1 rounded-md bg-[#162e24] hover:bg-[#1d3d30] text-[#c2d1c9] hover:text-white border border-[#234737] transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 rounded-md bg-[#162e24] hover:bg-[#1d3d30] text-[#c2d1c9] hover:text-white border border-[#234737] transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 rounded-md bg-[#162e24] hover:bg-[#1d3d30] text-[#c2d1c9] hover:text-white border border-[#234737] transition-colors"
            title="Reset"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded-md bg-[#162e24] hover:bg-[#1d3d30] text-[#c2d1c9] hover:text-white border border-[#234737] transition-colors"
            title="Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Blueprint Canvas & Side Details Panel */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-[520px] sm:min-h-[620px]">
        {/* SVG Canvas Viewport */}
        <div
          className="relative flex-1 min-w-0 min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] cursor-grab active:cursor-grabbing overflow-hidden bg-[#0d1612]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile Touch Navigation Hint */}
          <div className="lg:hidden absolute top-2.5 left-3 z-10 pointer-events-none bg-[#0a1f17]/85 backdrop-blur-xs border border-[#1b3e2d] text-[#c2d1c9] px-2.5 py-1 rounded-full text-[10px] flex items-center gap-1.5 shadow-xs">
            <span>👆 Drag to pan • Tap plot to view</span>
          </div>
        <svg
          ref={svgRef}
          viewBox={config.viewBox}
          className="w-full h-full transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Architectural Blueprint CAD Grid Pattern */}
            <pattern id="cad-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#12251d" strokeWidth="0.8" opacity="0.6" />
            </pattern>
            {/* Interlocking Paver Sidewalk Pattern */}
            <pattern id="sidewalk-pattern" width="12" height="6" patternUnits="userSpaceOnUse">
              <rect width="12" height="6" fill="#1a2f24" stroke="#254233" strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* Background Canvas */}
          <rect
            id="siteplan-canvas-bg"
            x="0"
            y="0"
            width={config.width}
            height={config.height}
            fill="#0b1611"
          />

          {/* Blueprint Grid Layer */}
          <rect
            x="0"
            y="0"
            width={config.width}
            height={config.height}
            fill="url(#cad-grid)"
            className="pointer-events-none"
          />

          {/* Outer Boundary Perimeter Wall */}
          <rect
            x="50"
            y="15"
            width={config.width - 100}
            height={config.height - 30}
            rx="8"
            fill="#0e1a14"
            stroke="#1f3d2e"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* North OSR Botanical Park (When generic layout has no explicit green spaces) */}
          {config.greenSpaces.length === 0 && (
            <g id="osr-north-park" className="pointer-events-none select-none">
              <rect
                x="95"
                y="24"
                width="950"
                height="94"
                rx="8"
                fill="#123023"
                stroke="#1c4835"
                strokeWidth="1.2"
              />
              <rect
                x="103"
                y="30"
                width="934"
                height="82"
                rx="6"
                fill="none"
                stroke="#c5a059"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.45"
              />
              <text
                x="570"
                y="62"
                textAnchor="middle"
                fill="#c5a059"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.5px"
              >
                OSR GRAND BOTANICAL PARK & CENTRAL WALKING TRAIL
              </text>
              <text
                x="570"
                y="80"
                textAnchor="middle"
                fill="#7b998a"
                fontSize="9"
                fontWeight="500"
              >
                Statutory DTCP Sanctioned Open Space Reservation • 100% Tree Canopy Buffer
              </text>
              {/* Decorative Tree Symbols in OSR Park */}
              {[150, 260, 370, 770, 880, 990].map((tx) => (
                <g key={`tree-n-${tx}`} transform={`translate(${tx}, 70)`}>
                  <circle cx="0" cy="0" r="10" fill="#1e4e37" stroke="#2a6d4e" strokeWidth="1" />
                  <circle cx="0" cy="0" r="4" fill="#c5a059" opacity="0.7" />
                </g>
              ))}
            </g>
          )}

          {/* South Recreation Park & Children's Play Court */}
          {config.greenSpaces.length === 0 && (
            <g id="osr-south-park" className="pointer-events-none select-none">
              <rect
                x="95"
                y="670"
                width="950"
                height="94"
                rx="8"
                fill="#123023"
                stroke="#1c4835"
                strokeWidth="1.2"
              />
              <rect
                x="103"
                y="676"
                width="934"
                height="82"
                rx="6"
                fill="none"
                stroke="#c5a059"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.45"
              />
              <text
                x="570"
                y="708"
                textAnchor="middle"
                fill="#c5a059"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.5px"
              >
                COMMUNITY MEDITATION GAZEBO, PLAY COURT & CITIZEN DECK
              </text>
              <text
                x="570"
                y="726"
                textAnchor="middle"
                fill="#7b998a"
                fontSize="9"
                fontWeight="500"
              >
                Dedicated Resident Amenities • Landscaped Flower Meadows & Seating Pavilions
              </text>
              {/* Decorative Tree Symbols in South Park */}
              {[150, 260, 370, 770, 880, 990].map((tx) => (
                <g key={`tree-s-${tx}`} transform={`translate(${tx}, 715)`}>
                  <circle cx="0" cy="0" r="10" fill="#1e4e37" stroke="#2a6d4e" strokeWidth="1" />
                  <circle cx="0" cy="0" r="4" fill="#c5a059" opacity="0.7" />
                </g>
              ))}
            </g>
          )}

          {/* Sidewalks / Footpaths along Main Roads */}
          {config.roads.map((road) => (
            <g key={`sidewalk-${road.id}`} className="pointer-events-none">
              {!road.isVertical ? (
                <>
                  {/* North Paved Sidewalk */}
                  <rect
                    x={road.x}
                    y={road.y - 8}
                    width={road.width}
                    height="8"
                    fill="url(#sidewalk-pattern)"
                    stroke="#274435"
                    strokeWidth="0.8"
                  />
                  {/* South Paved Sidewalk */}
                  <rect
                    x={road.x}
                    y={road.y + road.height}
                    width={road.width}
                    height="8"
                    fill="url(#sidewalk-pattern)"
                    stroke="#274435"
                    strokeWidth="0.8"
                  />
                </>
              ) : null}
            </g>
          ))}

          {/* Terminal Cul-de-sac Roundabout (for single avenue projects) */}
          {config.roads.length === 1 && (
            <g id="cul-de-sac-turnaround" className="pointer-events-none select-none">
              {/* Outer Paved Roundabout Circle */}
              <circle cx="1060" cy="395" r="54" fill="#1b2a22" stroke="#294537" strokeWidth="1.2" />
              <circle cx="1060" cy="395" r="46" fill="#16241d" stroke="#c5a059" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              {/* Central Landscaped Fountain Island */}
              <circle cx="1060" cy="395" r="22" fill="#133626" stroke="#1f543c" strokeWidth="1.5" />
              <circle cx="1060" cy="395" r="8" fill="#c5a059" opacity="0.8" />
              <text x="1060" y="398" textAnchor="middle" fill="#0a1f17" fontSize="7" fontWeight="800">
                ★
              </text>
            </g>
          )}

          {/* Roads Layer */}
          {config.roads.map((road) => (
            <g key={road.id}>
              <rect
                x={road.x}
                y={road.y}
                width={road.width}
                height={road.height}
                fill="#182620"
                stroke="#294335"
                strokeWidth="1.2"
                rx="2"
              />
              {/* Road Center Line */}
              {road.isVertical ? (
                <line
                  x1={road.x + road.width / 2}
                  y1={road.y + 10}
                  x2={road.x + road.width / 2}
                  y2={road.y + road.height - 10}
                  stroke="#c5a059"
                  strokeWidth="1.2"
                  strokeDasharray="5 5"
                  opacity="0.45"
                />
              ) : (
                <line
                  x1={road.x + 10}
                  y1={road.y + road.height / 2}
                  x2={road.x + road.width - 10}
                  y2={road.y + road.height / 2}
                  stroke="#c5a059"
                  strokeWidth="1.2"
                  strokeDasharray="5 5"
                  opacity="0.45"
                />
              )}
              {/* Road Label */}
              <text
                x={road.x + road.width / 2}
                y={road.y + road.height / 2 + 3.5}
                textAnchor="middle"
                fill="#8ea89a"
                fontSize="10"
                fontWeight="700"
                letterSpacing="1.2px"
                className="pointer-events-none select-none"
                style={{
                  transform: road.isVertical
                    ? `rotate(-90deg, ${road.x + road.width / 2}, ${road.y + road.height / 2})`
                    : undefined
                }}
              >
                {road.label}
              </text>
            </g>
          ))}

          {/* Green Spaces */}
          {config.greenSpaces.map((park) => (
            <g key={park.id}>
              <rect
                x={park.x}
                y={park.y}
                width={park.width}
                height={park.height}
                rx="6"
                fill="#16382a"
                stroke="#1f4d3a"
                strokeWidth="1"
              />
              <text
                x={park.x + park.width / 2}
                y={park.y + park.height / 2 + 4}
                textAnchor="middle"
                fill="#7b998a"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.8px"
              >
                {park.label}
              </text>
            </g>
          ))}

          {/* Facilities (Clubhouse, etc.) */}
          {config.facilities.map((fac) => (
            <g key={fac.id}>
              <rect
                x={fac.x}
                y={fac.y}
                width={fac.width}
                height={fac.height}
                rx="4"
                fill="#13271f"
                stroke="#c5a059"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x={fac.x + fac.width / 2}
                y={fac.y + fac.height / 2 + 4}
                textAnchor="middle"
                fill="#c5a059"
                fontSize="10"
                fontWeight="600"
              >
                {fac.label}
              </text>
            </g>
          ))}

          {/* Grand Entrance Security Gatehouse */}
          {config.gate && (
            <g className="pointer-events-none select-none">
              {/* Gatehouse Building */}
              <rect
                x={config.gate.x - 32}
                y={config.gate.y + 4}
                width="32"
                height="62"
                rx="3"
                fill="#c5a059"
                stroke="#e5c88b"
                strokeWidth="1"
              />
              {/* Roof Cap */}
              <rect
                x={config.gate.x - 34}
                y={config.gate.y + 2}
                width="36"
                height="4"
                rx="1"
                fill="#785514"
              />
              <text
                x={config.gate.x - 16}
                y={config.gate.y + 36}
                textAnchor="middle"
                fill="#0a1f17"
                fontSize="8"
                fontWeight="800"
                transform={`rotate(-90, ${config.gate.x - 16}, ${config.gate.y + 36})`}
              >
                ENTRY GATE
              </text>
            </g>
          )}

          {/* Interactive Plots Polygons */}
          {plots.map((plot) => {
            const isSelected = selectedPlot?.id === plot.id;
            const isMatched = filteredPlots.some((p) => p.id === plot.id);
            const isHovered = hoveredPlot?.id === plot.id;
            const { x, y, width, height } = plot.geometry;

            const fill = getPlotFill(plot, isMatched);
            const stroke = getPlotStroke(plot, isSelected);

            const isDeepPlot = height >= 140;
            const dimParts = plot.dimensions.split('×');
            const widthDim = dimParts[0]?.trim() || "30'";
            const depthDim = dimParts[1]?.trim() || "50'";

            return (
              <g
                key={plot.id}
                tabIndex={0}
                role="button"
                aria-label={`Plot ${plot.plotNumber}, ${plot.status}, ${formatINR(plot.price)}`}
                className="outline-hidden cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlot(plot);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPlot(plot);
                  }
                }}
                onMouseEnter={() => setHoveredPlot(plot)}
                onMouseLeave={() => setHoveredPlot(null)}
              >
                {/* Plot Background Shape */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx="4"
                  fill={fill}
                  stroke={isSelected ? '#ffffff' : stroke}
                  strokeWidth={isSelected ? '2.5' : '1.2'}
                  opacity={isMatched ? (isSelected ? '1' : isHovered ? '0.96' : '0.88') : '0.15'}
                  className={`plot-polygon transition-all ${isSelected ? 'is-selected' : ''}`}
                />

                {/* Blueprint Dimension Ticks on Plot Borders */}
                {isDeepPlot && (
                  <>
                    {/* Top Boundary Dimension */}
                    <text
                      x={x + width / 2}
                      y={y + 14}
                      textAnchor="middle"
                      fill="#86efac"
                      fontSize={width < 50 ? '8' : '9.5'}
                      fontWeight="700"
                      className="pointer-events-none select-none opacity-90"
                      opacity={isMatched ? '0.9' : '0.15'}
                    >
                      {widthDim}
                    </text>

                    {/* Bottom Boundary Dimension */}
                    <text
                      x={x + width / 2}
                      y={y + height - 6}
                      textAnchor="middle"
                      fill="#86efac"
                      fontSize={width < 50 ? '8' : '9.5'}
                      fontWeight="700"
                      className="pointer-events-none select-none opacity-90"
                      opacity={isMatched ? '0.9' : '0.15'}
                    >
                      {widthDim}
                    </text>

                    {/* Left Side Depth Dimension */}
                    <text
                      x={x + 10}
                      y={y + height / 2}
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize="8"
                      fontWeight="600"
                      className="pointer-events-none select-none opacity-80"
                      opacity={isMatched ? '0.8' : '0.15'}
                      transform={`rotate(-90, ${x + 10}, ${y + height / 2})`}
                    >
                      {depthDim}
                    </text>
                  </>
                )}

                {/* Center Architectural Plot Badge */}
                {isDeepPlot ? (
                  <>
                    {/* Badge Container Box */}
                    <rect
                      x={x + 4}
                      y={y + height / 2 - 38}
                      width={width - 8}
                      height="76"
                      rx="4"
                      fill="#000000"
                      fillOpacity="0.28"
                      stroke="#ffffff"
                      strokeOpacity="0.12"
                      strokeWidth="0.8"
                      className="pointer-events-none"
                    />

                    {/* Plot Number */}
                    <text
                      x={x + width / 2}
                      y={y + height / 2 - 18}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={width < 50 ? '13' : '16'}
                      fontWeight="800"
                      fontFamily="'Plus Jakarta Sans', sans-serif"
                      className="pointer-events-none select-none"
                      opacity={isMatched ? '1' : '0.2'}
                    >
                      {plot.plotNumber}
                    </text>

                    {/* Plot Area */}
                    <text
                      x={x + width / 2}
                      y={y + height / 2}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize={width < 50 ? '9' : '11'}
                      fontWeight="700"
                      className="pointer-events-none select-none"
                      opacity={isMatched ? '0.95' : '0.2'}
                    >
                      {plot.areaSqFt} SQ.FT
                    </text>

                    {/* Plot Dimensions */}
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 15}
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize={width < 50 ? '8' : '9.5'}
                      fontWeight="500"
                      className="pointer-events-none select-none opacity-80"
                      opacity={isMatched ? '0.8' : '0.15'}
                    >
                      {plot.dimensions}
                    </text>

                    {/* Road Facing Arrow */}
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 28}
                      textAnchor="middle"
                      fill="#c5a059"
                      fontSize="8"
                      fontWeight="700"
                      className="pointer-events-none select-none"
                      opacity={isMatched ? '0.9' : '0.2'}
                    >
                      {plot.facing === 'South' ? '↓ ROAD FACING' : '↑ ROAD FACING'}
                    </text>
                  </>
                ) : (
                  <>
                    {/* Compact Fallback for smaller heights */}
                    <text
                      x={x + width / 2}
                      y={y + height / 2 - 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={width < 46 ? '10' : width < 56 ? '11' : '12'}
                      fontWeight="700"
                      fontFamily="'Plus Jakarta Sans', sans-serif"
                      className="pointer-events-none select-none"
                      opacity={isMatched ? '1' : '0.2'}
                    >
                      {plot.plotNumber}
                    </text>

                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 11}
                      textAnchor="middle"
                      fill="#e5ece8"
                      fontSize={width < 46 ? '8' : '9'}
                      fontWeight="500"
                      className="pointer-events-none select-none opacity-80"
                      opacity={isMatched ? '0.8' : '0.15'}
                    >
                      {plot.areaSqFt} sft
                    </text>
                  </>
                )}

                {/* Corner Plot Ribbon Tag */}
                {plot.cornerPlot && (
                  <g className="pointer-events-none">
                    {width >= 60 ? (
                      <>
                        <rect x={x + width - 36} y={y + 5} width="32" height="13" rx="2" fill="#c5a059" />
                        <text x={x + width - 20} y={y + 14} textAnchor="middle" fill="#0a1f17" fontSize="7.5" fontWeight="800">
                          CORNER
                        </text>
                      </>
                    ) : (
                      <circle cx={x + width - 6} cy={y + 6} r="3" fill="#c5a059" />
                    )}
                  </g>
                )}
              </g>
            );
          })}

          {/* Architectural North Direction Compass */}
          <g transform={`translate(${config.width - 68}, 24)`}>
            <circle cx="16" cy="16" r="15" fill="#0d1b15" stroke="#234737" strokeWidth="1.2" />
            <polygon points="16,4 20,16 16,13 12,16" fill="#c5a059" />
            <polygon points="16,28 20,16 16,19 12,16" fill="#3a5246" />
            <circle cx="16" cy="16" r="2.2" fill="#c5a059" />
            <text x="16" y="3" textAnchor="middle" fill="#c5a059" fontSize="8" fontWeight="800">
              N
            </text>
          </g>
        </svg>

        {/* Minimal Hover Tooltip */}
        {hoveredPlot && (
          <div
            className="absolute z-30 pointer-events-none bg-[#09120e]/95 border border-[#234737] text-white px-3 py-2 rounded-lg shadow-xl text-xs font-sans-clean max-w-xs transition-opacity duration-150"
            style={{
              left: Math.min(mousePos.x + 12, (containerRef.current?.clientWidth || 600) - 180),
              top: Math.min(mousePos.y + 12, (containerRef.current?.clientHeight || 500) - 100)
            }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#1b3327] pb-1 mb-1">
              <span className="font-semibold text-white">
                Plot #{hoveredPlot.plotNumber}
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider ${
                  hoveredPlot.status === 'AVAILABLE'
                    ? 'text-emerald-400'
                    : hoveredPlot.status === 'RESERVED'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {hoveredPlot.status === 'AVAILABLE' ? 'Available' : hoveredPlot.status === 'RESERVED' ? 'In Process' : 'Sold'}
              </span>
            </div>
            <div className="text-[11px] text-[#8fa89b] space-y-0.5">
              <div>{hoveredPlot.areaSqFt} sq.ft • {hoveredPlot.facing} Facing</div>
              <div className="text-white font-medium">{formatINR(hoveredPlot.price)}</div>
            </div>
          </div>
        )}
        </div>

        {/* Docked Plot Details Side Panel */}
        {selectedPlot && (
          <PlotDrawer
            plot={selectedPlot}
            project={project}
            onClose={() => onSelectPlot(null)}
            onOpenEmiModal={onOpenEmiModal}
          />
        )}
      </div>

      {/* Small Persistent Status Legend */}
      <div className="bg-[#0f1f18] border-t border-[#1b3327] px-5 py-2.5 flex items-center justify-between z-20 text-xs">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a]"></span>
            <span className="text-[#c2d1c9]">Available ({availableCount})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#d97706]"></span>
            <span className="text-[#c2d1c9]">In Process ({reservedCount})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#dc2626]"></span>
            <span className="text-[#c2d1c9]">Sold ({soldCount})</span>
          </div>
        </div>

        <div className="text-[11px] text-[#7b998a] hidden sm:block">
          Click plot to view specifications & visit booking
        </div>
      </div>
    </div>
  );
};
