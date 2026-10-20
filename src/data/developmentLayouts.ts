import { Plot, LayoutConfig, PlotFacing, PlotStatus } from '../types';

// ============================================================================
// 18 UNIQUE REAL ESTATE DEVELOPMENTS (Direct from User Masterplan Catalogue)
// Image Dimensions: 1280x720 (16:9)
// ============================================================================

export interface DevelopmentMeta {
  index: number;
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  prefix: number; // e.g., 1 -> 100s, 2 -> 200s, 13 -> 1300s
}

export const DEVELOPMENT_CATALOGUE: Record<number, DevelopmentMeta> = {
  1: {
    index: 1,
    id: 'steep-hillside',
    name: 'Steep Hillside',
    category: 'Foothill & Ridge',
    image: '/images/developments/01-steep-hillside.jpg',
    description: 'Sloping contour hillside layout with winding internal roads and terraced lots.',
    prefix: 100
  },
  2: {
    index: 2,
    id: 'lagoon-edge',
    name: 'Lagoon Edge',
    category: 'Waterfront Marine',
    image: '/images/developments/02-lagoon-edge.jpg',
    description: 'Linear waterfront peninsula along serene lagoon waters with private boardwalks.',
    prefix: 200
  },
  3: {
    index: 3,
    id: 'cul-de-sac-close',
    name: 'Cul-de-Sac Close',
    category: 'Private Enclave',
    image: '/images/developments/03-cul-de-sac-close.jpg',
    description: 'Circular cul-de-sac avenue with central park median and perimeter homes.',
    prefix: 300
  },
  4: {
    index: 4,
    id: 'mountain-valley',
    name: 'Mountain Valley',
    category: 'Valley Corridor',
    image: '/images/developments/04-mountain-valley.jpg',
    description: 'Linear canyon corridor nestled between majestic mountain ridges.',
    prefix: 400
  },
  5: {
    index: 5,
    id: 'gridiron-coastal',
    name: 'Gridiron Coastal',
    category: 'Coastal Grid',
    image: '/images/developments/05-gridiron-coastal.jpg',
    description: 'Modern orthogonal coastal block masterplan with clean avenue intersections.',
    prefix: 500
  },
  6: {
    index: 6,
    id: 'radial-view',
    name: 'Radial View',
    category: 'Panoramic Amphitheatre',
    image: '/images/developments/06-radial-view.jpg',
    description: 'Semicircular radial fan layout commanding panoramic ocean & valley vistas.',
    prefix: 600
  },
  7: {
    index: 7,
    id: 'cliff-edge',
    name: 'Cliff Edge',
    category: 'Ocean Promontory',
    image: '/images/developments/07-cliff-edge.jpg',
    description: 'Oceanfront bluff community hugging rugged seaside cliffs with crashing waves.',
    prefix: 700
  },
  8: {
    index: 8,
    id: 'peninsula-tip',
    name: 'Peninsula Tip',
    category: 'Marine Peninsula',
    image: '/images/developments/08-peninsula-tip.jpg',
    description: 'Forked coastal peninsula jutting into crystal ocean waters with dual road arteries.',
    prefix: 800
  },
  9: {
    index: 9,
    id: 'interwoven-streets',
    name: 'Interwoven Streets',
    category: 'Organic Estate',
    image: '/images/developments/09-interwoven-streets.jpg',
    description: 'Interlocking curvilinear avenue system with pocket parks and green medians.',
    prefix: 900
  },
  10: {
    index: 10,
    id: 'terraced-slopes',
    name: 'Terraced Slopes',
    category: 'Contour Terrace',
    image: '/images/developments/10-terraced-slopes.jpg',
    description: 'Stepped hillside terraces with tiered residential parcels for unhindered horizons.',
    prefix: 1000
  },
  11: {
    index: 11,
    id: 'marshland-green',
    name: 'Marshland Green',
    category: 'Nature Wetland',
    image: '/images/developments/11-marshland-green.jpg',
    description: 'Eco-conscious masterplan wrapping around a central pristine wetland reserve.',
    prefix: 1100
  },
  12: {
    index: 12,
    id: 'double-street-spine',
    name: 'Double Street Spine',
    category: 'Dual Boulevard',
    image: '/images/developments/12-double-street-spine.jpg',
    description: 'Clean dual-spine central avenue flanked by expansive rectangular villa parcels.',
    prefix: 1200
  },
  13: {
    index: 13,
    id: 'integrated-amenity',
    name: 'Integrated Amenity',
    category: 'Resort Lifestyle',
    image: '/images/developments/13-integrated-amenity.jpg',
    description: 'Horseshoe residential loop enclosing a central grand clubhouse, swimming pool, and sports court.',
    prefix: 1300
  },
  14: {
    index: 14,
    id: 'scattered-forest',
    name: 'Scattered Forest',
    category: 'Woodland Canopy',
    image: '/images/developments/14-scattered-forest.jpg',
    description: 'Organic woodland retreat woven through mature forest trees and nature trails.',
    prefix: 1400
  },
  15: {
    index: 15,
    id: 'hilly-ravine',
    name: 'Hilly Ravine',
    category: 'Alpine Switchback',
    image: '/images/developments/15-hilly-ravine.jpg',
    description: 'Serpentine hillside switchbacks winding down scenic forested mountain ravines.',
    prefix: 1500
  },
  16: {
    index: 16,
    id: 'urban-fringe',
    name: 'Urban Fringe',
    category: 'Modern Grid',
    image: '/images/developments/16-urban-fringe.jpg',
    description: 'High-connectivity suburban residential grid with tree-lined pedestrian avenues.',
    prefix: 1600
  },
  17: {
    index: 17,
    id: 'coastal-dunes',
    name: 'Coastal Dunes',
    category: 'Dune Sanctuary',
    image: '/images/developments/17-coastal-dunes.jpg',
    description: 'Peaceful rolling dune contours fronting pristine golden sands and sea breezes.',
    prefix: 1700
  },
  18: {
    index: 18,
    id: 'steep-point',
    name: 'Steep Point',
    category: 'Ocean Cape',
    image: '/images/developments/18-steep-point.jpg',
    description: 'Dramatic triangular coastal headland tapering to a panoramic ocean vantage point.',
    prefix: 1800
  }
};

