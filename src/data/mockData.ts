import { City, Project, Plot } from '../types';
import { applyProjectSiteDesigns, generateProjectPlots } from './projectSiteDesigns';

export const CITIES: City[] = [
  {
    id: 'chennai',
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'High-yield plotted corridors along GST Road, OMR & ECR',
    description: 'Chennai is seeing unprecedented demand for gated plotted communities driven by the Metro expansion, aerospace parks, and peripheral ring road connectivity.',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    coordinates: [12.8342, 80.0531],
    featured: true,
    avgPricePerSqFt: 3450,
    priceRange: '₹32 L – ₹1.8 Cr',
    activeProjectsCount: 4,
    keyGrowthCorridors: ['GST Road / Guduvanchery', 'OMR Padur / Kelambakkam', 'Oragadam Auto Hub', 'Poonamallee Bypass']
  },
  {
    id: 'bengaluru',
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley satellite corridors and Airport Aerotropolis',
    description: 'Rapid infrastructure development around STRR, BIAL IT Investment Region, and Sarjapur makes Bengaluru the premier capital appreciation market for land buyers.',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    coordinates: [13.2458, 77.7126],
    featured: true,
    avgPricePerSqFt: 4600,
    priceRange: '₹48 L – ₹2.5 Cr',
    activeProjectsCount: 3,
    keyGrowthCorridors: ['Devanahalli Airport Corridor', 'Sarjapur-Attibele Road', 'Bagalur Hardware Park', 'Kanakapura Corridor']
  },
  {
    id: 'hyderabad',
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Booming western IT corridor and Regional Ring Road expansion',
    description: 'Hyderabad offers exceptional planned infrastructure with wide arterial roads, HMDA layouts, and direct ORR access attracting tech professionals and NRI investors.',
    heroImage: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
    coordinates: [17.4399, 78.1983],
    featured: true,
    avgPricePerSqFt: 3850,
    priceRange: '₹40 L – ₹2.1 Cr',
    activeProjectsCount: 3,
    keyGrowthCorridors: ['Mokila / Shankarpally', 'Shamshabad Airport Zone', 'Kollur / Tellapur', 'Kompally / Medchal']
  },
  {
    id: 'coimbatore',
    slug: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    tagline: 'The Manchester of South India with serene Western Ghats living',
    description: 'With pleasant year-round climate and surging tech campuses, Coimbatore has become a hotspot for retirement villas and independent gated layouts.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    coordinates: [11.0168, 76.9558],
    featured: true,
    avgPricePerSqFt: 2950,
    priceRange: '₹28 L – ₹1.2 Cr',
    activeProjectsCount: 2,
    keyGrowthCorridors: ['Saravanampatti Tech Zone', 'Avinashi Road Expansion', 'Kovaipudur Hill Breeze', 'Trichy Road Sulur']
  },
  {
    id: 'madurai',
    slug: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    tagline: 'Cultural heritage hub with expanding Ring Road infrastructure',
    description: 'Emerging industrial corridors and AIIMS development at Thoppur are accelerating residential plotted developments around Madurai outer rings.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    coordinates: [9.9252, 78.1198],
    featured: false,
    avgPricePerSqFt: 2100,
    priceRange: '₹22 L – ₹85 L',
    activeProjectsCount: 1,
    keyGrowthCorridors: ['Othakadai High Street', 'Samayanallur Bypass', 'Kappalur Industrial Belt']
  },
  {
    id: 'tiruchirappalli',
    slug: 'tiruchirappalli',
    name: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    tagline: 'Central Tamil Nadu logistical and educational nexus',
    description: 'Plotted developments along the Cauvery basin and international airport corridor offer peaceful residential neighborhoods with rapid capital appreciation.',
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    coordinates: [10.7905, 78.7047],
    featured: false,
    avgPricePerSqFt: 2250,
    priceRange: '₹24 L – ₹90 L',
    activeProjectsCount: 1,
    keyGrowthCorridors: ['Srirangam North Expanse', 'Navalpattu IT Park', 'Airport Ring Road']
  },
  {
    id: 'salem',
    slug: 'salem',
    name: 'Salem',
    state: 'Tamil Nadu',
    tagline: 'Scenic Yercaud foothills and defense corridor connectivity',
    description: 'Lush mountain views coupled with Bangalore-Coimbatore industrial arterial highways make Salem a favored destination for vacation home layouts.',
    heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    coordinates: [11.6643, 78.1460],
    featured: false,
    avgPricePerSqFt: 1950,
    priceRange: '₹20 L – ₹75 L',
    activeProjectsCount: 1,
    keyGrowthCorridors: ['Yercaud Foothills', 'Seelanaickenpatti', 'Attur Highway']
  },
  {
    id: 'mysuru',
    slug: 'mysuru',
    name: 'Mysuru',
    state: 'Karnataka',
    tagline: 'Bengaluru-Mysuru 10-Lane Expressway lifestyle haven',
    description: 'Reduced travel time from Bengaluru via the 10-lane expressway has positioned Mysuru as the top choice for weekend farm plots and heritage villa living.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    coordinates: [12.2958, 76.6394],
    featured: true,
    avgPricePerSqFt: 3100,
    priceRange: '₹30 L – ₹1.4 Cr',
    activeProjectsCount: 2,
    keyGrowthCorridors: ['Vijayanagar 4th Stage', 'Bannur Road Corridor', 'Bogadi Ring Road', 'Hunsur Road Corridor']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-chennai-park-avenue',
    slug: 'park-avenue',
    name: 'Park Avenue Plotted Enclave',
    tagline: 'Grand 40-Acre Masterplanned Villa Community with 40ft Tree-Lined Avenues',
    locality: 'Guduvanchery, GST Road',
    cityId: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹38.4 Lakhs – ₹81.6 Lakhs',
    minPrice: 3840000,
    maxPrice: 8160000,
    totalAreaAcres: 40,
    totalPlots: 42,
    approvalAuthority: 'DTCP & RERA Approved (Demo Layout)',
    approvalNumber: 'TN/01/Layout/2026/0491 (Demo ID)',
    verificationBadge: 'Navanext Verified Masterplan (Demo)',
    description: 'Park Avenue is an idyllic master-planned plotted residential community situated right off the rapidly growing GST Road corridor. Thoughtfully engineered with 40ft and 30ft blacktop avenues, LED avenue lighting, underground electrical cabling, piped water provision for each individual plot, and a 2-acre landscaped central park with a luxury resident clubhouse.',
    roadConnectivity: [
      '3 Mins from GST Road Highway',
      '8 Mins from Guduvanchery Railway Station & Bus Terminus',
      '14 Mins to Kilambakkam KCBT Mega Bus Terminus',
      '25 Mins to Mahindra World City IT & Industrial SEZ',
      '35 Mins to Chennai International Airport'
    ],
    developer: {
      name: 'Navanext',
      experienceYears: 18,
      totalProjects: 24,
      headquarters: 'Chennai, Tamil Nadu',
      description: 'A trusted pioneer in plotted infrastructure with over 3,000 satisfied homebuilders and 100% on-time legal handover records across South India.'
    },
    amenities: [
      { name: '40ft & 30ft Blacktop Roads', iconName: 'Road', description: 'Heavy-duty asphalt roads with curb stones and paver shoulders' },
      { name: 'Underground Drainage & EB', iconName: 'Zap', description: 'Concealed storm water drains and underground electrical conduits' },
      { name: 'Central Landscaped Park', iconName: 'Trees', description: '2 acres of lush manicured greenery, reflexology path, and zen garden' },
      { name: 'Compound Wall & 24/7 Security', iconName: 'ShieldCheck', description: 'Grand entry arch with boom barrier, RFID access and CCTV cameras' },
      { name: 'Clubhouse & Sport Court', iconName: 'Building', description: 'Indoor badminton, multipurpose community hall and fitness gym' },
      { name: 'Individual Water Tap Point', iconName: 'Droplets', description: 'Dedicated potable water connection line installed at every plot' }
    ],
    landmarks: [
      { name: 'Guduvanchery Railway Station', distance: '3.2 km', category: 'transit' },
      { name: 'Kilambakkam KCBT Mega Bus Terminus', distance: '7.8 km', category: 'transit' },
      { name: 'SRM University & Global Hospital', distance: '6.5 km', category: 'education' },
      { name: 'Mahindra World City SEZ', distance: '12 km', category: 'tech' },
      { name: 'Chennai International Airport', distance: '24 km', category: 'transit' }
    ],
    coordinates: [12.8342, 80.0531],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [
        // Main 40ft Central Boulevard (Horizontal)
        { id: 'rd-main', name: '40FT ROYAL BOULEVARD', x: 80, y: 350, width: 1040, height: 70, label: '40FT ROYAL BOULEVARD' },
        // North Cross Road (Horizontal)
        { id: 'rd-north', name: '30FT GULMOHAR AVENUE', x: 80, y: 140, width: 1040, height: 50, label: '30FT GULMOHAR AVENUE' },
        // South Cross Road (Horizontal)
        { id: 'rd-south', name: '30FT JACARANDA STREET', x: 80, y: 580, width: 1040, height: 50, label: '30FT JACARANDA STREET' },
        // Connecting Avenue 1 (Vertical)
        { id: 'rd-conn-1', name: '30FT GREENWAY 1', x: 410, y: 140, width: 45, height: 490, label: 'GREENWAY 1', isVertical: true },
        // Connecting Avenue 2 (Vertical)
        { id: 'rd-conn-2', name: '30FT GREENWAY 2', x: 760, y: 140, width: 45, height: 490, label: 'GREENWAY 2', isVertical: true }
      ],
      greenSpaces: [
        { id: 'park-1', name: 'Grand Central Botanical Park', x: 475, y: 210, width: 260, height: 120, label: 'CENTRAL BOTANICAL PARK' },
        { id: 'park-2', name: 'Childrens Play Court & Gazebo', x: 475, y: 440, width: 260, height: 120, label: 'CHILDREN PLAY COURT & GAZEBO' }
      ],
      facilities: [],
      gate: {
        x: 80,
        y: 350,
        label: 'GRAND SECURITY ENTRY ARCH'
      }
    }
  },
  {
    id: 'proj-bengaluru-emerald-enclave',
    slug: 'emerald-enclave',
    name: 'Emerald Enclave Masterplan',
    tagline: 'Smart Tech Plotted Township near BIAL Airport Aerotropolis',
    locality: 'Devanahalli, Airport Corridor',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹52.8 Lakhs – ₹1.12 Cr',
    minPrice: 5280000,
    maxPrice: 11200000,
    totalAreaAcres: 32,
    totalPlots: 32,
    approvalAuthority: 'BIAAPA & RERA Approved (Demo Layout)',
    approvalNumber: 'PRM/KA/RERA/1250/303/Demo (Demo ID)',
    verificationBadge: 'BIAAPA Sanctioned Layout (Demo)',
    description: 'Strategically positioned just 15 minutes from Kempegowda International Airport and the STRR junction, Emerald Enclave provides premium villa plots with uninterrupted views of Nandi Hills, smart solar lighting, and rapid capital appreciation.',
    roadConnectivity: [
      '12 Mins to Kempegowda International Airport (BIAL)',
      '5 Mins to Satellite Town Ring Road (STRR)',
      '18 Mins to Aerospace & IT SEZ Bagalur',
      '20 Mins to Padukone-Dravid Centre for Sports Excellence'
    ],
    developer: {
      name: 'Vanguard Realty Partners',
      experienceYears: 15,
      totalProjects: 18,
      headquarters: 'Bengaluru, Karnataka',
      description: 'Award-winning plotted land developers specializing in high-growth transit corridors around Greater Bengaluru.'
    },
    amenities: [
      { name: '40ft Concrete Roads', iconName: 'Road', description: 'High-grade concrete roads with storm water gullies' },
      { name: 'Solar Street Illumination', iconName: 'Sun', description: '100% solar LED automated perimeter and avenue lighting' },
      { name: 'Club Pavilion & Tennis', iconName: 'Trophy', description: 'Modern open-air lounge, half basketball and tennis court' },
      { name: 'Biophilic Pocket Parks', iconName: 'Trees', description: 'Over 800 indigenous flowering trees planted along layout borders' }
    ],
    landmarks: [
      { name: 'Kempegowda International Airport', distance: '11 km', category: 'transit' },
      { name: 'Devanahalli Business Park', distance: '4.5 km', category: 'tech' },
      { name: 'Gitams University Campus', distance: '8.2 km', category: 'education' },
      { name: 'Aster CMI Hospital North Clinic', distance: '6.0 km', category: 'health' }
    ],
    coordinates: [13.2458, 77.7126],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [
        { id: 'rd-main-blr', name: '40FT AEROTROPOLIS WAY', x: 80, y: 360, width: 1040, height: 70, label: '40FT AEROTROPOLIS WAY' },
        { id: 'rd-north-blr', name: '30FT SILICON GROVE', x: 80, y: 150, width: 1040, height: 50, label: '30FT SILICON GROVE' },
        { id: 'rd-south-blr', name: '30FT NANDI VISTA', x: 80, y: 590, width: 1040, height: 50, label: '30FT NANDI VISTA' },
        { id: 'rd-v1-blr', name: 'AVENUE 1', x: 575, y: 150, width: 45, height: 490, label: 'AVENUE 1', isVertical: true }
      ],
      greenSpaces: [
        { id: 'park-blr-1', name: 'Nandi View Meditation Meadow', x: 645, y: 220, width: 395, height: 120, label: 'NANDI VIEW MEDITATION MEADOW' }
      ],
      facilities: [
        { id: 'fac-blr', name: 'The Aerotropolis Clubhouse', x: 105, y: 220, width: 440, height: 120, label: 'THE AEROTROPOLIS CLUBHOUSE' }
      ],
      gate: {
        x: 80,
        y: 360,
        label: 'MAIN SECURITY GUEST ACCESS'
      }
    }
  },
  {
    id: 'proj-hyderabad-greenfield-serenade',
    slug: 'greenfield-serenade',
    name: 'Greenfield Serenade Luxury Plots',
    tagline: 'Elite HMDA Plotted Gated Community along Shankarpally - Mokila Corridor',
    locality: 'Mokila, Western Hyderabad',
    cityId: 'hyderabad',
    cityName: 'Hyderabad',
    state: 'Telangana',
    heroImage: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹46.2 Lakhs – ₹98 Lakhs',
    minPrice: 4620000,
    maxPrice: 9800000,
    totalAreaAcres: 28,
    totalPlots: 28,
    approvalAuthority: 'HMDA & RERA Sanctioned (Demo Layout)',
    approvalNumber: 'HMDA/LP/00481/2026 (Demo ID)',
    verificationBadge: 'HMDA Certified Clear Title (Demo)',
    description: 'Nestled in the lush western belt of Mokila, Greenfield Serenade offers generous 200 to 400 sq.yard plots with 100% vaastu compliance, subterranean utility lines, and peaceful pollution-free environs.',
    roadConnectivity: [
      '10 Mins to Outer Ring Road (ORR Junction 2)',
      '20 Mins to Financial District Gachibowli',
      '25 Mins to Neopolis Kokapet',
      '35 Mins to Rajiv Gandhi International Airport'
    ],
    developer: {
      name: 'Deccan Horizon Infrastructures',
      experienceYears: 20,
      totalProjects: 31,
      headquarters: 'Hyderabad, Telangana',
      description: 'Premier developer known for delivering landmark gated communities with pristine landscaping across West Hyderabad.'
    },
    amenities: [
      { name: '100% Vaastu Plots', iconName: 'Compass', description: 'Precisely aligned North and East orientation plots' },
      { name: 'Underground Gas & Water Grid', iconName: 'Flame', description: 'Dual water pipeline network and piped gas conduits' },
      { name: 'Grand Clubhouse & Infinity Pool', iconName: 'Waves', description: '15,000 sq.ft lifestyle clubhouse' }
    ],
    landmarks: [
      { name: 'Financial District Gachibowli', distance: '18 km', category: 'tech' },
      { name: 'Indus International School', distance: '6.8 km', category: 'education' },
      { name: 'Neopolis Cyber SEZ', distance: '15 km', category: 'tech' }
    ],
    coordinates: [17.4399, 78.1983],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [
        { id: 'rd-main-hyd', name: '40FT SERENADE DRIVE', x: 80, y: 360, width: 1040, height: 70, label: '40FT SERENADE DRIVE' }
      ],
      greenSpaces: [],
      facilities: [],
      gate: { x: 80, y: 360, label: 'WEST SECURITY GATE' }
    }
  },
  {
    id: 'proj-coimbatore-whispering-palms',
    slug: 'whispering-palms',
    name: 'Whispering Palms Gated Layout',
    tagline: 'Scenic Villa Plots in Coimbatore’s Prime IT Corridor',
    locality: 'Saravanampatti, IT Corridor',
    cityId: 'coimbatore',
    cityName: 'Coimbatore',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹35.4 Lakhs – ₹76.8 Lakhs',
    minPrice: 3540000,
    maxPrice: 7680000,
    totalAreaAcres: 22,
    totalPlots: 24,
    approvalAuthority: 'DTCP & RERA Approved (Demo Layout)',
    approvalNumber: 'TN/11/Layout/2026/0122 (Demo ID)',
    verificationBadge: 'DTCP Sanctioned Layout (Demo)',
    description: 'Located in Saravanampatti near top IT parks and engineering universities, Whispering Palms offers calm, tree-flanked villa plots with pleasant micro-climate and mountain breezes.',
    roadConnectivity: [
      '5 Mins to CHIL SEZ IT Park',
      '12 Mins to Avinashi Road Flyover',
      '20 Mins to Coimbatore International Airport'
    ],
    developer: {
      name: 'Kongu Terra Developers',
      experienceYears: 14,
      totalProjects: 12,
      headquarters: 'Coimbatore, Tamil Nadu',
      description: 'Specialists in sustainable residential communities across Coimbatore, Tiruppur, and Erode.'
    },
    amenities: [
      { name: '33ft Broad Avenues', iconName: 'Road', description: 'Smooth tar roads with concrete border kerbs' },
      { name: 'Jogging Track & Park', iconName: 'Footprints', description: '400m walking trail around peripheral greens' }
    ],
    landmarks: [
      { name: 'CHIL SEZ IT Park', distance: '2.5 km', category: 'tech' },
      { name: 'Kumaraguru College of Tech', distance: '3.8 km', category: 'education' },
      { name: 'Coimbatore International Airport', distance: '11 km', category: 'transit' }
    ],
    coordinates: [11.0168, 76.9558],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [
        { id: 'rd-main-cbe', name: '40FT PALM BOULEVARD', x: 80, y: 360, width: 1040, height: 70, label: '40FT PALM BOULEVARD' }
      ],
      greenSpaces: [],
      facilities: [],
      gate: { x: 80, y: 360, label: 'PALMS GATEWAY' }
    }
  },
  {
    id: 'proj-mysuru-chamundi-crest',
    slug: 'chamundi-crest',
    name: 'Chamundi Crest Plotted Haven',
    tagline: 'Tranquil Villa Living with Express Highway Access to Bengaluru',
    locality: 'Vijayanagar 4th Stage',
    cityId: 'mysuru',
    cityName: 'Mysuru',
    state: 'Karnataka',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹37.2 Lakhs – ₹85 Lakhs',
    minPrice: 3720000,
    maxPrice: 8500000,
    totalAreaAcres: 20,
    totalPlots: 20,
    approvalAuthority: 'MUDA & RERA Approved (Demo Layout)',
    approvalNumber: 'MUDA/PL/2026/088 (Demo ID)',
    verificationBadge: 'MUDA Sanctioned Layout (Demo)',
    description: 'Chamundi Crest is a boutique plotted development in the coveted Vijayanagar 4th Stage, offering wide tree-lined avenues and proximity to premier schools and the outer ring road.',
    roadConnectivity: [
      '4 Mins to Ring Road Junction',
      '15 Mins to Mysuru Suburban Bus Stand',
      '20 Mins to Bengaluru-Mysuru Expressway Tollgate'
    ],
    developer: {
      name: 'Mysore Heritage Habitats',
      experienceYears: 12,
      totalProjects: 9,
      headquarters: 'Mysuru, Karnataka',
      description: 'Dedicated to preserving Mysuru’s heritage tranquility while building contemporary gated communities.'
    },
    amenities: [
      { name: 'Underground Drainage & Water', iconName: 'Droplets', description: 'Fully commissioned MUDA spec sewage lines' },
      { name: 'Landscape Park & Yoga Deck', iconName: 'Smile', description: 'Serene yoga deck overlooking Chamundi Hills' }
    ],
    landmarks: [
      { name: 'Mysuru Ring Road', distance: '1.2 km', category: 'transit' },
      { name: 'Mysuru Palace', distance: '9.5 km', category: 'leisure' }
    ],
    coordinates: [12.2958, 76.6394],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [
        { id: 'rd-main-mys', name: '40FT HERITAGE WAY', x: 80, y: 360, width: 1040, height: 70, label: '40FT HERITAGE WAY' }
      ],
      greenSpaces: [],
      facilities: [],
      gate: { x: 80, y: 360, label: 'CREST ENTRY GATE' }
    }
  },
  // Chennai Project 2: ECR
  {
    id: 'proj-chennai-coastal-palms',
    slug: 'coastal-palms',
    name: 'Coastal Palms Beachside Plots',
    tagline: 'Luxury Coastal Living 800m from Bay of Bengal along Scenic ECR',
    locality: 'Muttukadu / Kovalam, ECR',
    cityId: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹68 Lakhs – ₹1.65 Cr',
    minPrice: 6800000,
    maxPrice: 16500000,
    totalAreaAcres: 18,
    totalPlots: 26,
    approvalAuthority: 'CMDA & RERA Approved',
    approvalNumber: 'CMDA/PL/2026/0194',
    verificationBadge: 'CMDA Approved Beachside Layout',
    description: 'Exclusive beachside gated plotted community nestled off East Coast Road. Features 40ft blacktop roads, sweet ground water at 15ft, underground electrical conduits, and 24x7 security.',
    roadConnectivity: [
      '2 Mins to East Coast Road (ECR 6-Lane Expressway)',
      '15 Mins to Sholinganallur OMR Junction',
      '30 Mins to Adyar & South Chennai'
    ],
    developer: {
      name: 'Navanext',
      experienceYears: 18,
      totalProjects: 24,
      headquarters: 'Chennai, Tamil Nadu',
      description: 'Pioneers in high-yield plotted investments across Tamil Nadu.'
    },
    amenities: [
      { name: 'Beach Access Promenade', iconName: 'Waves', description: 'Private paved walkway to sandy beach shores' },
      { name: 'Underground Infrastructure', iconName: 'Zap', description: 'Zero overhead wires, concealed EB cables' }
    ],
    landmarks: [
      { name: 'Muttukadu Boat House', distance: '1.5 km', category: 'leisure' },
      { name: 'Mayajaal Multiplex', distance: '4.2 km', category: 'leisure' }
    ],
    coordinates: [12.8130, 80.2440],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [{ id: 'rd-cp-1', name: '40FT BAYVIEW BOULEVARD', x: 80, y: 360, width: 1040, height: 70, label: '40FT BAYVIEW BOULEVARD' }],
      greenSpaces: [],
      facilities: [],
      gate: { x: 80, y: 360, label: 'COASTAL GATEWAY' }
    }
  },
  // Chennai Project 3: OMR
  {
    id: 'proj-chennai-cyber-crest',
    slug: 'cyber-crest',
    name: 'Cyber Crest Plotted Township',
    tagline: 'High-Appreciation IT Corridor Plots near Siruseri SIPCOT',
    locality: 'Padur / Kelambakkam, OMR',
    cityId: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹42.5 Lakhs – ₹89 Lakhs',
    minPrice: 4250000,
    maxPrice: 8900000,
    totalAreaAcres: 25,
    totalPlots: 35,
    approvalAuthority: 'DTCP & RERA Approved',
    approvalNumber: 'TN/01/Layout/2026/0882',
    verificationBadge: 'DTCP Sanctioned Layout',
    description: 'Cyber Crest offers prime ready-to-build residential plots adjacent to the upcoming Metro Phase 2 terminal and Siruseri Asia largest IT park.',
    roadConnectivity: [
      '3 Mins to OMR IT Expressway',
      '8 Mins to Siruseri SIPCOT IT SEZ',
      '20 Mins to Medavakkam Junction'
    ],
    developer: {
      name: 'Navanext',
      experienceYears: 18,
      totalProjects: 24,
      headquarters: 'Chennai, Tamil Nadu',
      description: 'Pioneers in high-yield plotted investments across Tamil Nadu.'
    },
    amenities: [
      { name: '40ft Avenue Roads', iconName: 'Road', description: 'High durable bituminous roads' },
      { name: 'Children Play Park', iconName: 'Trees', description: 'Landscaped play area and meditation zone' }
    ],
    landmarks: [
      { name: 'Siruseri SIPCOT IT Park', distance: '3.5 km', category: 'tech' },
      { name: 'Chettinad Health City', distance: '2.1 km', category: 'health' }
    ],
    coordinates: [12.7915, 80.2198],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [{ id: 'rd-cc-1', name: '40FT TECH DRIVE', x: 80, y: 360, width: 1040, height: 70, label: '40FT TECH DRIVE' }],
      greenSpaces: [],
      facilities: [],
      gate: { x: 80, y: 360, label: 'CYBER CREST ARCH' }
    }
  },
  // Chennai Project 4: Oragadam
  {
    id: 'proj-chennai-royal-orchards',
    slug: 'royal-orchards',
    name: 'Royal Orchards County',
    tagline: 'Strategic Plotted Community in Chennai South Industrial & Aerospace Belt',
    locality: 'Oragadam Auto Hub',
    cityId: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    priceRangeText: '₹29.5 Lakhs – ₹58 Lakhs',
    minPrice: 2950000,
    maxPrice: 5800000,
    totalAreaAcres: 30,
    totalPlots: 40,
    approvalAuthority: 'DTCP & RERA Approved',
    approvalNumber: 'TN/03/Layout/2026/0411',
    verificationBadge: 'DTCP Sanctioned Layout',
    description: 'Surrounded by Fortune 500 automobile giants and manufacturing hubs, Royal Orchards delivers robust rental yield and high capital appreciation.',
    roadConnectivity: [
      '5 Mins to Oragadam Junction 6-Lane Highway',
      '15 Mins to Sriperumbudur Industrial Corridor',
      '25 Mins to Tambaram'
    ],
    developer: {
      name: 'Navanext',
      experienceYears: 18,
      totalProjects: 24,
      headquarters: 'Chennai, Tamil Nadu',
      description: 'Pioneers in high-yield plotted investments across Tamil Nadu.'
    },
    amenities: [
      { name: '40ft & 30ft Roads', iconName: 'Road', description: 'Broad paved internal streets' },
      { name: 'Gated Security Arch', iconName: 'ShieldCheck', description: 'Round-the-clock CCTV surveillance' }
    ],
    landmarks: [
      { name: 'Daimler India Commercial SEZ', distance: '4.0 km', category: 'tech' },
      { name: 'Renault-Nissan Plant', distance: '5.5 km', category: 'tech' }
    ],
    coordinates: [12.8354, 79.9548],
    layoutConfig: {
      viewBox: '0 0 1200 800',
      width: 1200,
      height: 800,
      roads: [{ id: 'rd-ro-1', name: '40FT ROYAL AVENUE', x: 80, y: 360, width: 1040, height: 70, label: '40FT ROYAL AVENUE' }],
      greenSpaces: [],
      facilities: [],
      gate: { x: 80, y: 360, label: 'ROYAL ENTRY GATE' }
    }
  },
  // Bengaluru Project 2: Sarjapur
  {
    id: 'proj-bengaluru-silicon-meadows',
    slug: 'silicon-meadows',
    name: 'Silicon Meadows Tech Enclave',
    tagline: 'Premium Gated Villa Plots along Sarjapur - Attibele IT Axis',
    locality: 'Sarjapur-Attibele Road',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹48 Lakhs – ₹1.15 Cr',
    minPrice: 4800000,
    maxPrice: 11500000,
    totalAreaAcres: 24,
    totalPlots: 30,
    approvalAuthority: 'BMRDA & RERA Approved',
    approvalNumber: 'BMRDA/LA/2026/054',
    verificationBadge: 'BMRDA Approved Layout',
    description: 'Located in Bengaluru fastest growing villa corridor with easy commute to Wipro SEZ, Electronic City, and Outer Ring Road.',
    roadConnectivity: ['10 Mins to Sarjapur Town', '20 Mins to Electronic City Phase 2', '25 Mins to Bellandur ORR'],
    developer: { name: 'Vanguard Realty Partners', experienceYears: 15, totalProjects: 18, headquarters: 'Bengaluru', description: 'Pioneers in Greater Bengaluru.' },
    amenities: [{ name: 'Clubhouse & Pool', iconName: 'Waves', description: 'Community recreation center' }],
    landmarks: [{ name: 'Wipro Corporate Campus', distance: '8.5 km', category: 'tech' }],
    coordinates: [12.8624, 77.7785],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-sm-1', name: '40FT SILICON WAY', x: 80, y: 360, width: 1040, height: 70, label: '40FT SILICON WAY' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'SILICON GATE' }
    }
  },
  // Bengaluru Project 3: Kanakapura
  {
    id: 'proj-bengaluru-green-valley',
    slug: 'green-valley',
    name: 'Green Valley County',
    tagline: 'Serene Nature-Flanked Plots near Green Line Metro',
    locality: 'Kanakapura Corridor',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹44 Lakhs – ₹95 Lakhs',
    minPrice: 4400000,
    maxPrice: 9500000,
    totalAreaAcres: 20,
    totalPlots: 25,
    approvalAuthority: 'BMRDA & RERA Approved',
    approvalNumber: 'BMRDA/LA/2026/089',
    verificationBadge: 'BMRDA Approved Layout',
    description: 'Flanked by lush greenery and close to Silk Institute Metro Station, ideal for weekend homes and tranquil living.',
    roadConnectivity: ['8 Mins to NICE Road Kanakapura Interchange', '12 Mins to Metro Station'],
    developer: { name: 'Vanguard Realty Partners', experienceYears: 15, totalProjects: 18, headquarters: 'Bengaluru', description: 'Pioneers in Greater Bengaluru.' },
    amenities: [{ name: 'Aroma Park', iconName: 'Trees', description: 'Herbal and flowering gardens' }],
    landmarks: [{ name: 'Art of Living Ashram', distance: '6.0 km', category: 'leisure' }],
    coordinates: [12.7840, 77.5120],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-gv-1', name: '40FT VALLEY ROAD', x: 80, y: 360, width: 1040, height: 70, label: '40FT VALLEY ROAD' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'VALLEY ARCH' }
    }
  },
  // Hyderabad Project 2: Shamshabad
  {
    id: 'proj-hyderabad-aero-city',
    slug: 'aero-city',
    name: 'Aero City Aerotropolis Plots',
    tagline: 'High Growth Plotted Enclave near RGIA Airport Zone',
    locality: 'Shamshabad Airport Zone',
    cityId: 'hyderabad',
    cityName: 'Hyderabad',
    state: 'Telangana',
    heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹38 Lakhs – ₹85 Lakhs',
    minPrice: 3800000,
    maxPrice: 8500000,
    totalAreaAcres: 22,
    totalPlots: 28,
    approvalAuthority: 'HMDA & RERA Approved',
    approvalNumber: 'HMDA/LP/00612/2026',
    verificationBadge: 'HMDA Certified Layout',
    description: 'Direct Bangalore Highway access, right next to the airport aero hub and upcoming pharma tech zones.',
    roadConnectivity: ['5 Mins to Outer Ring Road Exit 16', '10 Mins to Hyderabad International Airport'],
    developer: { name: 'Deccan Horizon Infrastructures', experienceYears: 20, totalProjects: 31, headquarters: 'Hyderabad', description: 'Leading Telangana developer.' },
    amenities: [{ name: 'Underground Power Grid', iconName: 'Zap', description: 'Underground electric grid' }],
    landmarks: [{ name: 'RGIA Airport', distance: '8.0 km', category: 'transit' }],
    coordinates: [17.2403, 78.4294],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-ac-1', name: '40FT AIRPORT WAY', x: 80, y: 360, width: 1040, height: 70, label: '40FT AIRPORT WAY' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'AERO GATE' }
    }
  },
  // Hyderabad Project 3: Tellapur
  {
    id: 'proj-hyderabad-cyber-hills',
    slug: 'cyber-hills',
    name: 'Cyber Hills Gated Plots',
    tagline: 'Ultra Luxury Gated Plots Minutes from Financial District',
    locality: 'Tellapur / Kollur',
    cityId: 'hyderabad',
    cityName: 'Hyderabad',
    state: 'Telangana',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹65 Lakhs – ₹1.8 Cr',
    minPrice: 6500000,
    maxPrice: 18000000,
    totalAreaAcres: 26,
    totalPlots: 32,
    approvalAuthority: 'HMDA & RERA Approved',
    approvalNumber: 'HMDA/LP/00789/2026',
    verificationBadge: 'HMDA Certified Layout',
    description: 'Surrounded by high-end luxury villa communities and top international schools with direct ORR connectivity.',
    roadConnectivity: ['6 Mins to ORR Exit 2', '15 Mins to Wipro Circle Financial District'],
    developer: { name: 'Deccan Horizon Infrastructures', experienceYears: 20, totalProjects: 31, headquarters: 'Hyderabad', description: 'Leading Telangana developer.' },
    amenities: [{ name: 'Grand Clubhouse', iconName: 'Building', description: 'Clubhouse with gym and sports' }],
    landmarks: [{ name: 'Gachibowli Stadium', distance: '12 km', category: 'leisure' }],
    coordinates: [17.4850, 78.2750],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-ch-1', name: '40FT CYBER BLVD', x: 80, y: 360, width: 1040, height: 70, label: '40FT CYBER BLVD' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'CYBER HILLS ARCH' }
    }
  },
  // Coimbatore Project 2: Kovaipudur
  {
    id: 'proj-coimbatore-kovaipudur-breeze',
    slug: 'kovaipudur-breeze',
    name: 'Kovaipudur Breeze Meadows',
    tagline: 'Scenic Foothill Villa Plots with Western Ghats Climate',
    locality: 'Kovaipudur Hill Breeze',
    cityId: 'coimbatore',
    cityName: 'Coimbatore',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹28 Lakhs – ₹62 Lakhs',
    minPrice: 2800000,
    maxPrice: 6200000,
    totalAreaAcres: 16,
    totalPlots: 20,
    approvalAuthority: 'DTCP & RERA Approved',
    approvalNumber: 'TN/11/Layout/2026/0204',
    verificationBadge: 'DTCP Sanctioned Layout',
    description: 'Known as the Little Ooty of Coimbatore, Kovaipudur offers cool mountain breezes and clean air for retirement and vacation homes.',
    roadConnectivity: ['15 Mins to Coimbatore Railway Junction', '20 Mins to Gandhipuram'],
    developer: { name: 'Kongu Terra Developers', experienceYears: 14, totalProjects: 12, headquarters: 'Coimbatore', description: 'Sustainable communities.' },
    amenities: [{ name: 'Panoramic Hill View', iconName: 'Compass', description: 'Unobstructed mountain views' }],
    landmarks: [{ name: 'Krishna College of Technology', distance: '3.0 km', category: 'education' }],
    coordinates: [10.9320, 76.9450],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-kb-1', name: '33FT BREEZE WAY', x: 80, y: 360, width: 1040, height: 70, label: '33FT BREEZE WAY' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'BREEZE GATE' }
    }
  },
  // Madurai Project 1
  {
    id: 'proj-madurai-meenakshi-pride',
    slug: 'meenakshi-pride',
    name: 'Meenakshi Pride Plotted Enclave',
    tagline: 'Sanctioned Villa Plots near High Court & AIIMS Corridor',
    locality: 'Othakadai High Street',
    cityId: 'madurai',
    cityName: 'Madurai',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹22.5 Lakhs – ₹55 Lakhs',
    minPrice: 2250000,
    maxPrice: 5500000,
    totalAreaAcres: 15,
    totalPlots: 22,
    approvalAuthority: 'DTCP & RERA Approved',
    approvalNumber: 'TN/15/Layout/2026/0115',
    verificationBadge: 'DTCP Sanctioned Layout',
    description: 'Direct access to Madurai Ring Road, close to the Madras High Court Bench and IT parks.',
    roadConnectivity: ['4 Mins to Madurai Ring Road', '15 Mins to Meenakshi Amman Temple'],
    developer: { name: 'Pandya Heritage Estates', experienceYears: 16, totalProjects: 14, headquarters: 'Madurai', description: 'Trusted real estate in South Tamil Nadu.' },
    amenities: [{ name: '30ft Tar Roads', iconName: 'Road', description: 'Blacktop avenues' }],
    landmarks: [{ name: 'Madras High Court Bench', distance: '2.5 km', category: 'transit' }],
    coordinates: [9.9580, 78.1740],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-mp-1', name: '30FT PRIDE WAY', x: 80, y: 360, width: 1040, height: 70, label: '30FT PRIDE WAY' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'PRIDE GATE' }
    }
  },
  // Tiruchirappalli Project 1
  {
    id: 'proj-trichy-cauvery-grand',
    slug: 'cauvery-grand',
    name: 'Cauvery Grand Plotted Expanse',
    tagline: 'Peaceful Residential Enclave along the Cauvery River Belt',
    locality: 'Srirangam North Expanse',
    cityId: 'tiruchirappalli',
    cityName: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹24 Lakhs – ₹65 Lakhs',
    minPrice: 2400000,
    maxPrice: 6500000,
    totalAreaAcres: 18,
    totalPlots: 24,
    approvalAuthority: 'DTCP & RERA Approved',
    approvalNumber: 'TN/18/Layout/2026/0209',
    verificationBadge: 'DTCP Sanctioned Layout',
    description: 'Lush green serene residential plots near Srirangam temple island with potable sweet water.',
    roadConnectivity: ['8 Mins to Srirangam Station', '20 Mins to Trichy International Airport'],
    developer: { name: 'Chola Valley Developers', experienceYears: 15, totalProjects: 11, headquarters: 'Tiruchirappalli', description: 'Central Tamil Nadu pioneers.' },
    amenities: [{ name: 'Potable Water Lines', iconName: 'Droplets', description: 'Sweet ground water connections' }],
    landmarks: [{ name: 'Sri Ranganathaswamy Temple', distance: '4.0 km', category: 'leisure' }],
    coordinates: [10.8650, 78.6920],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-cg-1', name: '33FT CAUVERY WAY', x: 80, y: 360, width: 1040, height: 70, label: '33FT CAUVERY WAY' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'CAUVERY GATE' }
    }
  },
  // Salem Project 1
  {
    id: 'proj-salem-yercaud-foothills',
    slug: 'yercaud-foothills',
    name: 'Yercaud Foothills County',
    tagline: 'Hill-Facing Vacation Villa Plots in Salem Prime Foothills',
    locality: 'Yercaud Foothills',
    cityId: 'salem',
    cityName: 'Salem',
    state: 'Tamil Nadu',
    heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹21 Lakhs – ₹52 Lakhs',
    minPrice: 2100000,
    maxPrice: 5200000,
    totalAreaAcres: 14,
    totalPlots: 20,
    approvalAuthority: 'DTCP & RERA Approved',
    approvalNumber: 'TN/20/Layout/2026/0144',
    verificationBadge: 'DTCP Sanctioned Layout',
    description: 'Scenic hill-facing gated plots with cool breezes, ideal for weekend cottages and holiday rentals.',
    roadConnectivity: ['10 Mins to Salem New Bus Stand', '25 Mins to Yercaud Hill Top'],
    developer: { name: 'Shevaroy Estates', experienceYears: 13, totalProjects: 8, headquarters: 'Salem', description: 'Hill and valley plotted layouts.' },
    amenities: [{ name: 'Panoramic Hill View', iconName: 'Compass', description: 'Yercaud mountain views' }],
    landmarks: [{ name: 'Kurumbapatti Zoological Park', distance: '3.5 km', category: 'leisure' }],
    coordinates: [11.7050, 78.1820],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-yf-1', name: '30FT FOOTHILLS ROAD', x: 80, y: 360, width: 1040, height: 70, label: '30FT FOOTHILLS ROAD' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'FOOTHILLS ENTRY' }
    }
  },
  // Mysuru Project 2
  {
    id: 'proj-mysuru-heritage-woods',
    slug: 'heritage-woods',
    name: 'Heritage Woods Sanctuary',
    tagline: 'Quiet Luxury Plotted Living near Bogadi Ring Road',
    locality: 'Bogadi Ring Road',
    cityId: 'mysuru',
    cityName: 'Mysuru',
    state: 'Karnataka',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    priceRangeText: '₹34 Lakhs – ₹75 Lakhs',
    minPrice: 3400000,
    maxPrice: 7500000,
    totalAreaAcres: 16,
    totalPlots: 22,
    approvalAuthority: 'MUDA & RERA Approved',
    approvalNumber: 'MUDA/PL/2026/112',
    verificationBadge: 'MUDA Sanctioned Layout',
    description: 'Nestled near Bogadi lake and top engineering institutes with quick access to the Bengaluru Expressway.',
    roadConnectivity: ['3 Mins to Ring Road', '15 Mins to Mysuru Palace'],
    developer: { name: 'Mysore Heritage Habitats', experienceYears: 12, totalProjects: 9, headquarters: 'Mysuru', description: 'Mysuru gated developments.' },
    amenities: [{ name: 'Avenue Trees', iconName: 'Trees', description: 'Over 500 indigenous avenue trees' }],
    landmarks: [{ name: 'All India Institute of Speech and Hearing', distance: '4.5 km', category: 'health' }],
    coordinates: [12.3020, 76.5980],
    layoutConfig: {
      viewBox: '0 0 1200 800', width: 1200, height: 800,
      roads: [{ id: 'rd-hw-1', name: '33FT WOODS BOULEVARD', x: 80, y: 360, width: 1040, height: 70, label: '33FT WOODS BOULEVARD' }],
      greenSpaces: [], facilities: [], gate: { x: 80, y: 360, label: 'HERITAGE GATE' }
    }
  }
];

