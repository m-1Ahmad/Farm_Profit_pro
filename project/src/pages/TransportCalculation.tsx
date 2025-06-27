import React, { useState } from 'react';
import { Truck, MapPin, Clock, DollarSign } from 'lucide-react';

function TransportCalculation() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    transportType: 'truck'
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTransport = () => {
    // Simple calculation logic
    const baseRate = formData.transportType === 'truck' ? 50 : 30;
    const weightMultiplier = parseFloat(formData.weight) || 0;
    const distanceMultiplier = 1.5; // Assuming average distance
    
    const totalCost = baseRate * weightMultiplier * distanceMultiplier;
    
    setResult({
      cost: totalCost,
      duration: formData.transportType === 'truck' ? '2-4 hours' : '6-8 hours',
      distance: '150 km' // Mock distance
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Transport Calculation</h1>
          <p className="text-lg text-gray-600">Calculate transportation costs for your agricultural products</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Transport Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter pickup location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter delivery location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (tons)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter weight in tons"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Truck className="inline h-4 w-4 mr-1" />
                  Transport Type
                </label>
                <select
                  name="transportType"
                  value={formData.transportType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="truck">Truck</option>
                  <option value="rail">Rail</option>
                  <option value="ship">Ship</option>
                </select>
              </div>

              <button
                onClick={calculateTransport}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium"
              >
                Calculate Transport Cost
              </button>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Calculation Results</h2>
              
              {result ? (
                <div className="space-y-4">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center mb-4">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm text-green-600">Total Cost</p>
                        <p className="text-3xl font-bold text-green-900">PKR {result.cost.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                        <div className="ml-3">
                          <p className="text-sm text-blue-600">Duration</p>
                          <p className="text-lg font-semibold text-blue-900">{result.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center">
                        <MapPin className="h-6 w-6 text-purple-600" />
                        <div className="ml-3">
                          <p className="text-sm text-purple-600">Distance</p>
                          <p className="text-lg font-semibold text-purple-900">{result.distance}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Cost Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Rate:</span>
                        <span className="text-gray-900">PKR {(result.cost * 0.4).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight Charges:</span>
                        <span className="text-gray-900">PKR {(result.cost * 0.4).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance Charges:</span>
                        <span className="text-gray-900">PKR {(result.cost * 0.2).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-green-600">PKR {result.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fill in the transport details to calculate costs</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transport Options */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Transport Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <Truck className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Road Transport</h3>
              <p className="text-gray-600 text-sm mb-4">Fast and flexible delivery for short to medium distances</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Door-to-door service</li>
                <li>• 2-4 hours delivery</li>
                <li>• Up to 25 tons capacity</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">RAIL</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rail Transport</h3>
              <p className="text-gray-600 text-sm mb-4">Cost-effective for large quantities and long distances</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bulk transportation</li>
                <li>• 6-8 hours delivery</li>
                <li>• Up to 100 tons capacity</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">SHIP</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sea Transport</h3>
              <p className="text-gray-600 text-sm mb-4">Most economical for international shipping</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• International delivery</li>
                <li>• 2-4 weeks delivery</li>
                <li>• Unlimited capacity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransportCalculation;