import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';

const COUNTRY_OPTIONS = ['USA', 'Canada', 'Germany', 'Australia', 'Pakistan'];
const TYPE_OPTIONS = ['job', 'education'];

// Loading skeleton component
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-4"></div>
    <div className="h-20 bg-gray-200 rounded-md w-full"></div>
  </div>
);

export default function JobsEducation() {
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (pageNum = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (type) params.append('type', type);
      if (search) params.append('search', search);
      params.append('page', pageNum);
      params.append('limit', 6);
      const response = await axios.get(`http://localhost:5000/api/jobs-education?${params.toString()}`);
      const data = response.data;
      setResults(data.data);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, [country, type, search]);

  const handlePageChange = (newPage) => {
    fetchData(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#588157] mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore international jobs and education programs tailored for you
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Country</label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 outline-none appearance-none hover:bg-gray-100"
                >
                  <option value="">All Countries</option>
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Opportunity Type</label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 outline-none appearance-none hover:bg-gray-100"
                >
                  <option value="">All Types</option>
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search opportunities..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 outline-none pl-10 hover:bg-gray-100"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-red-600 text-lg">{error}</div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-gray-500 text-lg">No opportunities found. Try adjusting your filters.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === 'job' 
                        ? 'bg-blue-100 text-blue-800 group-hover:bg-blue-200' 
                        : 'bg-green-100 text-green-800 group-hover:bg-green-200'
                    } transition-colors duration-300`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{item.country}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#588157] transition-colors duration-300">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-6 py-2 rounded-lg bg-[#588157] text-white font-medium hover:bg-[#476146] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                    ${page === i + 1 
                      ? 'bg-[#588157] text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-6 py-2 rounded-lg bg-[#588157] text-white font-medium hover:bg-[#476146] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 