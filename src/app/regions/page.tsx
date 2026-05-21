'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RegionSummary, ApiResponse } from '@/lib/types';

export default function RegionsPage() {
  const [regions, setRegions] = useState<RegionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/regions');
        const data: ApiResponse<RegionSummary[]> = await response.json();

        if (data.success && data.data) {
          setRegions(data.data);
        } else {
          setError(data.error || 'Failed to load regions');
        }
      } catch (err) {
        setError('Failed to load regions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📍 Netflix Regions</h1>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#e50914] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading regions...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Regions Grid */}
      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((summary) => (
            <Link
              key={summary.region.code}
              href={`/regions/${summary.region.code.toLowerCase()}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{summary.region.name}</h2>
                  <p className="text-sm text-gray-600">{summary.region.code}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#e50914]">
                    {summary.averagePopularityScore}
                  </div>
                  <div className="text-xs text-gray-500">Avg Score</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Titles:</span>
                  <span className="ml-2 font-medium">{summary.totalTitles}</span>
                </div>
                {summary.topOverall && (
                  <div>
                    <span className="text-gray-600">Top Title:</span>
                    <span className="ml-2 font-medium">{summary.topOverall.title.title}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-[#e50914] text-sm font-medium">
                View Details →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
