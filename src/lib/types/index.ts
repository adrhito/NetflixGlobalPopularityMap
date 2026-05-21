/**
 * Core type definitions for Netflix Global Popularity Map
 */

/**
 * Netflix region with geographic metadata
 */
export interface Region {
  code: string; // ISO 3166-1 alpha-2 country code
  name: string;
  geoId: string; // For mapping to geographic boundaries
  lastUpdated: Date;
}

/**
 * Netflix title (movie or TV show)
 */
export interface Title {
  imdbId: string;
  title: string;
  type: 'movie' | 'tv';
  year: number;
  posterUrl?: string;
  netflixRegions: string[]; // Region codes where available
}

/**
 * IMDb metrics for a title
 */
export interface ImdbMetrics {
  rating: number; // 0-10
  voteCount: number;
  popularityRank?: number; // IMDb popularity rank
  viewMetric?: number; // Optional: views, trending score, etc.
  source: string; // Data source identifier
  fetchedAt: Date;
}

/**
 * Title with computed ranking metrics
 */
export interface RankedTitle {
  title: Title;
  metrics: ImdbMetrics;
  popularityScore: number; // 0-100
  globalScore?: number; // 0-100, only for worldwide rankings
  regionCoverageCount?: number; // Number of regions where available
}

/**
 * Region summary for map visualization
 */
export interface RegionSummary {
  region: Region;
  topMovie?: RankedTitle;
  topTvShow?: RankedTitle;
  topOverall?: RankedTitle;
  totalTitles: number;
  averagePopularityScore: number;
}

/**
 * Filter options for title lists
 */
export interface TitleFilter {
  type?: 'all' | 'movie' | 'tv';
  search?: string;
  sortBy?: 'popularity' | 'rating' | 'voteCount' | 'regionCoverage';
  sortOrder?: 'asc' | 'desc';
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

/**
 * Cache entry with TTL
 */
export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}