applyProjectSiteDesigns(PROJECTS);

// Helper to generate realistic plots with precise layout coordinates for Park Avenue (42 plots)
export function generateParkAvenuePlots(): Plot[] {
  const plots: Plot[] = [];
  const baseRate = 3200; // ₹3,200/sq.ft

  // Row A: Plots 1 to 14 (Along North Gulmohar Avenue)
  // Structured into 3 architectural blocks around Greenway 1 (x: 410) and Greenway 2 (x: 760)
  for (let i = 1; i <= 14; i++) {
    let xOffset = 100;
    let width = 62;
    if (i <= 4) {
      // West Block: Plots 1 to 4
      xOffset = 100 + (i - 1) * 70;
      width = 62;
    } else if (i <= 9) {
      // Central Block: Plots 5 to 9
      xOffset = 475 + (i - 5) * 53;
      width = 46;
    } else {
      // East Block: Plots 10 to 14
      xOffset = 825 + (i - 10) * 44;
      width = 40;
    }

    const isCorner = i === 1 || i === 4 || i === 5 || i === 9 || i === 10 || i === 14;
    const isPark = i >= 6 && i <= 8;
    const area = isCorner ? 1800 : (i % 2 === 0 ? 1500 : 1200);
    const widthFt = isCorner ? '36\' × 50\'' : (i % 2 === 0 ? '30\' × 50\'' : '30\' × 40\'');
    const price = area * baseRate;

    let status: Plot['status'] = 'AVAILABLE';
    if (i === 3 || i === 8 || i === 12) status = 'RESERVED';
    if (i === 2 || i === 7 || i === 13) status = 'SOLD';

    plots.push({
      id: `plot-pa-${i}`,
      projectId: 'proj-chennai-park-avenue',
      plotNumber: `${i.toString().padStart(2, '0')}`,
      dimensions: widthFt,
      areaSqFt: area,
      facing: i % 2 === 0 ? 'North' : 'East',
      price,
      pricePerSqFt: baseRate,
      status,
      cornerPlot: isCorner,
      parkFacing: isPark,
      roadWidthFt: 30,
      phase: 'Phase 1 - Gulmohar',
      geometry: {
        x: xOffset,
        y: 40,
        width,
        height: 90
      },
      notes: isPark ? 'Faces central botanical green belt' : (isCorner ? 'Prime dual-road access corner plot' : undefined)
    });
  }

  // Row B: Plots 15 to 23 (Facing 40ft Main Boulevard - Premium row)
  for (let i = 15; i <= 23; i++) {
    let xOffset = 100;
    let width = 62;
    if (i <= 18) {
      // West Block: Plots 15 to 18
      xOffset = 100 + (i - 15) * 70;
      width = 62;
    } else {
      // East Block: Plots 19 to 23
      xOffset = 825 + (i - 19) * 44;
      width = 40;
    }

    const isCorner = i === 15 || i === 18 || i === 19 || i === 23;
    const area = isCorner ? 2400 : 1500;
    const widthFt = isCorner ? '40\' × 60\'' : '30\' × 50\'';
    const rate = 3400;
    const price = area * rate;

    let status: Plot['status'] = 'AVAILABLE';
    if (i === 16 || i === 21) status = 'RESERVED';
    if (i === 17 || i === 22) status = 'SOLD';

    plots.push({
      id: `plot-pa-${i}`,
      projectId: 'proj-chennai-park-avenue',
      plotNumber: `${i.toString().padStart(2, '0')}`,
      dimensions: widthFt,
      areaSqFt: area,
      facing: 'North-East',
      price,
      pricePerSqFt: rate,
      status,
      cornerPlot: isCorner,
      parkFacing: true,
      roadWidthFt: 40,
      phase: 'Phase 1 - Royal Boulevard',
      geometry: {
        x: xOffset,
        y: 220,
        width,
        height: 120
      },
      notes: 'Direct frontage onto 40FT Royal Boulevard'
    });
  }

  // Row C: Plots 24 to 32 (South of 40ft Main Boulevard, facing Jacaranda Street)
  for (let i = 24; i <= 32; i++) {
    let xOffset = 100;
    let width = 62;
    if (i <= 27) {
      xOffset = 100 + (i - 24) * 70;
      width = 62;
    } else {
      xOffset = 825 + (i - 28) * 44;
      width = 40;
    }

    const isCorner = i === 24 || i === 27 || i === 28 || i === 32;
    const area = isCorner ? 2100 : 1200;
    const widthFt = isCorner ? '35\' × 60\'' : '30\' × 40\'';
    const rate = 3250;
    const price = area * rate;

    let status: Plot['status'] = 'AVAILABLE';
    if (i === 26 || i === 31) status = 'RESERVED';
    if (i === 25 || i === 30) status = 'SOLD';

    plots.push({
      id: `plot-pa-${i}`,
      projectId: 'proj-chennai-park-avenue',
      plotNumber: `${i.toString().padStart(2, '0')}`,
      dimensions: widthFt,
      areaSqFt: area,
      facing: i % 2 === 0 ? 'East' : 'North',
      price,
      pricePerSqFt: rate,
      status,
      cornerPlot: isCorner,
      parkFacing: false,
      roadWidthFt: 30,
      phase: 'Phase 2 - Jacaranda',
      geometry: {
        x: xOffset,
        y: 430,
        width,
        height: 135
      },
      notes: isCorner ? 'Grand frontage corner plot' : undefined
    });
  }

  // Row D: Plots 33 to 42 (Along south edge: y: 640 to 730)
  for (let i = 33; i <= 42; i++) {
    const col = i - 33;
    const xOffset = 105 + col * 94;
    const isCorner = i === 33 || i === 42;
    const area = 1500;
    const widthFt = '30\' × 50\'';
    const rate = 3150;
    const price = area * rate;

    let status: Plot['status'] = 'AVAILABLE';
    if (i === 36 || i === 40) status = 'RESERVED';
    if (i === 35 || i === 39 || i === 41) status = 'SOLD';

    plots.push({
      id: `plot-pa-${i}`,
      projectId: 'proj-chennai-park-avenue',
      plotNumber: `${i.toString().padStart(2, '0')}`,
      dimensions: widthFt,
      areaSqFt: area,
      facing: 'North',
      price,
      pricePerSqFt: rate,
      status,
      cornerPlot: isCorner,
      parkFacing: false,
      roadWidthFt: 30,
      phase: 'Phase 2 - South Greens',
      geometry: {
        x: xOffset,
        y: 640,
        width: 86,
        height: 90
      }
    });
  }

  return plots;
}

