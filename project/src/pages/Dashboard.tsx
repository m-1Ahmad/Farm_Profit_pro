import React from 'react';
import { DollarSign, Tractor, TrendingUp } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">$124,592</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <Tractor className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Active Crops</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-600">Across 142 acres</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold">32.8%</p>
              <p className="text-sm text-green-600">+2.3% from last season</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Performance */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Crop Performance</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Corn</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Soybeans</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Wheat</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Harvest completed</p>
              <p className="text-sm text-gray-600">North Field</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Irrigation scheduled</p>
              <p className="text-sm text-gray-600">East Field</p>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Fertilizer applied</p>
              <p className="text-sm text-gray-600">West Field</p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;