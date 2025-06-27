import React, { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const CSV_PATH = '/final_crop_prices_trend_ready.csv';

function PriceHistory() {
  const [data, setData] = useState<any[]>([]);
  const [crop, setCrop] = useState('');
  const [cropType, setCropType] = useState('');
  const [market, setMarket] = useState('');
  const [city, setCity] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Unique dropdown options
  const [crops, setCrops] = useState<string[]>([]);
  const [cropTypes, setCropTypes] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const [result, setResult] = useState<{ min_price: string, max_price: string } | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(CSV_PATH, {
      download: true,
      header: true,
      complete: (results: ParseResult<any>) => {
        setData(results.data);
        setCrops(Array.from(new Set(results.data.map((row: any) => row.crop).filter(Boolean))));
        setCities(Array.from(new Set(results.data.map((row: any) => row.city).filter(Boolean))));
        setMonths(Array.from(new Set(results.data.map((row: any) => row.month).filter(Boolean))));
        setYears(Array.from(new Set(results.data.map((row: any) => row.year).filter(Boolean))));
        setLoading(false);
      }
    });
  }, []);

  // Update markets when city changes
  useEffect(() => {
    if (city) {
      setMarkets(Array.from(new Set(data.filter(row => row.city === city).map(row => row.market).filter(Boolean))));
    } else {
      setMarkets([]);
    }
    setMarket('');
  }, [city, data]);

  // Update crop types when crop changes
  useEffect(() => {
    if (crop) {
      setCropTypes(Array.from(new Set(data.filter(row => row.crop === crop).map(row => row.crop_type).filter(Boolean))));
    } else {
      setCropTypes([]);
    }
    setCropType('');
  }, [crop, data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = data.find(row =>
      row.crop === crop &&
      row.crop_type === cropType &&
      row.city === city &&
      row.market === market &&
      row.month === month &&
      row.year === year
    );
    if (found) {
      setResult({ min_price: Number(found.min_price).toFixed(2), max_price: Number(found.max_price).toFixed(2) });
    } else {
      setResult(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Crop Price History</h1>
        {loading ? (
          <Loader />
        ) : (
        <>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Crop</label>
              <select value={crop} onChange={e => setCrop(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">Select Crop</option>
                {crops.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Crop Type</label>
              <select value={cropType} onChange={e => setCropType(e.target.value)} className="w-full border rounded px-3 py-2" disabled={!crop}>
                <option value="">Select Crop Type</option>
                {cropTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">City</label>
              <select value={city} onChange={e => setCity(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">Select City</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Market</label>
              <select value={market} onChange={e => setMarket(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">Select Market</option>
                {markets.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Month</label>
              <select value={month} onChange={e => setMonth(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">Select Month</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Year</label>
              <select value={year} onChange={e => setYear(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700">Get Price</button>
        </form>
        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded shadow text-center">
            <h2 className="text-xl font-bold mb-2">Price Result</h2>
            <p className="text-lg">Min Price: <span className="font-semibold text-green-700">{result.min_price}</span></p>
            <p className="text-lg">Max Price: <span className="font-semibold text-orange-700">{result.max_price}</span></p>
          </div>
        )}
        {result === null && (
          <div className="mt-8 text-center text-red-600 font-medium">No data found for the selected combination.</div>
        )}
        </>
        )}
      </div>
    </>
  );
}

export default PriceHistory; 