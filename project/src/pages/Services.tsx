import React from 'react';
import { Store, DollarSign, Cloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function Services() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering Pakistani farmers with cutting-edge technology and data-driven insights 
            to maximize profitability and make informed agricultural decisions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Service 1: Price History */}
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
                <Store className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-8xl font-bold text-gray-200">01</span>
            </div>
            
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Price History
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore historical crop prices by crop, type, market, city, month, and year. Make informed decisions with real data.
            </p>
          </div>

          {/* Service 2: Profitability Analysis */}
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-8xl font-bold text-gray-200">02</span>
            </div>
            
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Profitability Analysis
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Evaluate crop profitability by factoring in costs, market trends, and 
              transportation expenses.
            </p>
          </div>

          {/* Service 3: Weather */}
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
                <Cloud className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-8xl font-bold text-gray-200">03</span>
            </div>
            
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Weather
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Get accurate weather updates to plan your farming activities. Check temperature, rainfall, and forecasts.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-green-50 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Farming Business?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistani farmers who are already using Farm Profit Pro 
            to maximize their agricultural profits and make smarter decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
              >
                Get Started Today
              </a>
            )}
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Farm Profit Pro?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy to Use</h4>
              <p className="text-gray-600">Simple interface designed for farmers</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇵🇰</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Pakistan Focused</h4>
              <p className="text-gray-600">Built specifically for Pakistani markets</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Historical Data</h4>
              <p className="text-gray-600">Histoical Prices of crops upto 2019-2023</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Maximize Profits</h4>
              <p className="text-gray-600">Increase your farming profitability</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Services;