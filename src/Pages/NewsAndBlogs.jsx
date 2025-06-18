import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const NewsAndBlogs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = ['USA', 'Canada', 'Australia', 'UK', 'Germany'];
  const MAX_PAGES = 10; // NewsAPI free tier limit

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        ...(selectedCountry && { country: selectedCountry }),
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/news/immigration-news?${params}`);
      const data = await response.json();

      if (data.status === 'success') {
        setNews(data.data);
        // Cap the total pages shown to user
        setTotalPages(Math.min(data.totalPages, MAX_PAGES));
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, selectedCountry]);

  const NewsCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-20 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#588157] mb-4">
            Immigration News & Updates
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with the latest immigration news, policy changes, and guidelines
          </p>
        </div>

        {/* Country Filter */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setPage(1);
              }}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 outline-none appearance-none hover:bg-gray-100"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-red-600 text-lg">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#588157] font-medium">
                      {article.source}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#588157] transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#588157] hover:text-[#476146] font-medium transition-colors duration-200"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <>
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="px-6 py-2 rounded-lg bg-[#588157] text-white font-medium hover:bg-[#476146] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                      ${page === i + 1
                        ? 'bg-[#588157] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="px-6 py-2 rounded-lg bg-[#588157] text-white font-medium hover:bg-[#476146] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
              >
                Next
              </button>
            </div>

            {/* User notice if max page is reached */}
            {totalPages === MAX_PAGES && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Only the first {MAX_PAGES} pages of results are available due to NewsAPI's free tier limit.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsAndBlogs;
