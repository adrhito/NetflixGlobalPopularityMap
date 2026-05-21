'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RankedTitle, ApiResponse } from '@/lib/types';

export default function HomePage() {
  const [topTitles, setTopTitles] = useState<RankedTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/worldwide');
        const data: ApiResponse<RankedTitle[]> = await response.json();

        if (data.success && data.data) {
          setTopTitles(data.data.slice(0, 10));
        } else {
          setError(data.error || 'Failed to load data');
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const topMovies = topTitles.filter((t) => t.title.type === 'movie').slice(0, 5);
  const topTvShows = topTitles.filter((t) => t.title.type === 'tv').slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Netflix Global Popularity Map
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Discover the most popular Netflix movies and TV shows worldwide. Explore regional trends,
          compare ratings, and see what's trending across the globe.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/map"
            className="px-6 py-3 bg-[#e50914] text-white rounded-lg font-medium hover:bg-[#b20710] transition-colors"
          >
            Explore Map
          </Link>
          <Link
            href="/worldwide"
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            View All Rankings
          </Link>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#e50914] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading top titles...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Top Titles */}
      {!loading && !error && (
        <>
          {/* Top 10 Overall */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-[#e50914] mr-2">🏆</span>
              Top 10 Worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {topTitles.slice(0, 10).map((rankedTitle, index) => (
                <div
                  key={rankedTitle.title.imdbId}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -top-3 -left-3 bg-[#e50914] text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="aspect-[2/3] bg-gray-200 flex items-center justify-center">
                      {rankedTitle.title.posterUrl ? (
                        <img
                          src={rankedTitle.title.posterUrl}
                          alt={rankedTitle.title.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl">🎬</div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-1" title={rankedTitle.title.title}>
                        {rankedTitle.title.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                        <span>⭐ {rankedTitle.metrics.rating.toFixed(1)}</span>
                        <span className="font-medium text-[#e50914]">
                          {rankedTitle.globalScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Movies & TV Shows */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Movies */}
            <section>
              <h2 className="text-xl font-bold mb-4">🎬 Top Movies</h2>
              <div className="space-y-3">
                {topMovies.map((rankedTitle, index) => (
                  <div
                    key={rankedTitle.title.imdbId}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded flex items-center justify-center font-bold text-[#e50914]">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{rankedTitle.title.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span>⭐ {rankedTitle.metrics.rating.toFixed(1)}</span>
                          <span>📍 {rankedTitle.regionCoverageCount} regions</span>
                          <span className="font-medium text-[#e50914]">
                            Score: {rankedTitle.globalScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top TV Shows */}
            <section>
              <h2 className="text-xl font-bold mb-4">📺 Top TV Shows</h2>
              <div className="space-y-3">
                {topTvShows.map((rankedTitle, index) => (
                  <div
                    key={rankedTitle.title.imdbId}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded flex items-center justify-center font-bold text-[#e50914]">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{rankedTitle.title.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span>⭐ {rankedTitle.metrics.rating.toFixed(1)}</span>
                          <span>📍 {rankedTitle.regionCoverageCount} regions</span>
                          <span className="font-medium text-[#e50914]">
                            Score: {rankedTitle.globalScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
