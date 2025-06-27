import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-green-700 text-white py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="/logo.jpg" alt="Farm Profit Pro Logo" className="h-8 w-8 object-contain bg-white rounded-full" />
            <span className="ml-2 text-xl font-bold">Farm Profit Pro</span>
          </div>
          <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            {!isAuthenticated && (
              <Link to="/signup" className="text-white hover:text-green-200 transition-colors">Get Started</Link>
            )}
            <Link to="/services" className="text-white hover:text-green-200 transition-colors">Our Services</Link>
            <Link to="/contact" className="text-white hover:text-green-200 transition-colors">Contact Us</Link>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="https://www.facebook.com/profile.php?id=61577951755605" className="text-white hover:text-green-200 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/farmprofitpro/" className="text-white hover:text-green-200 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://x.com/FarmProfitPro" className="text-white hover:text-green-200 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/farm-profit-pro-614b8a371/?trk=opento_sprofile_pfeditor" className="text-white hover:text-green-200 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="border-t border-green-600 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <p className="text-green-200">&copy; 2025 Farm Profit Pro. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-green-200 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-green-200 hover:text-white transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;