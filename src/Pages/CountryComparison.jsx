import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const COUNTRY_OPTIONS = ['USA', 'Canada', 'Germany', 'Australia', 'Pakistan'];

export default function CountryComparison() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = (country) => {
    if (selectedCountries.length < 2 && !selectedCountries.includes(country)) {
      setSelectedCountries((prev) => [...prev, country]);
    }
  };

  const fetchComparison = async () => {
    if (selectedCountries.length < 2) {
      setError('Please select two countries.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/countries/compare?countries=${selectedCountries.join(',')}`
      );
      const data = await res.json();
      setComparisonData(data);
    } catch (err) {
      setError('Failed to fetch comparison data.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col">
      <NavBar />
      <div className="max-w-4xl mx-auto mt-32 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-[#588157] mb-6 text-center">
          Country Comparison
        </h1>

        <h2 className="text-lg font-semibold mb-4">
          Select two countries to compare:
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {COUNTRY_OPTIONS.map((country) => (
            <div
              key={country}
              className="p-4 border rounded-lg shadow-md text-center"
            >
              <h3 className="text-semibold mb-4">{country}</h3>
              {selectedCountries.includes(country) ? (
                <button
                    disabled
                    className="bg-gray-400 text-gray-900 py-2 px-4 rounded-md font-semibold disabled:opacity-50">
                    Selected
                </button>
              ) : (
                <button
                    onClick={() => handleSelect(country)}
                    disabled={selectedCountries.length >= 2}
                    className="bg-[#588157] text-gray-50 py-2 px-4 rounded-md font-semibold hover:bg-[#476146] transition disabled:opacity-50">
                    Select
                </button>
              )}

            </div>
          ))}
        </div>

        <button
          onClick={fetchComparison}
          disabled={loading ||
            selectedCountries.length < 2}
          className="mt-6 w-full bg-[#588157] text-gray-50 py-3 rounded-lg font-semibold hover:bg-[#476146] transition disabled:opacity-50">
          {loading ? 'Comparing...' : 'Compare'}
        </button>

        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

        {comparisonData.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
              <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left">Country</th>
                    <th className="py-2 px-4 border-b text-left">Visa Process</th>
                    <th className="py-2 px-4 border-b text-left">Employment</th>
                    <th className="py-2 px-4 border-b text-left">Education</th>
                    <th className="py-2 px-4 border-b text-left">Cost of Living</th>
                    <th className="py-2 px-4 border-b text-left">Health Care</th>
                    <th className="py-2 px-4 border-b text-left">Safety</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((country) => (
                    <tr key={country.name} className="hover:bg-[#f8f9fa]">
                        <td className="py-2 px-4 border-b font-semibold text-[#588157]">
                        {country.name}
                        </td>
                        <td className="py-2 px-4 border-b">
                        {country.visaProcess}
                        </td>
                        <td className="py-2 px-4 border-b">
                        {country.employment}
                        </td>
                        <td className="py-2 px-4 border-b">
                        {country.education}
                        </td>
                        <td className="py-2 px-4 border-b">
                        {country.costOfLiving}
                        </td>
                        <td className="py-2 px-4 border-b">
                        {country.healthCare}
                        </td>
                        <td className="py-2 px-4 border-b">
                        {country.safety}
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

