import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import ProfitEstimation from './pages/ProfitEstimation';
import Weather from './pages/Weather';
import Market from './pages/Market';
import TransportCalculation from './pages/TransportCalculation';
import MarketRecommendations from './pages/MarketRecommendations';
import ProductManagement from './pages/ProductManagement';
import CropManagement from './pages/CropManagement';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Services from './pages/Services';
import { AuthProvider, useAuth } from './context/AuthContext';
import VerifyEmail from './pages/VerifyEmail';
import PriceHistory from './pages/PriceHistory';
import axios from 'axios';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

const ProtectedVerifiedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  console.log(user);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  if (user && user.is_verified === false) {
    return <Navigate to="/verify-email-prompt" />;
  }
  return <>{children}</>;
};

function VerifyEmailPrompt() {
  const { user } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const resendVerification = async () => {
    if (!user?.email) return;
    setLoading(true);
    setMessage(null);
    try {
      await axios.post('http://127.0.0.1:8000/api/resend-verification/', { email: user.email });
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err) {
      setMessage('Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-xl font-semibold text-orange-600">
      <div className="mb-6">Please verify your email to access this feature.</div>
      {message && <div className="mb-4 text-green-700 text-base font-medium">{message}</div>}
      <div className="flex space-x-4">
        <button
          onClick={resendVerification}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium disabled:opacity-50"
        >
          {loading ? 'Resending...' : 'Resend Verification Link'}
        </button>
        <a href="/" className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium">Back to Homepage</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email/:uid/:token" element={<VerifyEmail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profit-estimation" element={
            <ProtectedVerifiedRoute>
              <ProfitEstimation />
            </ProtectedVerifiedRoute>
          } />
          <Route path="/weather" element={<Weather />} />
          <Route path="/market" element={<Market />} />
          <Route path="/transport-calculation" element={<TransportCalculation />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="crops" element={<CropManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="market-recommendations" element={<MarketRecommendations />} />
            <Route path="product-management" element={<ProductManagement />} />
            
          </Route>
          <Route path="/price-history" element={
            <ProtectedVerifiedRoute>
              <PriceHistory />
            </ProtectedVerifiedRoute>
          } />
          <Route path="/verify-email-prompt" element={<VerifyEmailPrompt />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;