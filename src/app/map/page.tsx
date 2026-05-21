'use client';

import { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { RegionSummary } from '@/lib/types';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Map ISO country codes to region codes
const countryToRegionMap: Record<string, string> = {
  '840': 'US',  // United States
  '826': 'GB',  // United Kingdom
  '076': 'BR',  // Brazil
  '392': 'JP',  // Japan
  '356': 'IN',  // India
  '276': 'DE',  // Germany
  '250': 'FR',  // France
  '724': 'ES',  // Spain
  '380': 'IT',  // Italy
  '124': 'CA',  // Canada
  '036': 'AU',  // Australia
  '484': 'MX',  // Mexico
  '410': 'KR',  // South Korea
  '528': 'NL',  // Netherlands
  '752': 'SE',  // Sweden
};

export default function MapPage() {
  const [regionSummaries, setRegionSummaries] = useState<RegionSummary[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegions() {
      try {
        setLoading(true);
        const response = await fetch('/api/regions');
        const data = await response.json();

        if (data.success && data.data) {
          setRegionSummaries(data.data);
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

    fetchRegions();
  }, []);

  const getRegionByGeoId = (geoId: string): RegionSummary | undefined => {
    const regionCode = countryToRegionMap[geoId];
    return regionSummaries.find((r) => r.region.code === regionCode);
  };

  const getFillColor = (geoId: string): string => {
    const region = getRegionByGeoId(geoId);
    if (!region) return '#E5E7EB'; // Gray for countries without Netflix data

    // Color based on average popularity score (0-100)
    const score = region.averagePopularityScore;
    if (score >= 80) return '#B91C1C'; // Dark red (high popularity)
    if (score >= 60) return '#DC2626'; // Red
    if (score >= 40) return '#EF4444'; // Light red
    if (score >= 20) return '#F87171'; // Very light red
    return '#FCA5A5'; // Pale red (low popularity)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          🗺️ Netflix Global Popularity Map
        </h1>
        <p className="text-gray-600 text-lg">
          Click on a country to explore its most popular Netflix content
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <span className="text-sm font-medium text-gray-700">Popularity:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#B91C1C] rounded"></div>
          <span className="text-xs text-gray-600">Very High (80-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#DC2626] rounded"></div>
          <span className="text-xs text-gray-600">High (60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#EF4444] rounded"></div>
          <span className="text-xs text-gray-600">Medium (40-59)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#F87171] rounded"></div>
          <span className="text-xs text-gray-600">Low (20-39)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#E5E7EB] rounded"></div>
          <span className="text-xs text-gray-600">No Data</span>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#e50914] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading map data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
              }}
            >
              <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const region = getRegionByGeoId(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getFillColor(geo.id)}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: {
                              fill: region ? '#e50914' : '#D1D5DB',
                              outline: 'none',
                              cursor: region ? 'pointer' : 'default',
                            },
                            pressed: { outline: 'none' },
                          }}
                          onClick={() => {
                            if (region) {
                              setSelectedRegion(region);
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Region Details Panel */}
          <div className="lg:col-span-1">
            {selectedRegion ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-[#e50914]">
                  {selectedRegion.region.name}
                </h2>

                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Total Titles</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedRegion.totalTitles}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Avg. Score</p>
                      <p className="text-2xl font-bold text-[#e50914]">
                        {selectedRegion.averagePopularityScore}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Movie */}
                {selectedRegion.topMovie && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      🎬 Top Movie
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">
                        {selectedRegion.topMovie.title.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>⭐ {selectedRegion.topMovie.metrics.rating.toFixed(1)}</span>
                        <span>📊 Score: {selectedRegion.topMovie.popularityScore}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top TV Show */}
                {selectedRegion.topTvShow && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      📺 Top TV Show
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">
                        {selectedRegion.topTvShow.title.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>⭐ {selectedRegion.topTvShow.metrics.rating.toFixed(1)}</span>
                        <span>📊 Score: {selectedRegion.topTvShow.popularityScore}</span>
                      </div>
                    </div>
                  </div>
                )}

                <a
                  href={`/regions/${selectedRegion.region.code}`}
                  className="block w-full text-center px-4 py-2 bg-[#e50914] text-white rounded-lg hover:bg-[#b20710] transition-colors"
                >
                  View Full Rankings →
                </a>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-2">
                  👆 Click on a highlighted country
                </p>
                <p className="text-sm text-gray-500">
                  to see its top Netflix content
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
