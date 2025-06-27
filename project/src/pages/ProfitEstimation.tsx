import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, Truck, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import Papa, { ParseResult } from 'papaparse';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface ProductRow {
  id: number;
  type: string;
  name: string;
  quantity: number;
  city: string;
  marketPrice: number;
  inputCost: number;
}

const CSV_PATH = '/final_crop_prices_trend_ready.csv';

function ProfitEstimation() {
  const { user } = useAuth();
  console.log(user);
  const [transportationData, setTransportationData] = useState({
    fromCity: 'Sahiwal',
    toMarket: 'Lahore Mandi',
    distance: 120,
    fuelCostPerKm: 8,
    laborCost: 2000,
    vehicleRent: 5000
  });

  const [showResults, setShowResults] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  // CSV data and dropdown states
  const [csvData, setCsvData] = useState<any[]>([]);
  const [crops, setCrops] = useState<string[]>([]);
  const [cropTypes, setCropTypes] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);

  // Selected values
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedCropType, setSelectedCropType] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');

  // Month/year logic
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const [month, setMonth] = useState(currentMonth.toString());
  const [year, setYear] = useState(currentYear.toString());
  const monthsRolling = Array.from({length: 13 - currentMonth}, (_, i) => (currentMonth + i).toString());

  // CSV loading
  useEffect(() => {
    Papa.parse(CSV_PATH, {
      download: true,
      header: true,
      complete: (results: ParseResult<any>) => {
        setCsvData(results.data);
        setCrops(Array.from(new Set(results.data.map((row: any) => row.crop).filter(Boolean))));
        setProvinces(Array.from(new Set(results.data.map((row: any) => row.province).filter(Boolean))));
      }
    });
  }, []);

  // CropType depends on Crop
  useEffect(() => {
    if (selectedCrop) {
      setCropTypes(Array.from(new Set(csvData.filter(row => row.crop === selectedCrop).map(row => row.crop_type).filter(Boolean))));
    } else {
      setCropTypes([]);
    }
    setSelectedCropType('');
  }, [selectedCrop, csvData]);

  // City depends on Province
  useEffect(() => {
    if (selectedProvince) {
      setCities(Array.from(new Set(csvData.filter(row => row.province === selectedProvince).map(row => row.city).filter(Boolean))));
    } else {
      setCities([]);
    }
    setSelectedCity('');
  }, [selectedProvince, csvData]);

  // Market depends on City
  useEffect(() => {
    if (selectedCity) {
      setMarkets(Array.from(new Set(csvData.filter(row => row.city === selectedCity).map(row => row.market).filter(Boolean))));
    } else {
      setMarkets([]);
    }
    setSelectedMarket('');
  }, [selectedCity, csvData]);

  const [products, setProducts] = useState<ProductRow[]>([
    {
      id: 1,
      type: 'Crop',
      name: '',
      quantity: 0,
      city: '',
      marketPrice: 0,
      inputCost: 0
    }
  ]);

  const updateProduct = (id: number, field: keyof ProductRow, value: any) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{ min_price: number, max_price: number } | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [currentMonthMax, setCurrentMonthMax] = useState<number | null>(null);
  const [nextMonthMax, setNextMonthMax] = useState<number | null>(null);

  const handlePredict = async () => {
    // Validate all required fields
    if (!selectedCrop || !selectedCropType || !selectedProvince || !selectedCity || !selectedMarket || !products[0]?.quantity) {
      setPredictionError('Please fill in all required fields.');
      return;
    }

    if (!user?.email) {
      setPredictionError('User email not found. Please log in again.');
      return;
    }

    setLoadingPrediction(true);
    setPredictionError(null);
    setPredictionResult(null);
    setCurrentMonthMax(null);
    setNextMonthMax(null);
    setSuggestion(null);
    try {
      // Predict for selected month (store in DB)
      const response = await axios.post('http://127.0.0.1:8000/api/predict/', {
        crop: selectedCrop,
        crop_type: selectedCropType,
        market: selectedMarket,
        city: selectedCity,
        province: selectedProvince,
        month,
        year,
        weightage: products[0]?.quantity,
        email: user.email,
        store: true
      });
      setPredictionResult(response.data);

      // Calculate next month/year
      let nextMonth = parseInt(month) + 1;
      let nextYear = parseInt(year);
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
      // Predict for next month (do not store in DB)
      const nextResponse = await axios.post('http://127.0.0.1:8000/api/predict/', {
        crop: selectedCrop,
        crop_type: selectedCropType,
        market: selectedMarket,
        city: selectedCity,
        province: selectedProvince,
        month: nextMonth.toString(),
        year: nextYear.toString(),
        weightage: products[0]?.quantity,
        email: user.email,
        store: false
      });
      setCurrentMonthMax(response.data.max_price);
      setNextMonthMax(nextResponse.data.max_price);
      if (response.data.max_price >= nextResponse.data.max_price) {
        setSuggestion('It is better to sell this month.');
      } else {
        setSuggestion('It is better to sell next month.');
      }
    } catch (err: any) {
      setPredictionError(err.response?.data?.error || 'Prediction failed.');
    } finally {
      setLoadingPrediction(false);
    }
  };

  const handleShowSuggestion = async () => {
    setShowSuggestionModal(true);
    setSuggestionLoading(true);
    setSuggestionError(null);
    setSuggestion(null);
    setCurrentMonthMax(null);
    setNextMonthMax(null);
    try {
      // Predict for selected month (do not store in DB)
      const response = await axios.post('http://127.0.0.1:8000/api/predict/', {
        crop: selectedCrop,
        crop_type: selectedCropType,
        market: selectedMarket,
        city: selectedCity,
        province: selectedProvince,
        month,
        year,
        weightage: products[0]?.quantity,
        email: user.email,
        store: false
      });
      // Calculate next month/year
      let nextMonth = parseInt(month) + 1;
      let nextYear = parseInt(year);
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
      // Predict for next month (do not store in DB)
      const nextResponse = await axios.post('http://127.0.0.1:8000/api/predict/', {
        crop: selectedCrop,
        crop_type: selectedCropType,
        market: selectedMarket,
        city: selectedCity,
        province: selectedProvince,
        month: nextMonth.toString(),
        year: nextYear.toString(),
        weightage: products[0]?.quantity,
        email: user.email,
        store: false
      });
      setCurrentMonthMax(response.data.max_price);
      setNextMonthMax(nextResponse.data.max_price);
      if (response.data.max_price >= nextResponse.data.max_price) {
        setSuggestion('It is better to sell this month.');
      } else {
        setSuggestion('It is better to sell next month.');
      }
    } catch (err: any) {
      setSuggestionError(err.response?.data?.error || 'Suggestion failed.');
    } finally {
      setSuggestionLoading(false);
    }
  };


  const calculateTransportationCost = () => {
    const totalWeight = products.reduce((sum, product) => sum + product.quantity, 0);
    const fuelCost = transportationData.distance * transportationData.fuelCostPerKm;
    const totalTransportCost = fuelCost + transportationData.laborCost + transportationData.vehicleRent;
    const costPerKg = totalTransportCost / totalWeight;
    
    return {
      totalCost: totalTransportCost,
      costPerKg: costPerKg,
      fuelCost: fuelCost
    };
  };

  const calculateTotalProfit = () => {
    const transportCost = calculateTransportationCost();
    
    return products.map(product => {
      const revenue = product.quantity * product.marketPrice;
      const inputCosts = product.quantity * product.inputCost;
      const transportCostForProduct = product.quantity * transportCost.costPerKg;
      const totalCosts = inputCosts + transportCostForProduct;
      const profit = revenue - totalCosts;
      const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
      
      return {
        ...product,
        revenue,
        inputCosts,
        transportCost: transportCostForProduct,
        totalCosts,
        profit,
        profitMargin
      };
    });
  };

  const profitResults = showResults ? calculateTotalProfit() : [];
  const totalRevenue = profitResults.reduce((sum, result) => sum + result.revenue, 0);
  const totalCosts = profitResults.reduce((sum, result) => sum + result.totalCosts, 0);
  const totalProfit = totalRevenue - totalCosts;

  const navigate = useNavigate();

  // Pie chart data
  const pieData = predictionResult ? [
    { name: 'Transportation', value: Number((predictionResult.max_price * 0.2345).toFixed(2)) },
    { name: 'Labor', value: Number((predictionResult.max_price * 0.1235).toFixed(2)) },
    { name: 'Other Costs', value: Number((predictionResult.max_price * 0.082).toFixed(2)) },
    { name: 'Net Profit', value: Number((predictionResult.max_price * (1 - 0.2345 - 0.1235 - 0.082)).toFixed(2)) },
  ] : [];
  const pieColors = ['#34d399', '#fbbf24', '#f87171', '#60a5fa'];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium"
        >
          &larr; Back
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product management</h1>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Province</label>
                <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option value="">Select Province</option>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">City</label>
                <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="w-full border rounded px-3 py-2" disabled={!selectedProvince}>
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Market</label>
                <select value={selectedMarket} onChange={e => setSelectedMarket(e.target.value)} className="w-full border rounded px-3 py-2" disabled={!selectedCity}>
                  <option value="">Select Market</option>
                  {markets.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Crop</label>
                <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option value="">Select Crop</option>
                  {crops.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Crop Type</label>
                <select value={selectedCropType} onChange={e => setSelectedCropType(e.target.value)} className="w-full border rounded px-3 py-2" disabled={!selectedCrop}>
                  <option value="">Select Crop Type</option>
                  {cropTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Month</label>
                <select value={month} onChange={e => setMonth(e.target.value)} className="w-full border rounded px-3 py-2">
                  {monthsRolling.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Year</label>
                <select value={year} onChange={e => setYear(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option value={currentYear}>{currentYear}</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Weightage (kg)</label>
                <input type="number" min="1" value={products[0]?.quantity || ''} onChange={e => updateProduct(products[0].id, 'quantity', parseInt(e.target.value) || 0)} className="w-full border rounded px-3 py-2" placeholder="Enter weightage" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          <button
            onClick={handlePredict}
            className="bg-green-600 text-white px-12 py-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-lg font-semibold flex items-center"
          >
            <Calculator className="h-5 w-5 mr-3" />
            {loadingPrediction ? 'Predicting...' : 'Profit estimation'}
          </button>
          
          <button
            onClick={handleShowSuggestion}
            className="bg-blue-600 text-white px-12 py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-semibold flex items-center"
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Want Suggestion?
          </button>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8">

            {/* Detailed Profit Analysis */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Detailed Profit Analysis</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Input Costs</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Transport Cost</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Total Costs</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Profit</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {profitResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{result.name}</div>
                          <div className="text-sm text-gray-500">{result.quantity} kg from {result.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs {result.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs {result.inputCosts.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs {result.transportCost.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs {result.totalCosts.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Rs {result.profit.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${result.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.profitMargin.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-green-50 rounded-lg p-8 border border-green-200">
              <h3 className="text-2xl font-semibold text-green-900 mb-6 text-center">Total Profit Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-lg text-green-600 mb-2">Total Revenue</p>
                  <p className="text-4xl font-bold text-green-900">Rs {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-green-600 mb-2">Total Costs</p>
                  <p className="text-4xl font-bold text-green-900">Rs {totalCosts.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-green-600 mb-2">Net Profit</p>
                  <p className={`text-4xl font-bold ${totalProfit >= 0 ? 'text-green-900' : 'text-red-600'}`}>
                    Rs {totalProfit.toLocaleString()}
                  </p>
                  <p className={`text-lg ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}% margin
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Result */}
        {predictionResult && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Prediction Result</h3>
            <p>Min Price: Rs {predictionResult.min_price.toLocaleString()}</p>
            <p>Max Price: Rs {predictionResult.max_price.toLocaleString()}</p>
            {/* Pie Chart */}
            <div className="mt-8" style={{ width: '100%', maxWidth: 400, height: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Prediction Error */}
        {predictionError && (
          <div className="mt-8 p-6 bg-red-50 rounded-lg">
            <h3 className="text-xl font-semibold text-red-900 mb-4">Prediction Error</h3>
            <p>{predictionError}</p>
          </div>
        )}

        {/* Suggestion Modal */}
        {showSuggestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowSuggestionModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">Market Suggestion</h2>
              {suggestionLoading ? (
                <div className="text-center text-gray-600">Loading suggestion...</div>
              ) : suggestionError ? (
                <div className="text-center text-red-600">{suggestionError}</div>
              ) : (
                <>
                  <div className="mb-4 text-center">
                    <p>Current Month Max Price: <span className="font-semibold">Rs {currentMonthMax?.toLocaleString()}</span></p>
                    <p>Next Month Max Price: <span className="font-semibold">Rs {nextMonthMax?.toLocaleString()}</span></p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-green-800 font-semibold text-center">
                    Suggestion: {suggestion}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfitEstimation;