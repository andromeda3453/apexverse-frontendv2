
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import IntegrationsPage from './pages/IntegrationsPage';
import EnterprisePage from './pages/EnterprisePage';
import DocsPage from './pages/DocsPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PricingPage from './pages/PricingPage';

import ApiKeys from './pages/ApiKeys';

// App Pages
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';
import CrawlsPage from './pages/CrawlsPage';
import Settings from './pages/Settings';

// Standalone
import Checkout from './pages/Checkout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  const { fetchUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
        <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/cookies" element={<LegalPage title="Cookie Policy" />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      <Route path="/forgot" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />

      {/* Protected App Routes with DashboardLayout */}
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="crawls" element={<CrawlsPage />} />
        <Route path="api-keys" element={<ApiKeys />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
