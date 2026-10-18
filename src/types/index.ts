export type PlotStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export type PlotFacing = 
  | 'North' 
  | 'South' 
  | 'East' 
  | 'West' 
  | 'North-East' 
  | 'North-West' 
  | 'South-East' 
  | 'South-West';

export interface PlotGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
  points?: string; // Optional polygon points if non-rectangular
}

export interface Plot {
  id: string;
  projectId: string;
  plotNumber: string;
  dimensions: string; // e.g. "30' × 40'"
  areaSqFt: number;
  facing: PlotFacing;
  price: number; // in INR
  pricePerSqFt: number;
  status: PlotStatus;
  geometry: PlotGeometry;
  cornerPlot: boolean;
  parkFacing: boolean;
  roadWidthFt: number;
  notes?: string;
  phase?: string;
}

export interface DeveloperInfo {
  name: string;
  experienceYears: number;
  totalProjects: number;
  completedProjects?: number;
  headquarters: string;
  description: string;
}

export interface ProjectAmenity {
  name: string;
  iconName: string;
  description: string;
}

export interface LandmarkDistance {
  name: string;
  distance: string;
  category: 'transit' | 'education' | 'tech' | 'health' | 'leisure';
}

export interface LayoutConfig {
  viewBox: string;
  width: number;
  height: number;
  roads: {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    isVertical?: boolean;
  }[];
  greenSpaces: {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  }[];
  facilities: {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  }[];
  gate: {
    x: number;
    y: number;
    label: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  locality: string;
  cityId: string;
  cityName: string;
  state: string;
  heroImage: string;
  galleryImages: string[];
  priceRangeText: string;
  minPrice: number;
  maxPrice: number;
  totalAreaAcres: number;
  totalPlots: number;
  approvalAuthority: string; // e.g. "DTCP Approved (Demo)"
  approvalNumber: string;
  verificationBadge: string;
  description: string;
  roadConnectivity: string[];
  developer: DeveloperInfo;
  amenities: ProjectAmenity[];
  landmarks: LandmarkDistance[];
  coordinates: [number, number]; // [lat, lng]
  layoutConfig: LayoutConfig;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  coordinates: [number, number];
  featured: boolean;
  avgPricePerSqFt: number;
  priceRange: string;
  activeProjectsCount: number;
  keyGrowthCorridors: string[];
}

export interface SiteVisitBooking {
  id: string;
  bookingReference: string;
  projectId: string;
  projectName: string;
  city: string;
  plotId?: string;
  plotNumber?: string;
  pickupLocation: string;
  dropLocation: string;
  visitDate: string;
  timeSlot: string;
  passengerCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface LeadEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectId: string;
  projectName: string;
  plotNumber?: string;
  type: 'plot_inquiry' | 'general' | 'finance';
  message: string;
  createdAt: string;
}

export interface AmortizationMonth {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}