// Helper to construct a LayoutConfig for a development
export function createDevelopmentLayoutConfig(devNum: number): LayoutConfig {
  const meta = DEVELOPMENT_CATALOGUE[devNum];
  return {
    viewBox: '0 0 1280 720',
    width: 1280,
    height: 720,
    // Licensed stock imagery is illustrative, not a photograph of this project.
    // It is used only for the double-spine concept because its visible street
    // pattern is a closer visual match than it would be for the other layouts.
    aerialImage: devNum === 12 ? '/images/developments/aerial-double-spine.jpg' : undefined,
    themeTitle: `${meta.index}. ${meta.name}`,
    isRealisticMasterplan: true,
    roads: [],
    greenSpaces: [],
    facilities: [],
    gate: { x: 64, y: 360, label: 'ENTRANCE' }
  };
}

// Helper to determine status deterministically
function getDeterministicStatus(lotNum: number): PlotStatus {
  const mod = lotNum % 7;
  if (mod === 0) return 'SOLD';
  if (mod === 3 || mod === 5) return 'RESERVED';
  return 'AVAILABLE';
}

// ============================================================================
// PLOT GENERATORS FOR ALL 18 DEVELOPMENT CONCEPTS
// These are illustrative demo coordinates; approved survey polygons are not connected.
// ============================================================================

interface LotBlueprint {
  num: number | string;
  x: number;
  y: number;
  w: number;
  h: number;
  points?: string;
  dim?: string;
  sqft?: number;
  facing?: PlotFacing;
  corner?: boolean;
  park?: boolean;
}

function buildPlotsFromBlueprints(
  projectId: string,
  baseRate: number,
  blueprints: LotBlueprint[]
): Plot[] {
  return blueprints.map((bp, idx) => {
    const lotNum = typeof bp.num === 'number' ? bp.num : parseInt(bp.num, 10) || idx + 1;
    const area = bp.sqft || Math.round(bp.w * bp.h * 0.75 + 1200);
    const rate = bp.corner ? baseRate * 1.1 : bp.park ? baseRate * 1.05 : baseRate;
    const finalRate = Math.round(rate);
    const price = Math.round(area * finalRate);
    // No approved frontage survey is connected in this demo repository.
    const facing = null;
    const status = getDeterministicStatus(lotNum);
    const dim = bp.dim || (area >= 2400 ? "40' x 60'" : area >= 1800 ? "35' x 55'" : "30' x 40'");

    return {
      id: `${projectId}-plot-${bp.num}`,
      projectId,
      plotNumber: `${bp.num}`,
      dimensions: dim,
      areaSqFt: area,
      facing,
      price,
      pricePerSqFt: finalRate,
      status,
      geometry: {
        x: bp.x,
        y: bp.y,
        width: bp.w,
        height: bp.h,
        points: bp.points || (() => {
          // A light parcel angle gives the vector plan the hand-drawn lot
          // boundaries in the catalogue while keeping every lot selectable.
          const inset = Math.max(2, Math.min(7, Math.round(Math.min(bp.w, bp.h) * 0.07)));
          const skew = ((idx % 5) - 2) * 1.5;
          return [
            `${bp.x + inset + skew},${bp.y}`,
            `${bp.x + bp.w},${bp.y + inset}`,
            `${bp.x + bp.w - inset - skew},${bp.y + bp.h}`,
            `${bp.x},${bp.y + bp.h - inset}`
          ].join(' ');
        })()
      },
      cornerPlot: !!bp.corner,
      parkFacing: !!bp.park,
      roadWidthFt: bp.corner ? 40 : 33,
      notes: `Illustrative parcel #${bp.num}. Confirm the approved plan, dimensions, frontage and availability with the project team.`,
      phase: 'Phase 1 - Ready to Register'
    };
  });
}

