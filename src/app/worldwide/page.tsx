'use client';

import { useEffect, useState } from 'react';
import { RankedTitle, ApiResponse } from '@/lib/types';

export default function WorldwidePage() {
  const [titles, setTitles] = useState<RankedTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'global' | 'popularity' | 'rating' | 'votes'>('global');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/worldwide');
        const data: ApiResponse<RankedTitle[]> = await response.json();

        if (data.success && data.data) {
          setTitles(data.data);
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

  const filteredTitles = titles
    .filter((t) => {
      const matchesType = filter === 'all' || t.title.type === filter;
      const matchesSearch = t.title.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.metrics.rating - a.metrics.rating;
        case 'votes':
          return b.metrics.voteCount - a.metrics.voteCount;
        case 'popularity':
          return b.popularityScore - a.popularityScore;
        case 'global':
        default:
          return (b.globalScore || 0) - (a.globalScore || 0);
      }
    })
    .slice(0, 100); // Limit to top 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🌍 Worldwide Top Titles</h1>
        <p className="text-gray-600">Top 100 titles sorted by {sortBy === 'global' ? 'global score' : sortBy}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914]"
        />

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('movie')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'movie' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setFilter('tv')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'tv' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              TV Shows
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('global')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'global' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🌍 Global
            </button>
            <button
              onClick={() => setSortBy('popularity')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'popularity' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📊 Popularity
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'rating' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⭐ Rating
            </button>
            <button
              onClick={() => setSortBy('votes')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'votes' ? 'bg-[#e50914] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🗳️ Votes
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#e50914] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading titles...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <div className="space-y-4">
          {filteredTitles.map((rankedTitle, index) => (
            <div
              key={rankedTitle.title.imdbId}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center font-bold text-[#e50914] text-lg">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{rankedTitle.title.title}</h3>
                      <p className="text-sm text-gray-600">
                        {rankedTitle.title.year} • {rankedTitle.title.type === 'movie' ? '🎬 Movie' : '📺 TV Show'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#e50914]">
                        {rankedTitle.globalScore}
                      </div>
                      <div className="text-xs text-gray-500">Global Score</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <span className="ml-2 font-medium">⭐ {rankedTitle.metrics.rating.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Votes:</span>
                      <span className="ml-2 font-medium">
                        {rankedTitle.metrics.voteCount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Regions:</span>
                      <span className="ml-2 font-medium">
                        📍 {rankedTitle.regionCoverageCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Popularity Score:</span>
                      <span className="ml-2 font-medium">{rankedTitle.popularityScore}</span>
                    </div>
                  </div>
                  {rankedTitle.title.netflixRegions && rankedTitle.title.netflixRegions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-600 mb-2">Available in:</div>
                      <div className="flex flex-wrap gap-1">
                        {rankedTitle.title.netflixRegions.map((region) => (
                          <span
                            key={region}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
