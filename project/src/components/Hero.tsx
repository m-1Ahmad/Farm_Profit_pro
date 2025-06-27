import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Hero() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="relative mb-16">
      <div className="absolute inset-0">
        <img
          className="w-full h-[600px] object-cover"
          src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg"
          alt="Tractor in field"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Farmer to People
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
            Helping farmers maximize profits through Historical data, personalized recommendations, making market decisions, and weather forecasts for smarter decisions and improved agricultural efficiency.
          </p>
          
          <div className="mt-10">
            {!isAuthenticated ? (
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/profit-estimation"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Profit Estimation
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;