// Generate Emerald Enclave Plots (Bengaluru) - 32 Plots perfectly bordered
export function generateEmeraldEnclavePlots(): Plot[] {
  const plots: Plot[] = [];
  const baseRate = 4400; // ₹4,400/sq.ft

  for (let i = 1; i <= 32; i++) {
    const isRow1 = i <= 16;
    const indexInRow = isRow1 ? (i - 1) : (i - 17);
    const isWestBlock = indexInRow < 8;
    
    // West Block (8 plots) & East Block (8 plots) flanking Avenue 1 at x: 575
    const xOffset = isWestBlock
      ? 105 + indexInRow * 54
      : 645 + (indexInRow - 8) * 48;
    const plotWidth = isWestBlock ? 48 : 44;
    const yOffset = isRow1 ? 130 : 438;
    const height = 222;

    const isCorner = i === 1 || i === 8 || i === 9 || i === 16 || i === 17 || i === 24 || i === 25 || i === 32;
    const isPark = i >= 9 && i <= 14;
    const area = isCorner ? 2400 : (i % 3 === 0 ? 1800 : 1200);
    const dimensions = isCorner ? '40\' × 60\'' : (i % 3 === 0 ? '30\' × 60\'' : '30\' × 40\'');
    const price = area * baseRate;

    let status: Plot['status'] = 'AVAILABLE';
    if (i === 4 || i === 11 || i === 22) status = 'RESERVED';
    if (i === 2 || i === 7 || i === 15 || i === 28) status = 'SOLD';

    plots.push({
      id: `plot-ee-${i}`,
      projectId: 'proj-bengaluru-emerald-enclave',
      plotNumber: `EE-${i.toString().padStart(2, '0')}`,
      dimensions,
      areaSqFt: area,
      facing: isRow1 ? 'South' : 'North',
      price,
      pricePerSqFt: baseRate,
      status,
      cornerPlot: isCorner,
      parkFacing: isPark,
      roadWidthFt: 40,
      phase: isRow1 ? 'Aerospace Block' : 'Nandi View Block',
      geometry: {
        x: xOffset,
        y: yOffset,
        width: plotWidth,
        height
      }
    });
  }

  return plots;
}

// Each project receives its own parcel geometry and masterplan treatment.
export function generateGenericPlots(projectId: string, count: number, baseRate: number): Plot[] {
  return generateProjectPlots(projectId, count, baseRate);
}

// Combined default plots across all projects
export const DEFAULT_PLOTS: Plot[] = [
  ...generateParkAvenuePlots(),
  ...generateEmeraldEnclavePlots(),
  ...generateGenericPlots('proj-chennai-coastal-palms', 26, 4200),
  ...generateGenericPlots('proj-chennai-cyber-crest', 35, 3600),
  ...generateGenericPlots('proj-chennai-royal-orchards', 40, 2450),
  ...generateGenericPlots('proj-bengaluru-silicon-meadows', 30, 4100),
  ...generateGenericPlots('proj-bengaluru-green-valley', 25, 3800),
  ...generateGenericPlots('proj-hyderabad-greenfield-serenade', 28, 3850),
  ...generateGenericPlots('proj-hyderabad-aero-city', 28, 3200),
  ...generateGenericPlots('proj-hyderabad-cyber-hills', 32, 4500),
  ...generateGenericPlots('proj-coimbatore-whispering-palms', 24, 2950),
  ...generateGenericPlots('proj-coimbatore-kovaipudur-breeze', 20, 2600),
  ...generateGenericPlots('proj-madurai-meenakshi-pride', 22, 2100),
  ...generateGenericPlots('proj-trichy-cauvery-grand', 24, 2250),
  ...generateGenericPlots('proj-salem-yercaud-foothills', 20, 1950),
  ...generateGenericPlots('proj-mysuru-chamundi-crest', 20, 3100),
  ...generateGenericPlots('proj-mysuru-heritage-woods', 22, 2900)
];

