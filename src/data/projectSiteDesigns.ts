import { LayoutConfig, Plot, Project } from '../types';

type Palette = NonNullable<LayoutConfig['palette']>;
type Band = { x: number; y: number; width: number; height: number; share: number; lean?: number };
type Design = {
  bands: Band[];
  roads: LayoutConfig['roads'];
  greenSpaces: LayoutConfig['greenSpaces'];
  gate: string;
};

const makePalette = (
  groundStart: string, groundMid: string, groundEnd: string,
  lotStart: string, lotMid: string, lotEnd: string,
  park: string, water: string, accent: string
): Palette => ({
  groundStart, groundMid, groundEnd, lotStart, lotMid, lotEnd,
  road: '#30383a', roadEdge: '#b8b9ad', centerline: '#d8d4c5',
  park, parkBorder: '#c7ceb0', water, boundary: '#eee7d1', accent,
  grass: '#d7dcc0'
});

const road = (
  id: string, name: string, x: number, y: number, width: number, height: number,
  isVertical = false
): LayoutConfig['roads'][number] => ({ id, name, label: name, x, y, width, height, isVertical });

const green = (
  id: string, name: string, x: number, y: number, width: number, height: number,
  kind: 'park' | 'water' | 'plaza' = 'park'
): LayoutConfig['greenSpaces'][number] => ({ id, name, label: name, x, y, width, height, kind });

const commonPalette = makePalette('#536747', '#3b5138', '#263d30', '#168f47', '#117d3d', '#0d6d36', '#456b43', '#56777c', '#d0ae67');

