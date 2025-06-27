import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const API_KEY = '5d19a6a5d74e2c3a5d15ba70007ea74e';

function Weather() {
  const [city, setCity] = useState('Lahore');
  const [inputCity, setInputCity] = useState('Lahore');
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        setCurrent(data.list[0]);
        const daily = data.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
        setForecast(daily.slice(0, 5));
      } catch (err: any) {
        setError(err.message);
        setCurrent(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium"
        >
          &larr; Back
        </button>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Weather Forecast</h1>
          <form onSubmit={handleCitySubmit} className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              value={inputCity}
              onChange={handleCityChange}
              placeholder="Enter city name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none"
            >
              Get Weather
            </button>
          </form>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              {current && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Current Weather in {city}</h2>
                      <p className="text-3xl font-bold text-gray-900">
                        {Math.round(current.main.temp)}°C
                      </p>
                      <p className="text-gray-600">{current.weather[0].description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <Droplets className="h-6 w-6 text-blue-500 mx-auto" />
                        <p className="text-sm text-gray-600 mt-1">{current.main.humidity}%</p>
                        <p className="text-xs text-gray-500">Humidity</p>
                      </div>
                      <div className="text-center">
                        <Wind className="h-6 w-6 text-gray-500 mx-auto" />
                        <p className="text-sm text-gray-600 mt-1">{current.wind.speed} km/h</p>
                        <p className="text-xs text-gray-500">Wind</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {forecast.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {forecast.map((item, index) => {
                      const date = new Date(item.dt_txt);
                      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const temp = Math.round(item.main.temp) + '°C';
                      const condition = item.weather[0].main;
                      const Icon = condition === 'Clear' ? Sun : Cloud;
                      return (
                        <div key={index} className="text-center p-4 border rounded-lg">
                          <p className="font-medium">{day}</p>
                          <Icon className="h-8 w-8 mx-auto my-2 text-gray-600" />
                          <p className="text-lg font-semibold">{temp}</p>
                          <p className="text-sm text-gray-600">{item.weather[0].description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;