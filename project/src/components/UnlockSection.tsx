import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function UnlockSection() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0">
        <img
          className="w-full h-[350px] object-cover"
          src="https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg"
          alt="Fresh vegetables"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Unlock Your Farming Potential Today
          </h2>
          <p className="text-lg text-white mb-8">
            Discover the power of smart farming with our cutting-edge tools that help you track profits, monitor weather, and optimize your agricultural operations.
          </p>
          {isAuthenticated ? (
            <Link to="/profit-estimation" className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium">
              Profit Estimation
            </Link>
          ) : (
            <Link to="/signup" className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium">
              Sign Up &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnlockSection;