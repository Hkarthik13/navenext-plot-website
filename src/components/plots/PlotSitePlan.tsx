import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize2, RotateCcw, Search, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';
import { Plot, PlotGeometry, PlotStatus, Project } from '../../types';
import { formatINR } from '../../utils/formatters';
import { PlotDrawer } from './PlotDrawer';

interface PlotSitePlanProps {
  project: Project;
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot | null) => void;
  className?: string;
  onOpenEmiModal?: (plot: Plot) => void;
}

interface ParcelShape {
  points: string;
  centerX: number;
  centerY: number;
  right: number;
  top: number;
  width: number;
  height: number;
}

const STATUS_COLORS: Record<PlotStatus, string> = {
  AVAILABLE: '#21b873',
  RESERVED: '#efaa25',
  SOLD: '#e45b55',
  UNAVAILABLE: '#a0aaa4'
};

const STATUS_LABELS: Record<PlotStatus, string> = {
  AVAILABLE: 'Available',
  RESERVED: 'Reserved',
  SOLD: 'Sold',
  UNAVAILABLE: 'Unavailable'
};

const STATUS_FILL: Record<PlotStatus, string> = {
  AVAILABLE: '#128c43',
  RESERVED: '#c87205',
  SOLD: '#c92525',
  UNAVAILABLE: '#78827d'
};

const DEFAULT_PALETTE = {
  groundStart: '#536747', groundMid: '#3b5138', groundEnd: '#263d30',
  lotStart: '#168f47', lotMid: '#117d3d', lotEnd: '#0d6d36',
  road: '#293234', roadEdge: '#b2b6a7', centerline: '#d3d0b9',
  park: '#456b43', parkBorder: '#c3d0a5', water: '#56777c',
  boundary: '#eee5c9', accent: '#d0ae67', grass: '#b9c69c'
};

const hasFiniteGeometry = (geometry: PlotGeometry | undefined) => {
  if (!geometry) return false;
  return Number.isFinite(geometry.x) &&
    Number.isFinite(geometry.y) &&
    Number.isFinite(geometry.width) &&
    Number.isFinite(geometry.height) &&
    geometry.width > 0 &&
    geometry.height > 0;
};

function getParcelShape(geometry: PlotGeometry): ParcelShape | null {
  if (!hasFiniteGeometry(geometry)) return null;

  const rect = {
    x: geometry.x,
    y: geometry.y,
    width: geometry.width,
    height: geometry.height
  };

  if (!geometry.points) {
    return {
      points: rect.x + ',' + rect.y + ' ' + (rect.x + rect.width) + ',' + rect.y + ' ' +
        (rect.x + rect.width) + ',' + (rect.y + rect.height) + ' ' + rect.x + ',' + (rect.y + rect.height),
      centerX: rect.x + rect.width / 2,
      centerY: rect.y + rect.height / 2,
      right: rect.x + rect.width,
      top: rect.y,
      width: rect.width,
      height: rect.height
    };
  }

  const vertices = Array.from(geometry.points.matchAll(/(-?\d*\.?\d+)[,\s]+(-?\d*\.?\d+)/g))
    .map((match) => ({ x: Number(match[1]), y: Number(match[2]) }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));

  if (vertices.length < 3) return null;

  let twiceArea = 0;
  let centerX = 0;
  let centerY = 0;
  vertices.forEach((point, index) => {
    const next = vertices[(index + 1) % vertices.length];
    const cross = point.x * next.y - next.x * point.y;
    twiceArea += cross;
    centerX += (point.x + next.x) * cross;
    centerY += (point.y + next.y) * cross;
  });

  if (Math.abs(twiceArea) < 0.001) return null;
  centerX /= 3 * twiceArea;
  centerY /= 3 * twiceArea;

  const xs = vertices.map((point) => point.x);
  const ys = vertices.map((point) => point.y);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  const right = Math.max(...xs);
  const bottom = Math.max(...ys);

  return {
    points: vertices.map((point) => point.x + ',' + point.y).join(' '),
    centerX,
    centerY,
    right,
    top,
    width: right - left,
    height: bottom - top
  };
}

