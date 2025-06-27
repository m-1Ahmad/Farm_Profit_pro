import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

function MarketRecommendations() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Market Recommendations</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-green-600">Recommended</p>
              <p className="text-lg font-bold text-green-900">Sell Wheat</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-blue-600">Hold</p>
              <p className="text-lg font-bold text-blue-900">Soybeans</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-yellow-600">Monitor</p>
              <p className="text-lg font-bold text-yellow-900">Corn</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm text-red-600">Avoid</p>
              <p className="text-lg font-bold text-red-900">Rice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Market Analysis</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Wheat - Strong Sell Signal</h3>
                <p className="text-sm text-gray-600 mt-1">Current Price: $245.50/ton (+2.1%)</p>
                <p className="text-sm text-gray-600">Recommendation: Sell within next 7 days</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">High Confidence</span>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                Strong international demand and favorable weather conditions have pushed wheat prices to a 6-month high. 
                Market indicators suggest this peak may not sustain beyond next week due to increased supply from competing regions.
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Profit Potential:</span> +15-20% above average seasonal price
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Soybeans - Hold Position</h3>
                <p className="text-sm text-gray-600 mt-1">Current Price: $425.20/ton (+3.7%)</p>
                <p className="text-sm text-gray-600">Recommendation: Hold for 2-3 weeks</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Medium Confidence</span>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                Soybean prices are showing steady upward momentum. Export agreements and reduced global inventory suggest 
                continued price appreciation over the next month. Wait for optimal selling window.
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Projected Gain:</span> +8-12% in next 3 weeks
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Corn - Monitor Closely</h3>
                <p className="text-sm text-gray-600 mt-1">Current Price: $198.75/ton (-1.3%)</p>
                <p className="text-sm text-gray-600">Recommendation: Watch for trend reversal</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Low Confidence</span>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                Corn market showing mixed signals. Oversupply concerns are weighing on prices, but weather forecasts 
                suggest potential supply disruptions. Monitor daily for trend changes.
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Risk Level:</span> High volatility expected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Timing Calendar */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Optimal Selling Calendar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {[
            { day: 'Mon', date: '15', crops: ['Wheat'], status: 'optimal' },
            { day: 'Tue', date: '16', crops: ['Wheat'], status: 'optimal' },
            { day: 'Wed', date: '17', crops: ['Wheat'], status: 'good' },
            { day: 'Thu', date: '18', crops: [], status: 'neutral' },
            { day: 'Fri', date: '19', crops: [], status: 'neutral' },
            { day: 'Sat', date: '20', crops: ['Soybeans'], status: 'good' },
            { day: 'Sun', date: '21', crops: ['Soybeans'], status: 'optimal' },
          ].map((day, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              day.status === 'optimal' ? 'bg-green-50 border-green-200' :
              day.status === 'good' ? 'bg-blue-50 border-blue-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{day.day}</p>
                <p className="text-2xl font-bold text-gray-900">{day.date}</p>
                {day.crops.length > 0 && (
                  <div className="mt-2">
                    {day.crops.map((crop, cropIndex) => (
                      <span key={cropIndex} className={`inline-block px-2 py-1 text-xs rounded-full ${
                        day.status === 'optimal' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {crop}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketRecommendations;