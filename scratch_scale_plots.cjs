const fs = require('fs');

// Plot definitions with exact centers on 1024x576 image
// Status:
// - Green turf = AVAILABLE
// - Peach/tan = RESERVED (Phase 2 launch)
// - Built villas = SOLD
const rawPlots = [
  // Waterfront & Riverside (Top Left / North)
  { num: '94', x: 198, y: 310, w: 46, h: 42, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'North-West', corner: true, park: true, notes: 'Panoramic Estuary & Ocean Sunset View' },
  { num: '93', x: 218, y: 256, w: 44, h: 40, status: 'AVAILABLE', area: 2200, dim: "40' × 55'", facing: 'North-West', corner: false, park: true, notes: 'Estuary Facing Premium Residential Plot' },
  { num: '92', x: 254, y: 214, w: 44, h: 40, status: 'AVAILABLE', area: 2100, dim: "35' × 60'", facing: 'North', corner: false, park: true, notes: 'Riverside Walk Frontage Plot' },
  { num: '91', x: 290, y: 184, w: 42, h: 38, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: true, notes: 'Delivered Custom Contemporary Villa' },
  { num: '90', x: 350, y: 178, w: 48, h: 40, status: 'SOLD', area: 2600, dim: "40' × 65'", facing: 'North', corner: false, park: true, notes: 'Delivered Luxury Hillside Villa' },
  { num: '89', x: 412, y: 165, w: 40, h: 38, status: 'AVAILABLE', area: 2000, dim: "35' × 57'", facing: 'North', corner: false, park: true, notes: 'Direct Riverside Place Access' },
  { num: '88', x: 450, y: 165, w: 38, h: 38, status: 'AVAILABLE', area: 1800, dim: "30' × 60'", facing: 'North', corner: false, park: true, notes: 'Riverside Place Residential Plot' },
  { num: '87', x: 485, y: 156, w: 38, h: 38, status: 'AVAILABLE', area: 1800, dim: "30' × 60'", facing: 'North', corner: false, park: true, notes: 'Riverside Ridge View Plot' },
  { num: '86', x: 535, y: 168, w: 42, h: 40, status: 'AVAILABLE', area: 2200, dim: "35' × 63'", facing: 'North-East', corner: true, park: true, notes: 'Hilltop Forest Buffer Corner Plot' },

  // Terrace View Crescent Upper
  { num: '80', x: 340, y: 256, w: 42, h: 42, status: 'RESERVED', area: 2400, dim: "40' × 60'", facing: 'South', corner: true, park: false, notes: 'Terrace View Crescent Corner Plot' },
  { num: '81', x: 368, y: 246, w: 38, h: 40, status: 'SOLD', area: 2000, dim: "35' × 57'", facing: 'South', corner: false, park: false, notes: 'Completed Villa with Landscaped Courtyard' },
  { num: '82', x: 400, y: 240, w: 38, h: 40, status: 'RESERVED', area: 2000, dim: "35' × 57'", facing: 'South', corner: false, park: false, notes: 'Terrace View Crescent Premium Plot' },
  { num: '83', x: 430, y: 236, w: 38, h: 40, status: 'SOLD', area: 2000, dim: "35' × 57'", facing: 'South', corner: false, park: false, notes: 'Completed Mediterranean Villa' },
  { num: '84', x: 456, y: 228, w: 38, h: 40, status: 'RESERVED', area: 2000, dim: "35' × 57'", facing: 'South', corner: false, park: false, notes: 'Terrace View Crescent Plot' },
  { num: '85', x: 486, y: 222, w: 42, h: 40, status: 'RESERVED', area: 2200, dim: "38' × 58'", facing: 'South-East', corner: true, park: false, notes: 'Terrace View Ridge Corner Plot' },

  // Terrace View West Loop (Luxury Villas on hillside)
  { num: '79', x: 275, y: 480, w: 44, h: 44, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'East', corner: false, park: true, notes: 'Terrace View Hillside Villa' },
  { num: '78', x: 235, y: 556, w: 44, h: 44, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'East', corner: false, park: true, notes: 'Terrace View Hillside Villa with Pool' },
  { num: '77', x: 204, y: 622, w: 44, h: 44, status: 'SOLD', area: 2500, dim: "42' × 60'", facing: 'East', corner: false, park: true, notes: 'Terrace View Hillside Luxury Villa' },
  { num: '76', x: 200, y: 706, w: 46, h: 46, status: 'SOLD', area: 2600, dim: "44' × 60'", facing: 'East', corner: true, park: true, notes: 'South-West Ridge Edge Villa' },

  // Hillside View Drive & Terrace View Inner
  { num: '2', x: 380, y: 395, w: 42, h: 45, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'North-East', corner: true, park: false, notes: 'Hillside View Drive Corner Plot' },
  { num: '3', x: 352, y: 472, w: 42, h: 44, status: 'AVAILABLE', area: 2100, dim: "35' × 60'", facing: 'East', corner: false, park: false, notes: 'Hillside View Avenue Residential Plot' },
  { num: '4', x: 324, y: 554, w: 42, h: 44, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'East', corner: false, park: false, notes: 'Modern Terraced Luxury Villa' },
  { num: '5', x: 298, y: 642, w: 44, h: 44, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'East', corner: false, park: false, notes: 'Terrace View Crescent Plot' },
  { num: '6', x: 340, y: 708, w: 48, h: 46, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'North-East', corner: false, park: false, notes: 'Estuary View Avenue Plot' },
  { num: '7', x: 378, y: 766, w: 52, h: 48, status: 'AVAILABLE', area: 2600, dim: "45' × 58'", facing: 'North-East', corner: false, park: false, notes: 'Wide Frontage Residential Plot' },
  { num: '75', x: 356, y: 900, w: 56, h: 50, status: 'AVAILABLE', area: 3000, dim: "50' × 60'", facing: 'East', corner: true, park: true, notes: 'South-West Estuary View Grand Estate Plot' },
  { num: '9', x: 424, y: 835, w: 50, h: 48, status: 'AVAILABLE', area: 2500, dim: "42' × 60'", facing: 'North', corner: false, park: false, notes: 'Estuary View Avenue Plot' },
  { num: '10', x: 474, y: 888, w: 50, h: 48, status: 'AVAILABLE', area: 2500, dim: "42' × 60'", facing: 'North', corner: false, park: false, notes: 'Estuary View Avenue Plot' },

  // Central Core (Terrace View Mid)
  { num: '59', x: 450, y: 334, w: 42, h: 40, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Completed Villa with Swimming Pool' },
  { num: '60', x: 506, y: 322, w: 42, h: 40, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Completed Luxury Villa with Pool' },
  { num: '53', x: 560, y: 312, w: 38, h: 38, status: 'AVAILABLE', area: 1800, dim: "30' × 60'", facing: 'South', corner: false, park: false, notes: 'Central Boulevard View Plot' },
  { num: '52', x: 604, y: 310, w: 38, h: 38, status: 'AVAILABLE', area: 1800, dim: "30' × 60'", facing: 'South', corner: false, park: false, notes: 'Dune View Drive Access Plot' },
  { num: '50', x: 650, y: 312, w: 38, h: 38, status: 'SOLD', area: 1900, dim: "32' × 60'", facing: 'South', corner: false, park: false, notes: 'Completed Dune View Cottage' },
  { num: '49', x: 688, y: 312, w: 38, h: 38, status: 'AVAILABLE', area: 1800, dim: "30' × 60'", facing: 'South', corner: false, park: false, notes: 'Dune View Drive Residential Plot' },
  { num: '48', x: 728, y: 312, w: 38, h: 38, status: 'AVAILABLE', area: 1800, dim: "30' × 60'", facing: 'South', corner: false, park: false, notes: 'Dune View Drive Residential Plot' },

  // Valley View Center Core (Peach reserved zone)
  { num: '58', x: 472, y: 396, w: 42, h: 40, status: 'RESERVED', area: 2100, dim: "35' × 60'", facing: 'South-East', corner: false, park: false, notes: 'Central Valley View Reserved Plot' },
  { num: '54', x: 540, y: 372, w: 42, h: 40, status: 'RESERVED', area: 2200, dim: "38' × 58'", facing: 'South-East', corner: false, park: false, notes: 'Valley View Crescent Plot' },
  { num: '57', x: 512, y: 448, w: 42, h: 40, status: 'RESERVED', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Valley View Premium Residential Plot' },
  { num: '55', x: 586, y: 424, w: 42, h: 40, status: 'RESERVED', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Valley View Ridge Plot' },
  { num: '56', x: 566, y: 498, w: 44, h: 42, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'South', corner: false, park: false, notes: 'Central Roundabout Frontage Plot' },

  // Valley View South-West Section
  { num: '61', x: 426, y: 480, w: 42, h: 40, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'South-East', corner: false, park: false, notes: 'Completed Villa on Valley View Drive' },
  { num: '62', x: 468, y: 538, w: 44, h: 42, status: 'RESERVED', area: 2400, dim: "40' × 60'", facing: 'South-East', corner: false, park: false, notes: 'Prime Valley View Drive Frontage Plot' },
  { num: '63', x: 510, y: 598, w: 44, h: 42, status: 'RESERVED', area: 2400, dim: "40' × 60'", facing: 'South-East', corner: false, park: false, notes: 'Valley View Boulevard Reserved Plot' },
  { num: '64', x: 562, y: 636, w: 46, h: 44, status: 'RESERVED', area: 2500, dim: "42' × 60'", facing: 'South-East', corner: true, park: false, notes: 'Roundabout Island Facing Corner Plot' },
  { num: '68', x: 398, y: 574, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'South-East', corner: false, park: false, notes: 'Hillside View Avenue Plot' },
  { num: '67', x: 444, y: 648, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'South-East', corner: false, park: false, notes: 'Spacious Residential Plot' },
  { num: '66', x: 494, y: 720, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'South', corner: false, park: false, notes: 'Hillside View Drive Access Plot' },

  // South Hillside Boulevard (Facing Entrance Road)
  { num: '65', x: 554, y: 730, w: 46, h: 44, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Completed Villa with Driveway' },
  { num: '21', x: 645, y: 724, w: 44, h: 42, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Hillside View Estate Villa' },
  { num: '20', x: 705, y: 732, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Hillside View Drive Frontage Plot' },
  { num: '19', x: 765, y: 728, w: 44, h: 42, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Completed Villa with Garden Deck' },
  { num: '18', x: 818, y: 724, w: 44, h: 42, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Completed Luxury Villa' },
  { num: '11', x: 540, y: 894, w: 46, h: 46, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Completed Villa with Front Lawn' },
  { num: '12', x: 602, y: 890, w: 44, h: 46, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Completed Villa with Carport' },
  { num: '13', x: 668, y: 890, w: 48, h: 46, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Completed Two-Story Villa' },
  { num: '14', x: 738, y: 888, w: 46, h: 46, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Completed Villa with Courtyard' },
  { num: '15', x: 792, y: 890, w: 44, h: 46, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'South Boundary Wide Plot' },
  { num: '16', x: 864, y: 892, w: 44, h: 46, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: true, park: false, notes: 'Main Entrance Boulevard Frontage Plot' },
  { num: '17', x: 870, y: 780, w: 46, h: 46, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'West', corner: true, park: false, notes: 'Sea View Avenue Corner Plot' },

  // East Block (Dune View & Valley View East)
  { num: '44', x: 658, y: 418, w: 44, h: 42, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Completed Dune View Villa' },
  { num: '45', x: 712, y: 418, w: 44, h: 42, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Completed Villa on Dune View Drive' },
  { num: '46', x: 772, y: 418, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'South', corner: false, park: false, notes: 'Dune View Drive Residential Plot' },
  { num: '47', x: 780, y: 340, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'South-East', corner: false, park: false, notes: 'Dune View Drive Residential Plot' },
  { num: '37', x: 825, y: 344, w: 42, h: 40, status: 'SOLD', area: 2000, dim: "35' × 57'", facing: 'South-East', corner: false, park: false, notes: 'Completed Modern Villa' },
  { num: '38', x: 826, y: 424, w: 44, h: 42, status: 'SOLD', area: 2200, dim: "38' × 58'", facing: 'South-East', corner: false, park: false, notes: 'Completed Villa with Landscaped Garden' },
  { num: '35', x: 885, y: 355, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'South-East', corner: true, park: true, notes: 'North-East Perimeter Forest Corner Plot' },
  { num: '34', x: 928, y: 395, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'West', corner: false, park: false, notes: 'Sea View Avenue Outer Plot' },
  { num: '33', x: 928, y: 450, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'West', corner: false, park: false, notes: 'Sea View Avenue Residential Plot' },
  { num: '32', x: 928, y: 504, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'West', corner: false, park: false, notes: 'Sea View Avenue Residential Plot' },
  { num: '31', x: 928, y: 566, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'West', corner: false, park: false, notes: 'Sea View Avenue Residential Plot' },
  { num: '29', x: 932, y: 630, w: 48, h: 44, status: 'SOLD', area: 2600, dim: "44' × 60'", facing: 'West', corner: false, park: false, notes: 'Completed Villa with Infinity Pool' },
  { num: '28', x: 946, y: 715, w: 50, h: 48, status: 'AVAILABLE', area: 2800, dim: "48' × 60'", facing: 'West', corner: true, park: false, notes: 'Corner Villa Plot near Main Entrance' },

  // Valley View East Lower
  { num: '43', x: 658, y: 494, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Valley View Drive Frontage Plot' },
  { num: '42', x: 715, y: 498, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Valley View Drive Residential Plot' },
  { num: '41', x: 768, y: 502, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Valley View Drive Residential Plot' },
  { num: '39', x: 828, y: 508, w: 46, h: 44, status: 'AVAILABLE', area: 2400, dim: "40' × 60'", facing: 'North', corner: false, park: false, notes: 'Valley View Avenue Plot' },
  { num: '22', x: 645, y: 636, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Valley View Drive Residential Plot' },
  { num: '23', x: 710, y: 638, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Valley View Drive Residential Plot' },
  { num: '24', x: 770, y: 638, w: 44, h: 42, status: 'AVAILABLE', area: 2200, dim: "38' × 58'", facing: 'North', corner: false, park: false, notes: 'Valley View Drive Residential Plot' },
  { num: '25', x: 825, y: 638, w: 46, h: 44, status: 'SOLD', area: 2400, dim: "40' × 60'", facing: 'North', corner: true, park: false, notes: 'Completed Villa on Sea View Corner' }
];

// Note: Raw coordinates were picked on 1024x1024 / original aspect.
// For 1024x576, scale Y by (576 / 1024) = 0.5625
const SCALE_X = 1024 / 1024; // 1.0
const SCALE_Y = 576 / 1024;  // 0.5625

const processedPlots = rawPlots.map(p => {
  const scaledX = Math.round(p.x * SCALE_X);
  const scaledY = Math.round(p.y * SCALE_Y);
  const scaledW = Math.round(p.w * 1.0);
  const scaledH = Math.round(p.h * 0.5625);

  return {
    ...p,
    scaledX,
    scaledY,
    scaledW,
    scaledH
  };
});

console.log('Processed ' + processedPlots.length + ' enclave plots!');
console.log('Sample plot #94:', processedPlots[0]);
console.log('Sample plot #62:', processedPlots.find(p => p.num === '62'));
console.log('Sample plot #16:', processedPlots.find(p => p.num === '16'));