export const FREQUENT_QUESTIONS = [
  {
    question: 'What is the legal difference between DTCP, CMDA, and RERA approval in India?',
    answer: 'DTCP (Directorate of Town and Country Planning) approves layouts outside metropolitan planning limits (like Greater Chennai), while CMDA (Chennai Metropolitan Development Authority) governs Chennai city boundaries. RERA (Real Estate Regulatory Authority) is a statutory consumer-protection mandate ensuring advertised amenities, open-space reservations (OSR), and project delivery deadlines are legally enforceable. On Navanext, every plotted development explicitly showcases its layout sanction number and approval credentials.'
  },
  {
    question: 'How does the Complimentary Chauffeur Site Visit work?',
    answer: 'Navanext provides 100% free, private chauffeur-driven AC cab pickup and return for customers and families inspecting our plotted communities. You choose your pickup point (home address, airport, or railway station) and preferred time slot. Our team coordinates directly with the project operator to ensure your cab arrives on time, with zero fare or payment checkout required.'
  },
  {
    question: 'Can I obtain a bank housing or composite plot loan for these plots?',
    answer: 'Yes! Approved residential layouts from CMDA, DTCP, BIAAPA, and HMDA are eligible for plot purchase loans and composite loans (Plot + Construction) from major nationalized and private Indian banks (SBI, HDFC, ICICI, Bank of Baroda). Typically banks finance up to 70% to 80% of the plot guideline value with tenures up to 20–30 years.'
  },
  {
    question: 'What documents should I verify before purchasing a residential plot in India?',
    answer: 'Essential legal documents include: 1) Mother Deed and Parent Documents tracing 30-year chain of title, 2) Patta / Khata in the seller’s name, 3) DTCP/CMDA/HMDA Approved Layout Plan with individual plot sanction, 4) Encumbrance Certificate (EC) for minimum 30 years reflecting zero liabilities, 5) OSR (Open Space Reservation) gift deed to local Panchayat/Corporation for roads and parks.'
  },
  {
    question: 'Are there any hidden costs or brokerage fees when booking through Navanext?',
    answer: 'Zero brokerage! Navanext charges 0% commission to homebuyers. The plot prices displayed reflect the direct developer rates. Standard statutory government registration charges (stamp duty and registration fee) are calculated transparently in our EMI simulator.'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 't-1',
    customerName: 'Karthik & Deepa Sundaram',
    location: 'Chennai (IT Architect)',
    projectName: 'Park Avenue, Guduvanchery',
    quote: 'The interactive SVG layout changed everything for us. Being able to see the exact plot dimensions, the 40ft road width, and reserve Plot #18 online before visiting gave us complete peace of mind. The free cab pickup was punctual and courteous.',
    rating: 5,
    tag: 'Demo Customer Experience'
  },
  {
    id: 't-2',
    customerName: 'Anand Vardhan Rao',
    location: 'Bengaluru (Senior Director)',
    projectName: 'Emerald Enclave, Devanahalli',
    quote: 'Finding legally clear BIAAPA approved plots near the airport was a nightmare until I found Navanext. The EMI breakdown and transparent price per square foot helped me plan my finances down to the rupee.',
    rating: 5,
    tag: 'Demo Customer Experience'
  },
  {
    id: 't-3',
    customerName: 'Senthil Nathan & Meenakshi',
    location: 'Coimbatore (Industrialist)',
    projectName: 'Whispering Palms, Saravanampatti',
    quote: 'We loved the side-by-side plot comparison tool. We compared East-facing Plot #06 with Corner Plot #12 and finalized our dream retirement villa site without any pushy broker calls.',
    rating: 5,
    tag: 'Demo Customer Experience'
  }
];
