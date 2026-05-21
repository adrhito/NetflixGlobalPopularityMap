'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RankedTitle, ApiResponse } from '@/lib/types';

export default function RegionDetailPage() {
  const params = useParams();
  const regionCode = (params.regionCode as string)?.toUpperCase();

  const [titles, setTitles] = useState<RankedTitle[]>([]);
  const [filteredTitles, setFilteredTitles] = useState<RankedTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const regionName = titles[0]?.title.netflixRegions.find(r => r === regionCode)
    ? getRegionName(regionCode)
    : regionCode;

  useEffect(() => {
    async function fetchData() {
      if (!regionCode) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/regions/${regionCode}`);
        const data: ApiResponse<RankedTitle[]> = await response.json();

        if (data.success && data.data) {
          setTitles(data.data);
          setFilteredTitles(data.data);
        } else {
          setError(data.error || 'Failed to load region data');
        }
      } catch (err) {
        setError('Failed to load region data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [regionCode]);

  useEffect(() => {
    let filtered = [...titles];

    if (filter !== 'all') {
      filtered = filtered.filter((t) => t.title.type === filter);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((t) =>
        t.title.title.toLowerCase().includes(search)
      );
    }

    setFilteredTitles(filtered);
  }, [filter, searchTerm, titles]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {regionName} Netflix Rankings
        </h1>
        <p className="text-gray-600">
          Top {titles.length} titles ranked by popularity
        </p>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#e50914] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading rankings...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914]"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-[#e50914] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('movie')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'movie'
                    ? 'bg-[#e50914] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setFilter('tv')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'tv'
                    ? 'bg-[#e50914] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                TV Shows
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTitles.map((rankedTitle, index) => (
              <div
                key={rankedTitle.title.imdbId}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#e50914]">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {rankedTitle.title.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{rankedTitle.title.year}</span>
                          <span>•</span>
                          <span className="capitalize">
                            {rankedTitle.title.type === 'movie' ? '🎬 Movie' : '📺 TV Show'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#e50914]">
                          {rankedTitle.popularityScore}
                        </div>
                        <div className="text-xs text-gray-500">Popularity</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">
                          ⭐ {rankedTitle.metrics.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Votes:</span>
                        <span className="font-medium">
                          {rankedTitle.metrics.voteCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Regions:</span>
                        <span className="font-medium">
                          📍 {rankedTitle.regionCoverageCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTitles.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No titles found matching your criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
}

function getRegionName(code: string): string {
  const regionMap: Record<string, string> = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'BR': 'Brazil',
    'JP': 'Japan',
    'IN': 'India',
    'DE': 'Germany',
    'FR': 'France',
    'ES': 'Spain',
    'IT': 'Italy',
    'CA': 'Canada',
    'AU': 'Australia',
    'MX': 'Mexico',
    'KR': 'South Korea',
    'NL': 'Netherlands',
    'SE': 'Sweden',
    'AR': 'Argentina',
    'PL': 'Poland',
    'TR': 'Turkey',
    'TH': 'Thailand',
    'ID': 'Indonesia',
  };

  return regionMap[code] || code;
}