const designs: Record<string, Design> = {
  'proj-chennai-coastal-palms': {
    bands: [
      { x: 110, y: 105, width: 980, height: 100, share: 0.22, lean: 4 },
      { x: 95, y: 250, width: 330, height: 112, share: 0.13, lean: -5 },
      { x: 775, y: 250, width: 330, height: 112, share: 0.13, lean: 5 },
      { x: 120, y: 466, width: 390, height: 112, share: 0.16, lean: 4 },
      { x: 690, y: 466, width: 390, height: 112, share: 0.16, lean: -4 },
      { x: 160, y: 620, width: 880, height: 82, share: 0.2, lean: -3 }
    ],
    roads: [road('cp-bay', '40FT BAYVIEW BOULEVARD', 80, 210, 1040, 42), road('cp-north', '30FT MARINA WALK', 80, 385, 1040, 42), road('cp-south', '30FT PALM COVE ROAD', 120, 590, 960, 38)],
    greenSpaces: [green('cp-lagoon', 'LAGOON GARDEN', 445, 262, 310, 104, 'water'), green('cp-park', 'PALM COURT', 520, 440, 160, 118)],
    gate: 'BAYVIEW ENTRY'
  },
  'proj-chennai-cyber-crest': {
    bands: [
      { x: 95, y: 105, width: 245, height: 100, share: 0.07 }, { x: 405, y: 105, width: 360, height: 100, share: 0.11 }, { x: 830, y: 105, width: 275, height: 100, share: 0.08 },
      { x: 95, y: 248, width: 245, height: 96, share: 0.07 }, { x: 405, y: 248, width: 360, height: 96, share: 0.11 }, { x: 830, y: 248, width: 275, height: 96, share: 0.08 },
      { x: 95, y: 455, width: 245, height: 96, share: 0.07 }, { x: 405, y: 455, width: 360, height: 96, share: 0.11 }, { x: 830, y: 455, width: 275, height: 96, share: 0.08 },
      { x: 95, y: 595, width: 245, height: 96, share: 0.07 }, { x: 405, y: 595, width: 360, height: 96, share: 0.11 }, { x: 830, y: 595, width: 275, height: 96, share: 0.08 }
    ],
    roads: [road('cc-north', '30FT TECH PARK ROAD', 80, 210, 1040, 34), road('cc-main', '40FT TECH DRIVE', 80, 360, 1040, 70), road('cc-south', '30FT INNOVATION STREET', 80, 560, 1040, 34), road('cc-cross-1', 'CIRCUIT ONE', 360, 115, 38, 575, true), road('cc-cross-2', 'CIRCUIT TWO', 800, 115, 38, 575, true)],
    greenSpaces: [], gate: 'TECH PARK GATE'
  },
  'proj-chennai-royal-orchards': {
    bands: [
      { x: 120, y: 105, width: 960, height: 105, share: 0.24, lean: 2 },
      { x: 95, y: 250, width: 330, height: 105, share: 0.13 },
      { x: 775, y: 250, width: 330, height: 105, share: 0.13 },
      { x: 95, y: 465, width: 330, height: 105, share: 0.13 },
      { x: 775, y: 465, width: 330, height: 105, share: 0.13 },
      { x: 145, y: 612, width: 910, height: 82, share: 0.24, lean: -2 }
    ],
    roads: [road('ro-north', 'ORCHARD WALK', 80, 215, 1040, 34), road('ro-main-west', '40FT ROYAL AVENUE', 80, 365, 350, 66), road('ro-main-east', '40FT ROYAL AVENUE', 770, 365, 350, 66), road('ro-south', 'MANGO GROVE ROAD', 100, 580, 1000, 34), road('ro-west', 'ORCHARD LANE', 430, 220, 42, 390, true), road('ro-east', 'ORCHARD LANE', 728, 220, 42, 390, true)],
    greenSpaces: [green('ro-orchard', 'CENTRAL ORCHARD', 475, 265, 250, 285)], gate: 'ROYAL ORCHARD GATE'
  },
  'proj-bengaluru-silicon-meadows': {
    bands: [
      { x: 95, y: 108, width: 410, height: 105, share: 0.17 }, { x: 695, y: 108, width: 410, height: 105, share: 0.17 },
      { x: 95, y: 255, width: 410, height: 88, share: 0.16 }, { x: 695, y: 255, width: 410, height: 88, share: 0.16 },
      { x: 95, y: 465, width: 410, height: 88, share: 0.16 }, { x: 695, y: 465, width: 410, height: 88, share: 0.16 }
    ],
    roads: [road('sm-north', '30FT SILICON GROVE', 80, 220, 1040, 30), road('sm-main', '40FT SILICON WAY', 80, 360, 1040, 70), road('sm-south', '30FT NANDI VISTA', 80, 565, 1040, 32), road('sm-spine', 'INNOVATION AVENUE', 555, 105, 48, 590, true)],
    greenSpaces: [green('sm-meadow', 'NANDI VIEW GREEN', 510, 280, 180, 65)], gate: 'SILICON GATE'
  },
  'proj-bengaluru-green-valley': {
    bands: [
      { x: 130, y: 105, width: 930, height: 100, share: 0.27, lean: -8 },
      { x: 90, y: 260, width: 1010, height: 95, share: 0.29, lean: 9 },
      { x: 145, y: 468, width: 930, height: 100, share: 0.26, lean: -8 },
      { x: 205, y: 615, width: 810, height: 82, share: 0.18, lean: 5 }
    ],
    roads: [road('gv-upper', 'RIDGEVIEW DRIVE', 80, 215, 1040, 38), road('gv-main', '40FT VALLEY ROAD', 80, 370, 1040, 64), road('gv-lower', 'GREEN VALLEY WAY', 100, 575, 1000, 38)],
    greenSpaces: [], gate: 'VALLEY ARCH'
  },
  'proj-hyderabad-greenfield-serenade': {
    bands: [
      { x: 115, y: 105, width: 970, height: 98, share: 0.24 },
      { x: 95, y: 255, width: 320, height: 110, share: 0.14 }, { x: 785, y: 255, width: 320, height: 110, share: 0.14 },
      { x: 95, y: 470, width: 320, height: 105, share: 0.14 }, { x: 785, y: 470, width: 320, height: 105, share: 0.14 },
      { x: 145, y: 620, width: 910, height: 78, share: 0.2 }
    ],
    roads: [road('gs-north', 'SERENADE CRESCENT', 80, 210, 1040, 40), road('gs-main-west', '40FT SERENADE DRIVE', 80, 380, 340, 64), road('gs-main-east', '40FT SERENADE DRIVE', 780, 380, 340, 64), road('gs-south', 'GARDEN LOOP', 100, 580, 1000, 38), road('gs-west', 'WEST GARDEN WAY', 420, 220, 42, 370, true), road('gs-east', 'EAST GARDEN WAY', 738, 220, 42, 370, true)],
    greenSpaces: [green('gs-court', 'SERENADE BOTANICAL COURT', 460, 265, 280, 280)], gate: 'SERENADE GATE'
  },
  'proj-hyderabad-aero-city': {
    bands: [
      { x: 95, y: 105, width: 450, height: 100, share: 0.2 }, { x: 655, y: 105, width: 450, height: 100, share: 0.2 },
      { x: 95, y: 255, width: 450, height: 90, share: 0.18 }, { x: 655, y: 255, width: 450, height: 90, share: 0.18 },
      { x: 95, y: 470, width: 450, height: 90, share: 0.12 }, { x: 655, y: 470, width: 450, height: 90, share: 0.12 }
    ],
    roads: [road('ac-upper', '30FT AEROTROPOLIS ROAD', 80, 215, 1040, 32), road('ac-main', '40FT AIRPORT WAY', 80, 360, 1040, 70), road('ac-lower', '30FT RUNWAY BOULEVARD', 80, 570, 1040, 34), road('ac-spine', 'AERO SPINE', 575, 105, 48, 600, true)],
    greenSpaces: [], gate: 'AERO GATE'
  },
  'proj-hyderabad-cyber-hills': {
    bands: [
      { x: 220, y: 102, width: 760, height: 95, share: 0.2, lean: 8 },
      { x: 105, y: 240, width: 990, height: 100, share: 0.3, lean: -8 },
      { x: 195, y: 462, width: 810, height: 100, share: 0.28, lean: 9 },
      { x: 145, y: 605, width: 910, height: 92, share: 0.22, lean: -6 }
    ],
    roads: [road('ch-upper', 'UPPER RIDGE ROAD', 130, 207, 940, 34), road('ch-main', '40FT CYBER BLVD', 80, 360, 1040, 68), road('ch-lower', 'LOWER RIDGE ROAD', 100, 568, 1000, 34)],
    greenSpaces: [], gate: 'CYBER HILLS ARCH'
  },
  'proj-coimbatore-whispering-palms': {
    bands: [
      { x: 130, y: 105, width: 940, height: 100, share: 0.23, lean: 3 },
      { x: 95, y: 250, width: 330, height: 105, share: 0.14 }, { x: 775, y: 250, width: 330, height: 105, share: 0.14 },
      { x: 95, y: 465, width: 330, height: 105, share: 0.14 }, { x: 775, y: 465, width: 330, height: 105, share: 0.14 },
      { x: 160, y: 620, width: 880, height: 82, share: 0.21, lean: -3 }
    ],
    roads: [road('wp-north', 'PALM GROVE WALK', 80, 215, 1040, 34), road('wp-main-west', '40FT PALM BOULEVARD', 80, 365, 350, 66), road('wp-main-east', '40FT PALM BOULEVARD', 770, 365, 350, 66), road('wp-south', 'SOUTH PALM WALK', 110, 580, 980, 34), road('wp-west', 'GROVE LANE', 430, 220, 42, 390, true), road('wp-east', 'GROVE LANE', 728, 220, 42, 390, true)],
    greenSpaces: [green('wp-garden', 'WHISPERING PALM GARDEN', 475, 263, 250, 285)], gate: 'PALM GATE'
  },
  'proj-coimbatore-kovaipudur-breeze': {
    bands: [
      { x: 215, y: 105, width: 820, height: 95, share: 0.28, lean: 10 },
      { x: 100, y: 260, width: 850, height: 92, share: 0.28, lean: -11 },
      { x: 260, y: 465, width: 820, height: 94, share: 0.27, lean: 9 },
      { x: 120, y: 610, width: 780, height: 82, share: 0.17, lean: -8 }
    ],
    roads: [road('kb-upper', 'UPPER BREEZE TERRACE', 100, 215, 1000, 36), road('kb-main', '33FT BREEZE WAY', 80, 365, 1040, 64), road('kb-lower', 'LOWER BREEZE TERRACE', 100, 570, 1000, 36)],
    greenSpaces: [], gate: 'BREEZE GATE'
  },
  'proj-madurai-meenakshi-pride': {
    bands: [
      { x: 105, y: 105, width: 405, height: 105, share: 0.2, lean: 3 }, { x: 690, y: 105, width: 405, height: 105, share: 0.2, lean: -3 },
      { x: 95, y: 250, width: 325, height: 105, share: 0.15 }, { x: 780, y: 250, width: 325, height: 105, share: 0.15 },
      { x: 95, y: 465, width: 325, height: 105, share: 0.15 }, { x: 780, y: 465, width: 325, height: 105, share: 0.15 }
    ],
    roads: [road('mp-north', 'TEMPLE GARDEN ROAD', 80, 215, 1040, 34), road('mp-main-west', '30FT PRIDE WAY', 80, 365, 340, 64), road('mp-main-east', '30FT PRIDE WAY', 780, 365, 340, 64), road('mp-south', 'SOUTH SANCTUM ROAD', 80, 580, 1040, 34), road('mp-west-spoke', 'WEST SPOKE', 420, 215, 42, 390, true), road('mp-east-spoke', 'EAST SPOKE', 738, 215, 42, 390, true)],
    greenSpaces: [green('mp-plaza', 'MEENAKSHI CENTRAL PLAZA', 455, 260, 290, 290, 'plaza')], gate: 'PRIDE GATE'
  },
  'proj-trichy-cauvery-grand': {
    bands: [
      { x: 105, y: 105, width: 780, height: 90, share: 0.22, lean: -5 },
      { x: 370, y: 235, width: 550, height: 95, share: 0.25, lean: 5 },
      { x: 105, y: 455, width: 735, height: 95, share: 0.25, lean: -5 },
      { x: 330, y: 600, width: 770, height: 88, share: 0.28, lean: 5 }
    ],
    roads: [road('cg-north', 'RIVERBANK WALK', 80, 205, 850, 34), road('cg-main', '33FT CAUVERY WAY', 80, 365, 1040, 64), road('cg-south', 'SOUTH EMBANKMENT ROAD', 270, 560, 830, 34)],
    greenSpaces: [green('cg-river', 'CAUVERY GREEN EDGE', 965, 95, 145, 238, 'water'), green('cg-park', 'RIVERFRONT PARK', 120, 590, 170, 90)], gate: 'RIVER GATE'
  },
  'proj-salem-yercaud-foothills': {
    bands: [
      { x: 260, y: 105, width: 680, height: 92, share: 0.2, lean: 7 },
      { x: 150, y: 245, width: 900, height: 94, share: 0.27, lean: -7 },
      { x: 95, y: 455, width: 1010, height: 94, share: 0.31, lean: 8 },
      { x: 185, y: 600, width: 830, height: 90, share: 0.22, lean: -6 }
    ],
    roads: [road('yf-upper', 'UPPER FOOTHILLS ROAD', 160, 205, 880, 34), road('yf-main', '30FT FOOTHILLS ROAD', 80, 365, 1040, 64), road('yf-lower', 'LOWER HILL VIEW', 100, 560, 1000, 34)],
    greenSpaces: [], gate: 'FOOTHILLS ENTRY'
  },
  'proj-mysuru-chamundi-crest': {
    bands: [
      { x: 390, y: 105, width: 420, height: 88, share: 0.18, lean: 2 },
      { x: 255, y: 230, width: 690, height: 92, share: 0.25, lean: 5 },
      { x: 130, y: 440, width: 940, height: 96, share: 0.32, lean: -5 },
      { x: 90, y: 585, width: 1020, height: 90, share: 0.25, lean: -2 }
    ],
    roads: [road('mc-upper', 'CHAMUNDI VIEW DRIVE', 240, 200, 720, 34), road('mc-main', '40FT HERITAGE WAY', 80, 350, 1040, 66), road('mc-lower', 'TEMPLE HILL BOULEVARD', 80, 550, 1040, 34)],
    greenSpaces: [], gate: 'SUMMIT GATE'
  },
  'proj-mysuru-heritage-woods': {
    bands: [
      { x: 100, y: 105, width: 400, height: 100, share: 0.19 }, { x: 700, y: 105, width: 400, height: 100, share: 0.19 },
      { x: 110, y: 260, width: 330, height: 98, share: 0.14 }, { x: 760, y: 260, width: 330, height: 98, share: 0.14 },
      { x: 110, y: 465, width: 330, height: 98, share: 0.14 }, { x: 760, y: 465, width: 330, height: 98, share: 0.14 },
      { x: 180, y: 610, width: 840, height: 82, share: 0.16 }
    ],
    roads: [road('hw-north', 'WOODLAND WALK', 80, 215, 1040, 34), road('hw-main', '33FT WOODS BOULEVARD', 80, 365, 1040, 64), road('hw-south', 'HERITAGE TRAIL ROAD', 100, 575, 1000, 34), road('hw-west', 'EAST GROVE WAY', 445, 220, 42, 390, true), road('hw-east', 'LAKE GROVE WAY', 713, 220, 42, 390, true)],
    greenSpaces: [green('hw-grove-1', 'OAK GROVE', 505, 258, 190, 92), green('hw-grove-2', 'HERITAGE GARDEN', 505, 465, 190, 88)], gate: 'HERITAGE GATE'
  }
};

