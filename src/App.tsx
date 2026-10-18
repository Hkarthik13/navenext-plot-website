import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { FloatingConcierge } from './components/common/FloatingConcierge';

// Pages
import { Home } from './pages/Home';
import { ExploreProjects } from './pages/ExploreProjects';
import { CityDiscovery } from './pages/CityDiscovery';
import { ProjectDetails } from './pages/ProjectDetails';
import { EmiCalculatorPage } from './pages/EmiCalculatorPage';
import { SiteVisitBookingPage } from './pages/SiteVisitBookingPage';
import { SavedPlotsPage } from './pages/SavedPlotsPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContactPage } from './pages/ContactPage';

// Animated Route Container with Silky Transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-transition flex-1 flex flex-col">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreProjects />} />
        <Route path="/cities" element={<CityDiscovery />} />
        <Route path="/cities/:citySlug" element={<CityDiscovery />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetails />} />
        <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
        <Route path="/site-visit" element={<SiteVisitBookingPage />} />
        <Route path="/my-saved-plots" element={<SavedPlotsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c2421]">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>
          <Footer />
          <FloatingConcierge />
          <ToastContainer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
