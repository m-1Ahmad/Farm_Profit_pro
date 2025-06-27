import React from 'react';

function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

      {/* Yield Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Yield Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Current Season</p>
            <p className="text-2xl font-bold">4.8 tons/acre</p>
            <p className="text-sm text-green-600">+12% vs last season</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Projected Yield</p>
            <p className="text-2xl font-bold">5.2 tons/acre</p>
            <p className="text-sm text-green-600">+8% growth</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Industry Average</p>
            <p className="text-2xl font-bold">4.3 tons/acre</p>
            <p className="text-sm text-gray-600">Regional benchmark</p>
          </div>
        </div>
      </div>

      {/* Resource Efficiency */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Resource Efficiency</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Water Usage</span>
              <span className="text-sm text-green-600">92% efficiency</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Fertilizer Utilization</span>
              <span className="text-sm text-green-600">88% efficiency</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Labor Productivity</span>
              <span className="text-sm text-green-600">95% efficiency</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Cost Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-600">Labor</p>
            <p className="text-xl font-bold">$24,500</p>
            <p className="text-sm text-red-600">+5% vs budget</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-600">Equipment</p>
            <p className="text-xl font-bold">$38,750</p>
            <p className="text-sm text-green-600">-3% vs budget</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-600">Supplies</p>
            <p className="text-xl font-bold">$15,200</p>
            <p className="text-sm text-gray-600">On budget</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-600">Utilities</p>
            <p className="text-xl font-bold">$8,900</p>
            <p className="text-sm text-green-600">-8% vs budget</p>
          </div>
        </div>
      </div>

      {/* Weather Impact */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weather Impact Analysis</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="font-medium">Rainfall Effect</p>
              <p className="text-sm text-gray-600">15% above average - Positive impact on yield</p>
            </div>
            <span className="text-green-600">+8% yield</span>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="font-medium">Temperature Variation</p>
              <p className="text-sm text-gray-600">2°C higher than optimal - Minor stress on crops</p>
            </div>
            <span className="text-red-600">-3% yield</span>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="font-medium">Soil Moisture</p>
              <p className="text-sm text-gray-600">Optimal levels maintained</p>
            </div>
            <span className="text-green-600">+5% yield</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;