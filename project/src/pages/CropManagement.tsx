import React from 'react';

function CropManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Crop Management</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Add New Crop
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Crop Card */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Corn</h3>
                <p className="text-sm text-gray-600">Field A - 50 acres</p>
              </div>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Planting Date:</span>
                <span className="text-gray-900">March 15, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expected Harvest:</span>
                <span className="text-gray-900">September 15, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Growth Stage:</span>
                <span className="text-gray-900">Vegetative</span>
              </div>
            </div>

            <div className="pt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100">
                Update Status
              </button>
            </div>
          </div>

          {/* Soybean Card */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Soybeans</h3>
                <p className="text-sm text-gray-600">Field B - 40 acres</p>
              </div>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Planting Date:</span>
                <span className="text-gray-900">April 1, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expected Harvest:</span>
                <span className="text-gray-900">October 1, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Growth Stage:</span>
                <span className="text-gray-900">Flowering</span>
              </div>
            </div>

            <div className="pt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100">
                Update Status
              </button>
            </div>
          </div>

          {/* Wheat Card */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Wheat</h3>
                <p className="text-sm text-gray-600">Field C - 35 acres</p>
              </div>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Planting Date:</span>
                <span className="text-gray-900">February 1, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expected Harvest:</span>
                <span className="text-gray-900">July 15, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Growth Stage:</span>
                <span className="text-gray-900">Heading</span>
              </div>
            </div>

            <div className="pt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100">
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropManagement;