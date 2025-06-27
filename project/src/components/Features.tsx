import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Calculator, Cloud } from 'lucide-react';

function Features() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Price History Card (was Market) */}
          <Link to="/price-history" className="block">
            <div className="bg-green-600 p-8 rounded-lg text-white hover:bg-green-700 transition-colors cursor-pointer shadow-lg">
              <div className="flex justify-center mb-4">
                <BarChart3 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Price History</h3>
              <p className="text-center text-green-100 mb-6">
                Explore historical crop prices by crop, type, market, city, month, and year. Make informed decisions with real data.
              </p>
              <div className="text-center">
                <span className="inline-block bg-white text-green-600 px-4 py-2 rounded-md font-medium">
                  Price History →
                </span>
              </div>
            </div>
          </Link>

          {/* Calculate Profit Card */}
          <Link to="/profit-estimation" className="block">
            <div className="bg-green-600 p-8 rounded-lg text-white hover:bg-green-700 transition-colors cursor-pointer shadow-lg">
              <div className="flex justify-center mb-4">
                <Calculator className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Calculate Profit</h3>
              <p className="text-center text-green-100 mb-6">
              Access historical market prices and input your crop details to estimate profit. Make data-driven decisions to sell your harvest.
              </p>
              <div className="text-center">
                <span className="inline-block bg-white text-green-600 px-4 py-2 rounded-md font-medium">
                  Profit →
                </span>
              </div>
            </div>
          </Link>

          {/* Weather Card */}
          <Link to="/weather" className="block">
            <div className="bg-green-600 p-8 rounded-lg text-white hover:bg-green-700 transition-colors cursor-pointer shadow-lg">
              <div className="flex justify-center mb-4">
                <Cloud className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Weather</h3>
              <p className="text-center text-green-100 mb-6">
                Get accurate weather updates to plan your farming activities. Check temperature, rainfall, and forecasts.
              </p>
              <div className="text-center">
                <span className="inline-block bg-white text-green-600 px-4 py-2 rounded-md font-medium">
                  Weather →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Features;