const roadCenter = (x: number, y: number, width: number, height: number, vertical: boolean) =>
  vertical
    ? { x1: x + width / 2, y1: y + 5, x2: x + width / 2, y2: y + height - 5 }
    : { x1: x + 5, y1: y + height / 2, x2: x + width - 5, y2: y + height / 2 };

export const PlotSitePlan: React.FC<PlotSitePlanProps> = ({
  project,
  plots,
  selectedPlot,
  onSelectPlot,
  className = '',
  onOpenEmiModal
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [facingFilter, setFacingFilter] = useState('ALL');
  const [cornersOnly, setCornersOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hovered, setHovered] = useState<Plot | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mapSize, setMapSize] = useState({ width: 500, height: 580 });
  const [fullscreen, setFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const view = project.layoutConfig;
  const palette = DEFAULT_PALETTE;
  const viewBox = view?.viewBox || '0 0 1200 800';
  const roads = view?.roads || [];
  const greenSpaces = view?.greenSpaces || [];
  const facilities = view?.facilities || [];
  const gate = view?.gate;
  const viewWidth = view?.width || 1200;
  const viewHeight = view?.height || 800;
  const svgId = project.id.replace(/[^a-zA-Z0-9]/g, '');
  const isVerifiedImage = view?.imageryStatus === 'verified' && Boolean(view?.aerialImage);
  const isVerifiedGeometry = view?.geometryStatus === 'verified';
  const parcelShapes = useMemo(() => {
    const shapes = new Map<string, ParcelShape>();
    plots.forEach((plot) => {
      const shape = getParcelShape(plot.geometry);
      if (shape) shapes.set(plot.id, shape);
    });
    return shapes;
  }, [plots]);
  const counts = useMemo(() => ({
    AVAILABLE: plots.filter((plot) => plot.status === 'AVAILABLE').length,
    RESERVED: plots.filter((plot) => plot.status === 'RESERVED').length,
    SOLD: plots.filter((plot) => plot.status === 'SOLD').length,
    UNAVAILABLE: plots.filter((plot) => plot.status === 'UNAVAILABLE').length
  }), [plots]);
  const visiblePlotIds = useMemo(() => new Set(plots.filter((plot) =>
    (statusFilter === 'ALL' || plot.status === statusFilter) &&
    (facingFilter === 'ALL' || (plot.facing?.toLowerCase().includes(facingFilter.toLowerCase()) ?? false)) &&
    (!cornersOnly || plot.cornerPlot) &&
    plot.plotNumber.toLowerCase().includes(searchTerm.trim().toLowerCase())
  ).map((plot) => plot.id)), [plots, statusFilter, facingFilter, cornersOnly, searchTerm]);
  const plotsWithoutGeometry = plots.filter((plot) => !parcelShapes.has(plot.id));

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', updateFullscreen);
    return () => document.removeEventListener('fullscreenchange', updateFullscreen);
  }, []);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!rootRef.current) return;
    if (!document.fullscreenElement) void rootRef.current.requestFullscreen().catch(() => undefined);
    else void document.exitFullscreen().catch(() => undefined);
  };

  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('[data-plot]')) return;
    setDragging(true);
    setDragStart({ x: event.clientX - pan.x, y: event.clientY - pan.y });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const movePan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setPan({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) {
      setMouse({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      setMapSize({ width: rect.width, height: rect.height });
    }
  };

  const moveZoom = (direction: number) =>
    setZoom((value) => Math.max(0.7, Math.min(2.6, value + direction)));

  return (
    <div ref={rootRef} className={'relative flex flex-col overflow-hidden rounded-xl border border-[#294536] bg-[#14251b] text-white shadow-xl ' + className}>
      <div className="z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#112119] px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            aria-label="Filter plots by availability"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-md border border-white/15 bg-[#1b3326] px-2.5 py-1.5 text-[#dce9df] outline-none"
          >
            <option value="ALL">All plots ({plots.length})</option>
            {(['AVAILABLE', 'RESERVED', 'SOLD', 'UNAVAILABLE'] as PlotStatus[]).map((status) => (
              <option key={status} value={status}>{STATUS_LABELS[status]} ({counts[status]})</option>
            ))}
          </select>
          <select
            aria-label="Filter plots by facing"
            value={facingFilter}
            onChange={(event) => setFacingFilter(event.target.value)}
            className="rounded-md border border-white/15 bg-[#1b3326] px-2.5 py-1.5 text-[#dce9df] outline-none"
          >
            <option value="ALL">All facings</option>
            {['North', 'East', 'South', 'West'].map((facing) => <option key={facing} value={facing}>{facing}</option>)}
          </select>
          <label className="flex items-center gap-1.5 rounded-md border border-white/15 bg-[#1b3326] px-2.5 py-1.5 text-[#c4d3c8]">
            <Search className="h-3 w-3 shrink-0" />
            <input
              type="search"
              aria-label="Search by plot number"
              placeholder="Plot no."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-24 bg-transparent text-[#f2f5ef] outline-none placeholder:text-[#91a59a]"
            />
          </label>
          <button
            type="button"
            onClick={() => setCornersOnly((value) => !value)}
            aria-pressed={cornersOnly}
            className={'flex items-center gap-1 rounded-md border px-2.5 py-1.5 ' +
              (cornersOnly ? 'border-[#d7be80] bg-[#d7be80] text-[#1e281e]' : 'border-white/15 bg-[#1b3326] text-[#c4d3c8]')}
          >
            <Sparkles className="h-3 w-3" />Corner
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => moveZoom(0.2)} title="Zoom in" aria-label="Zoom in" className="rounded-md border border-white/15 bg-[#1b3326] p-1.5"><ZoomIn className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => moveZoom(-0.2)} title="Zoom out" aria-label="Zoom out" className="rounded-md border border-white/15 bg-[#1b3326] p-1.5"><ZoomOut className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={resetView} title="Reset view" aria-label="Reset view" className="rounded-md border border-white/15 bg-[#1b3326] p-1.5"><RotateCcw className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={toggleFullscreen} title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} aria-label="Toggle fullscreen" className="rounded-md border border-white/15 bg-[#1b3326] p-1.5"><Maximize2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="flex min-h-[580px] flex-1 flex-col overflow-hidden lg:flex-row">
        <div
          ref={mapRef}
          className="relative min-h-[580px] flex-1 cursor-grab overflow-hidden bg-[#344b31] active:cursor-grabbing"
          onPointerDown={startPan}
          onPointerMove={movePan}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          onPointerLeave={() => { setDragging(false); setHovered(null); }}
        >
          <svg
            viewBox={viewBox}
            role="group"
            aria-label={project.name + ' illustrative plot masterplan'}
            className="h-full w-full touch-pan-y"
            style={{
              transform: 'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ')',
              transformOrigin: 'center',
              transition: dragging ? 'none' : 'transform 120ms ease-out'
            }}
          >
            <defs>
              <linearGradient id={svgId + '-ground'} x1="0" y1="0" x2="1" y2="1">
                <stop stopColor={palette.groundStart} />
                <stop offset="0.48" stopColor={palette.groundMid} />
                <stop offset="1" stopColor={palette.groundEnd} />
              </linearGradient>
              <linearGradient id={svgId + '-road'} x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={palette.road} />
                <stop offset="0.5" stopColor="#202729" />
                <stop offset="1" stopColor={palette.road} />
              </linearGradient>
              <linearGradient id={svgId + '-lot'} x1="0" y1="0" x2="0.85" y2="1">
                <stop stopColor={palette.lotStart} />
                <stop offset="0.55" stopColor={palette.lotMid} />
                <stop offset="1" stopColor={palette.lotEnd} />
              </linearGradient>
              <pattern id={svgId + '-grass'} width="46" height="38" patternUnits="userSpaceOnUse">
                <path d="M7 29l3-5m12 8 2-4m13-17 2-5" fill="none" stroke={palette.grass} strokeOpacity="0.16" strokeWidth="1.4" />
                <circle cx="15" cy="11" r="1.2" fill={palette.grass} fillOpacity="0.16" />
                <circle cx="37" cy="30" r="1" fill={palette.grass} fillOpacity="0.18" />
              </pattern>
              <radialGradient id={svgId + '-shade'}>
                <stop offset="0.55" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#101b16" stopOpacity="0.34" />
              </radialGradient>
              <filter id={svgId + '-shadow'} x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#102016" floodOpacity="0.45" />
              </filter>
              <filter id={svgId + '-label'} x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1a261b" floodOpacity="0.92" />
              </filter>
            </defs>

            {isVerifiedImage ? (
              <image href={view.aerialImage!} x="0" y="0" width={viewWidth} height={viewHeight} preserveAspectRatio="none" />
            ) : (
              <>
                <rect x="0" y="0" width={viewWidth} height={viewHeight} fill={'url(#' + svgId + '-ground)'} />
                <rect x="0" y="0" width={viewWidth} height={viewHeight} fill={'url(#' + svgId + '-grass)'} opacity="0.58" />
                <rect x="0" y="0" width={viewWidth} height={viewHeight} fill={'url(#' + svgId + '-shade)'} />
              </>
            )}

            {greenSpaces.map((space) => (
              <g key={space.id} pointerEvents="none">
                <rect x={space.x} y={space.y} width={space.width} height={space.height} rx="12" fill="#263e2b" opacity="0.5" />
                <rect x={space.x + 3} y={space.y + 3} width={Math.max(0, space.width - 6)} height={Math.max(0, space.height - 6)} rx="10" fill={space.kind === 'water' ? palette.water : palette.park} stroke={palette.parkBorder} strokeWidth="2" />
                <rect x={space.x + 7} y={space.y + 7} width={Math.max(0, space.width - 14)} height={Math.max(0, space.height - 14)} rx="8" fill={'url(#' + svgId + '-grass)'} opacity="0.46" />
                <text x={space.x + space.width / 2} y={space.y + space.height / 2} textAnchor="middle" dominantBaseline="middle" fill="#f5edcf" fontSize={Math.min(14, Math.max(8, space.width / 20))} fontWeight="700" letterSpacing="1" paintOrder="stroke" stroke="#32462f" strokeWidth="3">{space.label || space.name}</text>
              </g>
            ))}

            {roads.map((road) => {
              const vertical = road.isVertical ?? road.height > road.width;
              const center = roadCenter(road.x, road.y, road.width, road.height, vertical);
              const label = road.label || road.name;
              return (
                <g key={road.id} pointerEvents="none" filter={'url(#' + svgId + '-shadow)'}>
                  <rect x={road.x - 5} y={road.y - 5} width={road.width + 10} height={road.height + 10} rx={Math.min(10, Math.max(3, road.height / 8))} fill={palette.roadEdge} />
                  <rect x={road.x} y={road.y} width={road.width} height={road.height} rx={Math.min(8, Math.max(2, road.height / 10))} fill={'url(#' + svgId + '-road)'} />
                  <line {...center} stroke={palette.centerline} strokeWidth={Math.max(1, Math.min(2, road.height / 24))} strokeDasharray={Math.max(6, Math.min(15, road.height / 3)) + ' ' + Math.max(6, Math.min(15, road.height / 3))} opacity="0.68" />
                  <text
                    x={road.x + road.width / 2}
                    y={road.y + road.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#f4efd9"
                    fontSize={Math.min(13, Math.max(8, Math.min(road.width, road.height) / 4))}
                    fontWeight="700"
                    letterSpacing="1"
                    paintOrder="stroke"
                    stroke="#202827"
                    strokeWidth="3"
                    transform={vertical ? 'rotate(-90 ' + (road.x + road.width / 2) + ' ' + (road.y + road.height / 2) + ')' : undefined}
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {facilities.map((facility) => (
              <g key={facility.id} pointerEvents="none" filter={'url(#' + svgId + '-shadow)'}>
                <rect x={facility.x} y={facility.y} width={facility.width} height={facility.height} rx="8" fill={palette.park} stroke={palette.parkBorder} strokeWidth="2" />
                <rect x={facility.x + 4} y={facility.y + 4} width={Math.max(0, facility.width - 8)} height={Math.max(0, facility.height - 8)} rx="5" fill="#405945" opacity="0.84" />
                <text x={facility.x + facility.width / 2} y={facility.y + facility.height / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff5d7" fontSize={Math.min(12, Math.max(8, facility.width / 12))} fontWeight="700" paintOrder="stroke" stroke="#263a2c" strokeWidth="3">{facility.label || facility.name}</text>
              </g>
            ))}

            {isVerifiedGeometry && view?.siteBoundary && (
                <polygon points={view.siteBoundary} fill="none" stroke={palette.boundary} strokeWidth="5" strokeLinejoin="round" pointerEvents="none" />
            )}

            {plots.map((plot) => {
              const shape = parcelShapes.get(plot.id);
              if (!shape) return null;
              const selected = selectedPlot?.id === plot.id;
              const active = hovered?.id === plot.id;
              const matches = visiblePlotIds.has(plot.id);
              const fill = STATUS_FILL[plot.status];
              const statusColor = STATUS_COLORS[plot.status];

              return (
                <g
                  key={plot.id}
                  data-plot="true"
                  tabIndex={0}
                  role="button"
                  aria-label={'Plot ' + plot.plotNumber + ', ' + STATUS_LABELS[plot.status] + ', ' + formatINR(plot.price)}
                  className="cursor-pointer outline-none"
                  onClick={(event) => { event.stopPropagation(); onSelectPlot(plot); }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectPlot(plot);
                    }
                  }}
                  onFocus={() => setHovered(plot)}
                  onMouseEnter={() => setHovered(plot)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <polygon
                    points={shape.points}
                    fill={fill}
                    filter={'url(#' + svgId + '-shadow)'}
                    fillOpacity={matches ? 0.96 : 0.12}
                    stroke={palette.boundary}
                    strokeWidth={selected ? 4 : active ? 3 : 1.8}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <polygon
                    points={shape.points}
                    fill={selected || active ? '#f2d487' : 'transparent'}
                    fillOpacity={selected || active ? 0.12 : 0}
                    stroke={selected ? '#fff8d8' : active ? '#fff0bc' : palette.boundary}
                    strokeWidth={selected ? 4 : active ? 3 : 1.8}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                  <text
                    x={shape.centerX}
                    y={shape.centerY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize={Math.max(10, Math.min(24, Math.min(shape.width, shape.height) * 0.33))}
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    paintOrder="stroke"
                    stroke="#243125"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    filter={'url(#' + svgId + '-label)'}
                    opacity={matches ? 1 : 0.4}
                    pointerEvents="none"
                  >
                    {plot.plotNumber.replace(/^P-/, '')}
                  </text>
                  <circle
                    cx={shape.right - Math.min(10, shape.width * 0.12)}
                    cy={shape.top + Math.min(10, shape.height * 0.12)}
                    r={Math.max(3, Math.min(5, Math.min(shape.width, shape.height) * 0.055))}
                    fill={statusColor}
                    stroke="#fff2d5"
                    strokeWidth="1.2"
                    pointerEvents="none"
                  />
                </g>
              );
            })}

            {gate && (
              <g pointerEvents="none" filter={'url(#' + svgId + '-shadow)'}>
                <circle cx={gate.x} cy={gate.y} r="14" fill={palette.accent} stroke="#fff0c5" strokeWidth="2" />
                <path d={'M' + (gate.x - 5) + ' ' + gate.y + 'h10 M' + gate.x + ' ' + (gate.y - 5) + 'v10'} stroke="#27392d" strokeWidth="2" />
                <text x={gate.x + 20} y={gate.y + 4} fill="#fff3d0" fontSize="11" fontWeight="800" letterSpacing="1" paintOrder="stroke" stroke="#25362b" strokeWidth="3">{gate.label}</text>
              </g>
            )}
          </svg>

          {hovered && (
            <div
              className="pointer-events-none absolute z-30 max-w-[220px] rounded-lg border border-[#ead9a2]/60 bg-[#16251e]/95 px-3 py-2 text-xs shadow-xl"
              style={{
                left: Math.min(mouse.x + 12, Math.max(8, mapSize.width - 230)),
                top: Math.min(mouse.y + 12, Math.max(8, mapSize.height - 100))
              }}
            >
              <div className="mb-1 flex items-center justify-between gap-4 border-b border-white/10 pb-1">
                <span className="font-semibold">Plot #{hovered.plotNumber}</span>
                <span style={{ color: STATUS_COLORS[hovered.status] }}>{STATUS_LABELS[hovered.status]}</span>
              </div>
              <div className="text-[#ced8ce]">{hovered.areaSqFt.toLocaleString()} sq.ft · {hovered.facing || 'Facing to be confirmed'}</div>
              <div className="font-medium">{formatINR(hovered.price)}</div>
              <div className="text-[10px] text-[#9eb2a3]">{hovered.dimensions}</div>
            </div>
          )}

          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-white/20 bg-[#17261d]/90 px-3 py-2 text-[10px] text-[#f1efdc] shadow backdrop-blur-sm">
            {(['AVAILABLE', 'RESERVED', 'SOLD', 'UNAVAILABLE'] as PlotStatus[]).map((status) => (
              <span key={status} className="flex items-center gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full border border-white/70" style={{ background: STATUS_COLORS[status] }} />
                {STATUS_LABELS[status]}
              </span>
            ))}
          </div>

          {parcelShapes.size === 0 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-lg border border-[#e4d3a0]/50 bg-[#14251b]/95 p-4 text-center text-sm text-[#f2ead2] shadow-xl">
              Approved parcel coordinates are not connected for this development. Select a plot from the records below to inspect its listed details.
            </div>
          )}
        </div>

        {selectedPlot && (
          <PlotDrawer
            plot={selectedPlot}
            project={project}
            onClose={() => onSelectPlot(null)}
            onOpenEmiModal={onOpenEmiModal}
          />
        )}
      </div>

      {plotsWithoutGeometry.length > 0 && (
        <div className="border-t border-white/10 bg-[#14251b] px-4 py-3">
          <p className="mb-2 text-xs text-[#b8c8ba]">Plots without mapped parcel coordinates</p>
          <div className="flex max-h-28 flex-wrap gap-2 overflow-auto">
            {plotsWithoutGeometry.filter((plot) => visiblePlotIds.has(plot.id)).map((plot) => (
              <button
                type="button"
                key={plot.id}
                onClick={() => onSelectPlot(plot)}
                className="rounded-md border border-white/15 bg-[#1b3326] px-2.5 py-1.5 text-xs text-[#e7eee7] hover:border-[#d7be80]"
              >
                #{plot.plotNumber} · {STATUS_LABELS[plot.status]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-white/10 bg-[#112119] px-4 py-2 text-center text-[11px] text-[#b8c8ba]">
        {isVerifiedGeometry
          ? 'Select a parcel for details · verified geometry'
          : 'Select a plot for details · illustrative plot coordinates and listing data'}
      </div>
    </div>
  );
};