export function applyProjectSiteDesigns(projects: Project[]): void {
  projects.forEach((project) => {
    // Keep one consistent presentation palette across the catalogue; only the
    // road network, open spaces and parcel geometry change per project.
    project.layoutConfig.palette = commonPalette;
    if (project.id === 'proj-chennai-park-avenue') {
      return;
    }
    if (project.id === 'proj-bengaluru-emerald-enclave') {
      return;
    }
    if (project.id === 'proj-mysuru-heritage-woods' || project.layoutConfig.imageryStatus === 'verified') {
      return;
    }
    const design = designs[project.id];
    if (!design) return;
    project.layoutConfig = {
      ...project.layoutConfig,
      roads: design.roads,
      greenSpaces: design.greenSpaces,
      gate: { ...project.layoutConfig.gate, label: design.gate },
      themeTitle: project.name,
      isRealisticMasterplan: true
    };
  });
}

function polygonPoints(x: number, y: number, width: number, height: number): string {
  return `${x},${y} ${x + width},${y} ${x + width},${y + height} ${x},${y + height}`;
}

export function generateProjectPlots(projectId: string, count: number, baseRate: number): Plot[] {
  const design = designs[projectId];
  if (!design) return [];
  const totalShare = design.bands.reduce((sum, band) => sum + band.share, 0);
  const bandCounts = design.bands.map((band) => Math.floor((band.share / totalShare) * count));
  bandCounts[bandCounts.length - 1] += count - bandCounts.reduce((sum, value) => sum + value, 0);

  const plots: Plot[] = [];
  let plotIndex = 0;
  design.bands.forEach((band, bandIndex) => {
    const items = bandCounts[bandIndex];
    const gap = items > 8 ? 5 : 7;
    const width = Math.max(38, (band.width - gap * Math.max(0, items - 1)) / items);
    for (let localIndex = 0; localIndex < items; localIndex++) {
      plotIndex += 1;
      const x = band.x + localIndex * (width + gap);
      const y = band.y + (band.lean || 0) * (localIndex / Math.max(1, items - 1) - 0.5);
      const height = band.height * (0.94 + (plotIndex % 3) * 0.03);
      const isCorner = localIndex === 0 || localIndex === items - 1;
      const area = isCorner ? 2400 : (plotIndex % 3 === 0 ? 1800 : 1200);
      const dimensions = isCorner ? "40' x 60'" : (plotIndex % 3 === 0 ? "30' x 50'" : "30' x 40'");
      const price = area * baseRate;
      let status: Plot['status'] = 'AVAILABLE';
      if (plotIndex % 5 === 0) status = 'RESERVED';
      if (plotIndex % 7 === 0) status = 'SOLD';
      const facingOptions: Plot['facing'][] = ['North', 'South', 'East', 'West', 'North-East', 'South-West'];
      const facing = facingOptions[(plotIndex + bandIndex) % facingOptions.length];

      plots.push({
        id: `plot-${projectId}-${plotIndex}`,
        projectId,
        plotNumber: `P-${plotIndex.toString().padStart(2, '0')}`,
        dimensions,
        areaSqFt: area,
        facing,
        price,
        pricePerSqFt: baseRate,
        status,
        cornerPlot: isCorner,
        parkFacing: isCorner || (plotIndex + bandIndex) % 4 === 0,
        roadWidthFt: bandIndex % 2 === 0 ? 40 : 30,
        phase: `${projectId.split('-').slice(-1)[0]} · ${bandIndex + 1}`,
        geometry: {
          x, y, width, height,
          points: polygonPoints(x, y, width, height)
        },
        notes: isCorner ? 'Corner parcel with two-side road access' : 'Illustrative plot placement within this development layout'
      });
    }
  });
  return plots;
}
