import React from 'react';

function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      {/* Financial Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Financial Reports</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Q4 2024 Financial Summary</p>
              <p className="text-sm text-gray-600">Generated on March 1, 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">Download PDF</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Annual Revenue Report 2024</p>
              <p className="text-sm text-gray-600">Generated on January 15, 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">Download PDF</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Q3 2024 Expense Analysis</p>
              <p className="text-sm text-gray-600">Generated on December 1, 2024</p>
            </div>
            <button className="text-green-600 hover:text-green-700">Download PDF</button>
          </div>
        </div>
      </div>

      {/* Crop Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Crop Reports</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Corn Yield Report - Field A</p>
              <p className="text-sm text-gray-600">Last updated: March 15, 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">View Report</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Soybean Growth Analysis</p>
              <p className="text-sm text-gray-600">Last updated: March 10, 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">View Report</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Wheat Disease Monitoring</p>
              <p className="text-sm text-gray-600">Last updated: March 5, 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">View Report</button>
          </div>
        </div>
      </div>

      {/* Resource Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Resource Management Reports</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Water Usage Report</p>
              <p className="text-sm text-gray-600">March 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">Download CSV</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Fertilizer Application Log</p>
              <p className="text-sm text-gray-600">Q1 2025</p>
            </div>
            <button className="text-green-600 hover:text-green-700">Download CSV</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-medium">Equipment Maintenance Schedule</p>
              <p className="text-sm text-gray-600">Updated Weekly</p>
            </div>
            <button className="text-green-600 hover:text-green-700">Download CSV</button>
          </div>
        </div>
      </div>

      {/* Custom Report Generator */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Custom Report Generator</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Financial Report</option>
                <option>Crop Analysis</option>
                <option>Resource Usage</option>
                <option>Weather Impact</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;