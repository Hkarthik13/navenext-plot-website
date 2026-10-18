import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plot, Project, City, SiteVisitBooking, LeadEnquiry, PlotStatus } from '../types';
import { CITIES, PROJECTS, DEFAULT_PLOTS } from '../data/mockData';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  cities: City[];
  projects: Project[];
  plots: Plot[];
  savedPlotIds: string[];
  savedProjectIds: string[];
  comparisonPlotIds: string[];
  bookings: SiteVisitBooking[];
  enquiries: LeadEnquiry[];
  toasts: ToastMessage[];
  // Actions
  toggleSavePlot: (plotId: string) => void;
  isPlotSaved: (plotId: string) => boolean;
  toggleSaveProject: (projectId: string) => void;
  isProjectSaved: (projectId: string) => boolean;
  toggleComparisonPlot: (plotId: string) => void;
  isPlotInComparison: (plotId: string) => boolean;
  clearComparison: () => void;
  updatePlotStatus: (plotId: string, status: PlotStatus) => void;
  createSiteVisitBooking: (bookingData: Omit<SiteVisitBooking, 'id' | 'bookingReference' | 'createdAt' | 'status'>) => SiteVisitBooking;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: SiteVisitBooking['status']) => void;
  submitEnquiry: (enquiryData: Omit<LeadEnquiry, 'id' | 'createdAt'>) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  resetAllDemoData: () => void;
  getProjectById: (id: string) => Project | undefined;
  getProjectBySlug: (slug: string) => Project | undefined;
  getCityBySlug: (slug: string) => City | undefined;
  getPlotsForProject: (projectId: string) => Plot[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PLOTS: 'terravista_plots_v6',
  SAVED_PLOTS: 'terravista_saved_plots_v1',
  SAVED_PROJECTS: 'terravista_saved_projects_v1',
  BOOKINGS: 'terravista_bookings_v1',
  ENQUIRIES: 'terravista_enquiries_v1',
  COMPARISONS: 'terravista_comparisons_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Plots with persistent local state: Always use code geometry, merge saved statuses
  const [plots, setPlots] = useState<Plot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLOTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const statusMap = new Map<string, PlotStatus>();
          parsed.forEach((p: any) => {
            if (p && p.id && p.status) statusMap.set(p.id, p.status);
          });
          return DEFAULT_PLOTS.map(p => ({
            ...p,
            status: statusMap.get(p.id) || p.status
          }));
        }
      }
    } catch (e) {
      console.error('Failed to load plots from local storage', e);
    }
    return DEFAULT_PLOTS;
  });

  // Saved Plots
  const [savedPlotIds, setSavedPlotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PLOTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['plot-pa-1', 'plot-pa-15']; // Default saved demo plots
  });

  // Saved Projects
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['proj-chennai-park-avenue'];
  });

  // Comparison Plots (max 4)
  const [comparisonPlotIds, setComparisonPlotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARISONS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Bookings
  const [bookings, setBookings] = useState<SiteVisitBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'book-sample-1',
        bookingReference: 'TV-CAB-2026-7842',
        projectId: 'proj-chennai-park-avenue',
        projectName: 'Park Avenue Plotted Enclave',
        city: 'Chennai',
        plotId: 'plot-pa-18',
        plotNumber: '18',
        pickupLocation: 'Tambaram Railway Station West Gate',
        dropLocation: 'Tambaram Railway Station West Gate',
        visitDate: '2026-10-24',
        timeSlot: 'Morning 10:00 AM',
        passengerCount: 3,
        customerName: 'Srinivasan Ramanathan',
        customerPhone: '+91 98401 23456',
        customerEmail: 'srinivasan.r@example.com',
        notes: 'Interested in corner plot with east facing. Traveling with parents.',
        status: 'Requested',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<LeadEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'enq-sample-1',
        name: 'Meera Krishnan',
        phone: '+91 99400 87654',
        email: 'meera.k@example.com',
        projectId: 'proj-bengaluru-emerald-enclave',
        projectName: 'Emerald Enclave Masterplan',
        plotNumber: 'EE-05',
        type: 'plot_inquiry',
        message: 'Looking for 1500 sq.ft plot with bank loan assistance.',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(plots));
    } catch {}
  }, [plots]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_PLOTS, JSON.stringify(savedPlotIds));
    } catch {}
  }, [savedPlotIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_PROJECTS, JSON.stringify(savedProjectIds));
    } catch {}
  }, [savedProjectIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(comparisonPlotIds));
    } catch {}
  }, [comparisonPlotIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch {}
  }, [enquiries]);

  // Toast Helpers
  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Save Plot
  const toggleSavePlot = (plotId: string) => {
    setSavedPlotIds((prev) => {
      const exists = prev.includes(plotId);
      if (exists) {
        showToast('Plot removed from saved wishlist', 'info');
        return prev.filter((id) => id !== plotId);
      } else {
        showToast('Plot added to saved wishlist!', 'success');
        return [...prev, plotId];
      }
    });
  };

  const isPlotSaved = (plotId: string) => savedPlotIds.includes(plotId);

  // Toggle Save Project
  const toggleSaveProject = (projectId: string) => {
    setSavedProjectIds((prev) => {
      const exists = prev.includes(projectId);
      if (exists) {
        showToast('Project removed from saved list', 'info');
        return prev.filter((id) => id !== projectId);
      } else {
        showToast('Project saved to your list!', 'success');
        return [...prev, projectId];
      }
    });
  };

  const isProjectSaved = (projectId: string) => savedProjectIds.includes(projectId);

  // Comparison
  const toggleComparisonPlot = (plotId: string) => {
    setComparisonPlotIds((prev) => {
      if (prev.includes(plotId)) {
        showToast('Plot removed from comparison', 'info');
        return prev.filter((id) => id !== plotId);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 plots at a time', 'warning');
        return prev;
      }
      showToast('Plot added to comparison tray', 'success');
      return [...prev, plotId];
    });
  };

  const isPlotInComparison = (plotId: string) => comparisonPlotIds.includes(plotId);
  const clearComparison = () => {
    setComparisonPlotIds([]);
    showToast('Comparison tray cleared', 'info');
  };

  // Update Plot Status (Admin / Interactive)
  const updatePlotStatus = (plotId: string, status: PlotStatus) => {
    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, status } : p))
    );
    showToast(`Plot status updated to ${status}`, 'success');
  };

  // Create Site Visit Booking
  const createSiteVisitBooking = (
    bookingData: Omit<SiteVisitBooking, 'id' | 'bookingReference' | 'createdAt' | 'status'>
  ): SiteVisitBooking => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: SiteVisitBooking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      bookingReference: `TV-CAB-2026-${randomCode}`,
      status: 'Requested',
      createdAt: new Date().toISOString()
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast('Free site visit cab request registered successfully!', 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Site visit booking request has been cancelled', 'info');
  };

  const updateBookingStatus = (bookingId: string, status: SiteVisitBooking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    showToast(`Booking updated to ${status}`, 'success');
  };

  // Submit Enquiry
  const submitEnquiry = (enquiryData: Omit<LeadEnquiry, 'id' | 'createdAt'>) => {
    const newEnquiry: LeadEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast('Thank you! Your enquiry has been received.', 'success');
  };

  // Reset Demo Data
  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.PLOTS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PLOTS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.COMPARISONS);

    setPlots(DEFAULT_PLOTS);
    setSavedPlotIds(['plot-pa-1', 'plot-pa-15']);
    setSavedProjectIds(['proj-chennai-park-avenue']);
    setComparisonPlotIds([]);
    setBookings([]);
    setEnquiries([]);
    showToast('All demo inventory and bookings reset to defaults!', 'info');
  };

  // Selectors
  const getProjectById = (id: string) => PROJECTS.find((p) => p.id === id);
  const getProjectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
  const getCityBySlug = (slug: string) => CITIES.find((c) => c.slug === slug);
  const getPlotsForProject = (projectId: string) =>
    plots.filter((p) => p.projectId === projectId);

  return (
    <AppContext.Provider
      value={{
        cities: CITIES,
        projects: PROJECTS,
        plots,
        savedPlotIds,
        savedProjectIds,
        comparisonPlotIds,
        bookings,
        enquiries,
        toasts,
        toggleSavePlot,
        isPlotSaved,
        toggleSaveProject,
        isProjectSaved,
        toggleComparisonPlot,
        isPlotInComparison,
        clearComparison,
        updatePlotStatus,
        createSiteVisitBooking,
        cancelBooking,
        updateBookingStatus,
        submitEnquiry,
        showToast,
        removeToast,
        resetAllDemoData,
        getProjectById,
        getProjectBySlug,
        getCityBySlug,
        getPlotsForProject
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