// ----------------------------------------------------------------------------
// 1. Steep Hillside (Plots 101 to 125)
// ----------------------------------------------------------------------------
export function generateSteepHillsidePlots(projectId: string, baseRate: number = 3200): Plot[] {
  const lots: LotBlueprint[] = [
    // Top tier
    { num: 101, x: 260, y: 140, w: 90, h: 65, corner: true },
    { num: 102, x: 360, y: 135, w: 85, h: 65 },
    { num: 103, x: 455, y: 130, w: 85, h: 65 },
    { num: 104, x: 550, y: 135, w: 90, h: 65 },
    { num: 105, x: 650, y: 145, w: 90, h: 65, corner: true },
    // Middle Crescent
    { num: 106, x: 220, y: 230, w: 95, h: 70, corner: true },
    { num: 107, x: 325, y: 225, w: 85, h: 70 },
    { num: 108, x: 420, y: 220, w: 85, h: 70, park: true },
    { num: 109, x: 515, y: 220, w: 85, h: 70, park: true },
    { num: 110, x: 610, y: 225, w: 85, h: 70 },
    { num: 111, x: 705, y: 235, w: 95, h: 70, corner: true },
    // Lower Crescent
    { num: 112, x: 190, y: 330, w: 100, h: 75, corner: true },
    { num: 113, x: 300, y: 325, w: 90, h: 75 },
    { num: 114, x: 400, y: 320, w: 90, h: 75, park: true },
    { num: 115, x: 500, y: 320, w: 90, h: 75, park: true },
    { num: 116, x: 600, y: 325, w: 90, h: 75 },
    { num: 117, x: 700, y: 335, w: 90, h: 75 },
    { num: 118, x: 800, y: 350, w: 95, h: 75, corner: true },
    // Base Tier
    { num: 119, x: 230, y: 440, w: 110, h: 80, corner: true },
    { num: 120, x: 350, y: 435, w: 100, h: 80 },
    { num: 121, x: 460, y: 430, w: 100, h: 80, park: true },
    { num: 122, x: 570, y: 435, w: 100, h: 80 },
    { num: 123, x: 680, y: 445, w: 100, h: 80 },
    { num: 124, x: 790, y: 460, w: 110, h: 80, corner: true },
    { num: 125, x: 510, y: 535, w: 120, h: 85, corner: true, park: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 2. Lagoon Edge (Linear Waterfront Spit - Plots 201 to 218)
// ----------------------------------------------------------------------------
export function generateLagoonEdgePlots(projectId: string, baseRate: number = 4200): Plot[] {
  const lots: LotBlueprint[] = [
    // Waterfront North Shore (Direct water view)
    { num: 201, x: 140, y: 220, w: 85, h: 75, corner: true, park: true, dim: "40' Ã— 60'", sqft: 2400 },
    { num: 202, x: 235, y: 210, w: 75, h: 70, park: true, dim: "35' Ã— 55'", sqft: 1925 },
    { num: 203, x: 320, y: 200, w: 75, h: 70, park: true, dim: "35' Ã— 55'", sqft: 1925 },
    { num: 204, x: 405, y: 190, w: 75, h: 68, park: true, dim: "35' Ã— 55'", sqft: 1925 },
    { num: 205, x: 490, y: 180, w: 75, h: 65, park: true, dim: "35' Ã— 50'", sqft: 1750 },
    { num: 206, x: 575, y: 170, w: 70, h: 65, park: true, dim: "35' Ã— 50'", sqft: 1750 },
    { num: 207, x: 655, y: 160, w: 70, h: 62, park: true, dim: "35' Ã— 50'", sqft: 1750 },
    { num: 208, x: 735, y: 150, w: 70, h: 60, park: true, dim: "30' Ã— 50'", sqft: 1500 },
    { num: 209, x: 815, y: 140, w: 70, h: 58, park: true, dim: "30' Ã— 50'", sqft: 1500 },
    { num: 210, x: 895, y: 130, w: 75, h: 55, corner: true, park: true, dim: "35' Ã— 50'", sqft: 1750 },
    // South Shore Boardwalk
    { num: 211, x: 160, y: 330, w: 90, h: 75, corner: true, dim: "40' Ã— 60'", sqft: 2400 },
    { num: 212, x: 260, y: 315, w: 80, h: 72, dim: "35' Ã— 55'", sqft: 1925 },
    { num: 213, x: 350, y: 300, w: 80, h: 70, dim: "35' Ã— 55'", sqft: 1925 },
    { num: 214, x: 440, y: 285, w: 80, h: 68, dim: "35' Ã— 55'", sqft: 1925 },
    { num: 215, x: 530, y: 270, w: 80, h: 65, dim: "35' Ã— 50'", sqft: 1750 },
    { num: 216, x: 620, y: 255, w: 80, h: 62, dim: "35' Ã— 50'", sqft: 1750 },
    { num: 217, x: 710, y: 240, w: 80, h: 60, dim: "35' Ã— 50'", sqft: 1750 },
    { num: 218, x: 800, y: 225, w: 90, h: 60, corner: true, dim: "40' Ã— 50'", sqft: 2000 }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 3. Cul-de-Sac Close (Plots 301 to 324)
// ----------------------------------------------------------------------------
export function generateCulDeSacPlots(projectId: string, baseRate: number = 3800): Plot[] {
  const lots: LotBlueprint[] = [
    // Central Island Loop
    { num: 301, x: 420, y: 230, w: 75, h: 65, park: true },
    { num: 308, x: 505, y: 230, w: 75, h: 65, park: true },
    { num: 309, x: 590, y: 230, w: 75, h: 65, park: true },
    { num: 310, x: 675, y: 230, w: 75, h: 65, park: true },
    { num: 311, x: 760, y: 230, w: 75, h: 65, corner: true, park: true },
    { num: 314, x: 440, y: 315, w: 75, h: 65, park: true },
    { num: 315, x: 525, y: 315, w: 75, h: 65, park: true },
    { num: 316, x: 610, y: 315, w: 75, h: 65, park: true },
    { num: 318, x: 695, y: 315, w: 75, h: 65, park: true },
    { num: 320, x: 780, y: 315, w: 75, h: 65, corner: true, park: true },
    // Outer Horseshoe Ring (North Arch)
    { num: 302, x: 330, y: 120, w: 80, h: 70, corner: true },
    { num: 303, x: 420, y: 115, w: 80, h: 70 },
    { num: 304, x: 510, y: 115, w: 80, h: 70 },
    { num: 305, x: 600, y: 115, w: 80, h: 70 },
    { num: 306, x: 690, y: 115, w: 80, h: 70 },
    { num: 307, x: 780, y: 120, w: 80, h: 70, corner: true },
    // Outer Horseshoe Ring (South Arch)
    { num: 321, x: 260, y: 230, w: 85, h: 75, corner: true },
    { num: 322, x: 260, y: 325, w: 85, h: 75 },
    { num: 323, x: 300, y: 420, w: 85, h: 75, corner: true },
    { num: 324, x: 395, y: 435, w: 80, h: 75 },
    { num: 325, x: 485, y: 440, w: 80, h: 75 },
    { num: 326, x: 575, y: 440, w: 80, h: 75 },
    { num: 327, x: 665, y: 435, w: 80, h: 75 },
    { num: 328, x: 755, y: 425, w: 85, h: 75 },
    { num: 329, x: 840, y: 395, w: 85, h: 75, corner: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 4. Mountain Valley (Plots 401 to 424)
// ----------------------------------------------------------------------------
export function generateMountainValleyPlots(projectId: string, baseRate: number = 3600): Plot[] {
  const lots: LotBlueprint[] = [];
  // North-West diagonal flank
  for (let i = 0; i < 12; i++) {
    lots.push({
      num: 401 + i,
      x: 180 + i * 75,
      y: 430 - i * 28,
      w: 68,
      h: 80,
      corner: i === 0 || i === 11,
      park: i % 3 === 0
    });
  }
  // South-East diagonal flank
  for (let i = 0; i < 12; i++) {
    lots.push({
      num: 413 + i,
      x: 230 + i * 75,
      y: 520 - i * 28,
      w: 68,
      h: 80,
      corner: i === 0 || i === 11,
      park: i % 4 === 0
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 5. Gridiron Coastal (Plots 501 to 529)
// ----------------------------------------------------------------------------
export function generateGridironPlots(projectId: string, baseRate: number = 3400): Plot[] {
  const lots: LotBlueprint[] = [
    // Block 1 (North-West)
    { num: 501, x: 120, y: 120, w: 90, h: 70, corner: true },
    { num: 502, x: 220, y: 120, w: 85, h: 70 },
    { num: 503, x: 315, y: 120, w: 85, h: 70 },
    { num: 504, x: 410, y: 120, w: 90, h: 70, corner: true },
    { num: 505, x: 120, y: 200, w: 90, h: 70, corner: true },
    { num: 506, x: 220, y: 200, w: 85, h: 70 },
    { num: 507, x: 315, y: 200, w: 85, h: 70 },
    { num: 508, x: 410, y: 200, w: 90, h: 70, corner: true },
    // Block 2 (North-East)
    { num: 518, x: 570, y: 120, w: 90, h: 70, corner: true },
    { num: 519, x: 670, y: 120, w: 85, h: 70 },
    { num: 520, x: 765, y: 120, w: 90, h: 70, corner: true },
    { num: 521, x: 570, y: 200, w: 90, h: 70, corner: true },
    { num: 522, x: 670, y: 200, w: 85, h: 70 },
    { num: 523, x: 765, y: 200, w: 90, h: 70, corner: true },
    // Block 3 (South-West)
    { num: 524, x: 120, y: 380, w: 110, h: 90, corner: true },
    { num: 525, x: 240, y: 380, w: 110, h: 90 },
    { num: 526, x: 360, y: 380, w: 120, h: 90, corner: true },
    // Block 4 (South-East)
    { num: 527, x: 570, y: 380, w: 110, h: 90, corner: true },
    { num: 528, x: 690, y: 380, w: 110, h: 90 },
    { num: 529, x: 810, y: 380, w: 120, h: 90, corner: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 6. Radial View (Plots 601 to 630)
// ----------------------------------------------------------------------------
export function generateRadialViewPlots(projectId: string, baseRate: number = 3900): Plot[] {
  const lots: LotBlueprint[] = [];
  // Inner Arc (8 plots)
  for (let i = 0; i < 8; i++) {
    lots.push({
      num: 601 + i,
      x: 340 + i * 75,
      y: 350 - Math.sin((i / 7) * Math.PI) * 50,
      w: 70,
      h: 80,
      corner: i === 0 || i === 7,
      park: true
    });
  }
  // Middle Arc (10 plots)
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 610 + i,
      x: 260 + i * 82,
      y: 250 - Math.sin((i / 9) * Math.PI) * 70,
      w: 75,
      h: 80,
      corner: i === 0 || i === 9
    });
  }
  // Outer Panoramic Arc (12 plots)
  for (let i = 0; i < 12; i++) {
    lots.push({
      num: 620 + i,
      x: 180 + i * 80,
      y: 150 - Math.sin((i / 11) * Math.PI) * 85,
      w: 75,
      h: 80,
      corner: i === 0 || i === 11,
      park: true
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 7. Cliff Edge (Plots 701 to 716)
// ----------------------------------------------------------------------------
export function generateCliffEdgePlots(projectId: string, baseRate: number = 4400): Plot[] {
  const lots: LotBlueprint[] = [
    { num: 701, x: 260, y: 440, w: 95, h: 80, corner: true },
    { num: 702, x: 370, y: 410, w: 90, h: 75 },
    { num: 703, x: 475, y: 380, w: 90, h: 75 },
    { num: 704, x: 580, y: 350, w: 90, h: 75 },
    { num: 705, x: 685, y: 320, w: 95, h: 75, corner: true },
    { num: 706, x: 320, y: 330, w: 90, h: 75, corner: true },
    { num: 707, x: 425, y: 300, w: 90, h: 75 },
    { num: 708, x: 530, y: 270, w: 90, h: 75, park: true },
    { num: 709, x: 635, y: 240, w: 90, h: 75 },
    { num: 710, x: 740, y: 210, w: 95, h: 75, corner: true, park: true },
    // Cliffside Edge parcels
    { num: 711, x: 480, y: 190, w: 85, h: 70, park: true },
    { num: 712, x: 580, y: 165, w: 85, h: 70, park: true },
    { num: 713, x: 680, y: 145, w: 85, h: 70, park: true },
    { num: 714, x: 780, y: 130, w: 90, h: 70, corner: true, park: true },
    { num: 715, x: 880, y: 140, w: 90, h: 75, corner: true, park: true },
    { num: 716, x: 760, y: 270, w: 95, h: 75, corner: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 8. Peninsula Tip (Plots 801 to 818)
// ----------------------------------------------------------------------------
export function generatePeninsulaTipPlots(projectId: string, baseRate: number = 4100): Plot[] {
  const lots: LotBlueprint[] = [];
  // Left arm of peninsula (9 plots)
  for (let i = 0; i < 9; i++) {
    lots.push({
      num: 801 + i,
      x: 320 + i * 50,
      y: 200 + i * 25,
      w: 65,
      h: 65,
      corner: i === 0 || i === 8,
      park: true
    });
  }
  // Right arm of peninsula (9 plots)
  for (let i = 0; i < 9; i++) {
    lots.push({
      num: 810 + i,
      x: 580 + i * 50,
      y: 220 - i * 15,
      w: 65,
      h: 65,
      corner: i === 0 || i === 8,
      park: true
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 9. Interwoven Streets (Plots 901 to 945)
// ----------------------------------------------------------------------------
export function generateInterwovenPlots(projectId: string, baseRate: number = 2950): Plot[] {
  const lots: LotBlueprint[] = [];
  // Loop 1
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 901 + i,
      x: 200 + (i % 5) * 85,
      y: 180 + Math.floor(i / 5) * 85,
      w: 80,
      h: 75,
      corner: i === 0 || i === 4
    });
  }
  // Loop 2 Central
  for (let i = 0; i < 12; i++) {
    lots.push({
      num: 911 + i,
      x: 480 + (i % 4) * 85,
      y: 160 + Math.floor(i / 4) * 80,
      w: 80,
      h: 75,
      park: true
    });
  }
  // Loop 3 East
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 923 + i,
      x: 750 + (i % 5) * 85,
      y: 180 + Math.floor(i / 5) * 85,
      w: 80,
      h: 75,
      corner: i === 4 || i === 9
    });
  }
  // South Boulevard Flank
  for (let i = 0; i < 8; i++) {
    lots.push({
      num: 935 + i,
      x: 320 + i * 85,
      y: 440,
      w: 80,
      h: 80,
      corner: i === 0 || i === 7,
      park: true
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 10. Terraced Slopes (Plots 1001 to 1035)
// ----------------------------------------------------------------------------
export function generateTerracedSlopesPlots(projectId: string, baseRate: number = 3100): Plot[] {
  const lots: LotBlueprint[] = [];
  // Tier 1 (Top)
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 1001 + i,
      x: 260 + i * 75,
      y: 180 + i * 15,
      w: 70,
      h: 70,
      corner: i === 0 || i === 9,
      park: true
    });
  }
  // Tier 2 (Middle)
  for (let i = 0; i < 12; i++) {
    lots.push({
      num: 1012 + i,
      x: 200 + i * 72,
      y: 280 + i * 14,
      w: 68,
      h: 70,
      park: i % 3 === 0
    });
  }
  // Tier 3 (Base)
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 1025 + i,
      x: 180 + i * 75,
      y: 380 + i * 14,
      w: 70,
      h: 75,
      corner: i === 0 || i === 9
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 11. Marshland Green (Plots 1101 to 1115)
// ----------------------------------------------------------------------------
export function generateMarshlandPlots(projectId: string, baseRate: number = 2400): Plot[] {
  const lots: LotBlueprint[] = [
    { num: 1101, x: 220, y: 240, w: 105, h: 85, corner: true },
    { num: 1102, x: 340, y: 200, w: 100, h: 80, park: true },
    { num: 1103, x: 460, y: 170, w: 100, h: 80, park: true },
    { num: 1104, x: 580, y: 160, w: 100, h: 80, park: true },
    { num: 1105, x: 700, y: 170, w: 100, h: 80, park: true },
    { num: 1106, x: 820, y: 200, w: 100, h: 80 },
    { num: 1107, x: 935, y: 240, w: 105, h: 85, corner: true },
    // Southern perimeter around the green buffer
    { num: 1108, x: 250, y: 390, w: 110, h: 90, corner: true },
    { num: 1109, x: 380, y: 430, w: 115, h: 90, park: true },
    { num: 1110, x: 515, y: 450, w: 120, h: 95, park: true },
    { num: 1111, x: 655, y: 440, w: 115, h: 90, park: true },
    { num: 1112, x: 790, y: 400, w: 110, h: 90, corner: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 12. Double Street Spine (Plots 1201 to 1229)
// ----------------------------------------------------------------------------
export function generateDoubleStreetPlots(projectId: string, baseRate: number = 3600): Plot[] {
  // Demo coordinates use three blocks around a double-road spine. They are
  // illustrative only; no approved parcel survey is present in this project.
  const rowY = [205, 350];
  const lots: LotBlueprint[] = [
    // West block: four plots across each of two short rows.
    ...[1201, 1202, 1203, 1221, 1222, 1223, 1224, 1225].map((num, i) => ({
      num,
      x: 55 + (i % 4) * 100,
      y: rowY[Math.floor(i / 4)],
      w: 90,
      h: 100,
      corner: i % 4 === 0 || i % 4 === 3,
      park: num === 1224
    })),
    // Center block: narrower lots kept between the two visible spines.
    ...[1226, 1227, 1228, 1229, 1230, 1231].map((num, i) => ({
      num,
      x: 535 + (i % 3) * 80,
      y: rowY[Math.floor(i / 3)],
      w: 70,
      h: 100,
      corner: i % 3 === 0 || i % 3 === 2,
      park: num === 1227 || num === 1230
    })),
    // East block: four plots across each row, ending at the site boundary.
    ...[1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239].map((num, i) => ({
      num,
      x: 840 + (i % 4) * 100,
      y: rowY[Math.floor(i / 4)],
      w: 90,
      h: 100,
      corner: i % 4 === 0 || i % 4 === 3,
      park: num === 1235 || num === 1238
    }))
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 13. Integrated Amenity (Clubhouse, Pool & Horseshoe Loop - Plots 1301 to 1330)
// ----------------------------------------------------------------------------
export function generateIntegratedAmenityPlots(projectId: string, baseRate: number = 3300): Plot[] {
  const lots: LotBlueprint[] = [
    // North Arch around the clubhouse & pool
    { num: 1301, x: 220, y: 150, w: 75, h: 70, corner: true },
    { num: 1302, x: 305, y: 140, w: 70, h: 70 },
    { num: 1303, x: 385, y: 135, w: 70, h: 70 },
    { num: 1304, x: 465, y: 130, w: 70, h: 70 },
    { num: 1305, x: 545, y: 130, w: 70, h: 70, park: true },
    { num: 1306, x: 625, y: 130, w: 70, h: 70, park: true },
    { num: 1307, x: 705, y: 130, w: 70, h: 70, park: true },
    { num: 1308, x: 785, y: 135, w: 70, h: 70 },
    { num: 1309, x: 865, y: 140, w: 70, h: 70 },
    { num: 1310, x: 945, y: 150, w: 75, h: 70, corner: true },
    // Center Inner Ring Facing Resort Pool
    { num: 1311, x: 350, y: 240, w: 75, h: 65, park: true },
    { num: 1312, x: 435, y: 240, w: 75, h: 65, park: true },
    { num: 1313, x: 755, y: 240, w: 75, h: 65, park: true },
    { num: 1314, x: 840, y: 240, w: 75, h: 65, park: true },
    // South Grand Avenue Flank
    { num: 1321, x: 180, y: 480, w: 85, h: 75, corner: true },
    { num: 1322, x: 275, y: 480, w: 75, h: 75 },
    { num: 1323, x: 360, y: 480, w: 75, h: 75 },
    { num: 1324, x: 445, y: 480, w: 75, h: 75 },
    { num: 1325, x: 530, y: 480, w: 75, h: 75, park: true },
    { num: 1326, x: 615, y: 480, w: 75, h: 75, park: true },
    { num: 1327, x: 700, y: 480, w: 75, h: 75 },
    { num: 1328, x: 785, y: 480, w: 75, h: 75 },
    { num: 1329, x: 870, y: 480, w: 75, h: 75 },
    { num: 1330, x: 955, y: 480, w: 85, h: 75, corner: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 14. Scattered Forest (Plots 1401 to 1418)
// ----------------------------------------------------------------------------
export function generateScatteredForestPlots(projectId: string, baseRate: number = 3700): Plot[] {
  const lots: LotBlueprint[] = [
    { num: 1401, x: 260, y: 460, w: 100, h: 80, corner: true },
    { num: 1402, x: 380, y: 450, w: 95, h: 80 },
    { num: 1403, x: 495, y: 440, w: 95, h: 80, park: true },
    { num: 1404, x: 610, y: 435, w: 95, h: 80, park: true },
    { num: 1405, x: 725, y: 440, w: 95, h: 80 },
    { num: 1406, x: 840, y: 455, w: 100, h: 80, corner: true },
    // Mid Forest Ring
    { num: 1407, x: 320, y: 320, w: 90, h: 75, corner: true },
    { num: 1408, x: 425, y: 310, w: 90, h: 75, park: true },
    { num: 1409, x: 530, y: 300, w: 90, h: 75, park: true },
    { num: 1410, x: 635, y: 305, w: 90, h: 75, park: true },
    { num: 1411, x: 740, y: 315, w: 90, h: 75, corner: true },
    // High Canopy Crown
    { num: 1412, x: 400, y: 190, w: 85, h: 70, park: true },
    { num: 1413, x: 495, y: 180, w: 85, h: 70, park: true },
    { num: 1414, x: 590, y: 180, w: 85, h: 70, park: true },
    { num: 1415, x: 685, y: 190, w: 85, h: 70, park: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 15. Hilly Ravine (Plots 1501 to 1530)
// ----------------------------------------------------------------------------
export function generateHillyRavinePlots(projectId: string, baseRate: number = 2100): Plot[] {
  const lots: LotBlueprint[] = [];
  // Upper Ravine hairpin curve (10 plots)
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 1501 + i,
      x: 200 + i * 80,
      y: 180 + Math.sin(i * 0.7) * 45,
      w: 75,
      h: 70,
      corner: i === 0 || i === 9,
      park: i % 2 === 0
    });
  }
  // Mid Ravine switchback (10 plots)
  for (let i = 0; i < 10; i++) {
    lots.push({
      num: 1511 + i,
      x: 220 + i * 78,
      y: 310 - Math.sin(i * 0.7) * 45,
      w: 75,
      h: 70,
      corner: i === 0 || i === 9
    });
  }
  // Lower Valley outlet (8 plots)
  for (let i = 0; i < 8; i++) {
    lots.push({
      num: 1521 + i,
      x: 300 + i * 85,
      y: 450 + Math.sin(i * 0.5) * 35,
      w: 80,
      h: 75,
      corner: i === 0 || i === 7,
      park: true
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 16. Urban Fringe (Plots 1601 to 1640)
// ----------------------------------------------------------------------------
export function generateUrbanFringePlots(projectId: string, baseRate: number = 4100): Plot[] {
  const lots: LotBlueprint[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      const num = 1601 + r * 10 + c;
      lots.push({
        num,
        x: 180 + c * 105,
        y: 160 + r * 95,
        w: 95,
        h: 80,
        corner: c === 0 || c === 7 || r === 0 || r === 3,
        park: (r === 1 || r === 2) && (c === 3 || c === 4)
      });
    }
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 17. Coastal Dunes (Plots 1701 to 1730)
// ----------------------------------------------------------------------------
export function generateCoastalDunesPlots(projectId: string, baseRate: number = 2900): Plot[] {
  const lots: LotBlueprint[] = [];
  for (let i = 0; i < 18; i++) {
    lots.push({
      num: 1701 + i,
      x: 220 + (i % 6) * 125,
      y: 180 + Math.floor(i / 6) * 120 + ((i % 6) % 2 === 0 ? 15 : -15),
      w: 110,
      h: 95,
      corner: i === 0 || i === 5 || i === 12 || i === 17,
      park: true
    });
  }
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}

// ----------------------------------------------------------------------------
// 18. Steep Point (Plots 1801 to 1820)
// ----------------------------------------------------------------------------
export function generateSteepPointPlots(projectId: string, baseRate: number = 3200): Plot[] {
  const lots: LotBlueprint[] = [
    // Ocean headland point
    { num: 1801, x: 780, y: 140, w: 90, h: 75, corner: true, park: true },
    { num: 1802, x: 700, y: 190, w: 85, h: 75, park: true },
    { num: 1803, x: 620, y: 240, w: 85, h: 75 },
    { num: 1804, x: 540, y: 290, w: 85, h: 75 },
    { num: 1805, x: 460, y: 340, w: 85, h: 75 },
    { num: 1806, x: 380, y: 390, w: 85, h: 75 },
    { num: 1807, x: 300, y: 440, w: 90, h: 75, corner: true },
    // South Clifftop Row
    { num: 1811, x: 840, y: 230, w: 90, h: 75, corner: true, park: true },
    { num: 1812, x: 760, y: 280, w: 85, h: 75, park: true },
    { num: 1813, x: 680, y: 330, w: 85, h: 75 },
    { num: 1814, x: 600, y: 380, w: 85, h: 75 },
    { num: 1815, x: 520, y: 430, w: 85, h: 75 },
    { num: 1816, x: 440, y: 480, w: 85, h: 75 },
    { num: 1817, x: 360, y: 530, w: 90, h: 75, corner: true }
  ];
  return buildPlotsFromBlueprints(projectId, baseRate, lots);
}
