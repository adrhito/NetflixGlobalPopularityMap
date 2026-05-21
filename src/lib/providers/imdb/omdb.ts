import { ImdbProvider } from './interface';
import { ImdbMetrics } from '@/lib/types';

/**
 * OMDb API implementation for real IMDb data
 * Provides accurate IMDb ratings, vote counts, and other metrics
 *
 * API Docs: http://www.omdbapi.com/
 * Get API key: http://www.omdbapi.com/apikey.aspx
 */
export class OmdbImdbProvider implements ImdbProvider {
  private apiKey: string;
  private baseUrl = 'https://www.omdbapi.com';
  private cache: Map<string, { data: ImdbMetrics; timestamp: number }> = new Map();
  private cacheTTL = 24 * 60 * 60 * 1000; // 24 hours

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getTitleMetrics(imdbId: string): Promise<ImdbMetrics | null> {
    try {
      // Check if this is a synthetic TMDB ID
      const syntheticMatch = imdbId.match(/^tmdb_(movie|tv)_(\d+)$/);

      if (syntheticMatch) {
        // For synthetic IDs, we need to get the real IMDb ID first from TMDB
        const realImdbId = await this.getImdbIdFromTmdb(syntheticMatch[1], syntheticMatch[2]);
        if (!realImdbId) {
          console.log(`[OMDb] Could not find IMDb ID for ${imdbId}`);
          return null;
        }
        imdbId = realImdbId;
      }

      // Check cache
      const cached = this.cache.get(imdbId);
      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        return cached.data;
      }

      // Fetch from OMDb API
      const url = `${this.baseUrl}/?apikey=${this.apiKey}&i=${imdbId}&plot=short`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'False') {
        console.log(`[OMDb] Title not found: ${imdbId}`);
        return null;
      }

      // Parse IMDb rating and votes
      const rating = parseFloat(data.imdbRating) || 0;
      const voteCount = parseInt(data.imdbVotes?.replace(/,/g, '') || '0', 10);

      // OMDb doesn't provide a popularity rank, so we estimate based on votes
      // Higher vote count = better popularity
      const popularityRank = this.estimatePopularityRank(voteCount);

      const metrics: ImdbMetrics = {
        rating,
        voteCount,
        popularityRank,
        source: 'imdb',
        fetchedAt: new Date(),
      };

      // Cache the result
      this.cache.set(imdbId, { data: metrics, timestamp: Date.now() });

      return metrics;
    } catch (error) {
      console.error(`[OMDb] Error fetching metrics for ${imdbId}:`, error);
      return null;
    }
  }

  private async getImdbIdFromTmdb(type: string, tmdbId: string): Promise<string | null> {
    try {
      const tmdbApiKey = process.env.TMDB_API_KEY;
      if (!tmdbApiKey) return null;

      const url = `https://api.themoviedb.org/3/${type}/${tmdbId}/external_ids?api_key=${tmdbApiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      return data.imdb_id || null;
    } catch (error) {
      console.error(`[OMDb] Error getting IMDb ID from TMDB:`, error);
      return null;
    }
  }

  private estimatePopularityRank(voteCount: number): number {
    // Estimate popularity rank based on vote count
    // This is a rough approximation since OMDb doesn't provide popularity ranks
    if (voteCount > 1000000) return 50;
    if (voteCount > 500000) return 100;
    if (voteCount > 100000) return 250;
    if (voteCount > 50000) return 500;
    if (voteCount > 10000) return 1000;
    if (voteCount > 5000) return 2000;
    return 5000;
  }

  async searchTitle(
    titleName: string,
    year?: number
  ): Promise<{ imdbId: string; title: string; year: number }[] | null> {
    try {
      const yearParam = year ? `&y=${year}` : '';
      const url = `${this.baseUrl}/?apikey=${this.apiKey}&s=${encodeURIComponent(titleName)}${yearParam}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'False' || !data.Search) {
        return null;
      }

      return data.Search.map((item: any) => ({
        imdbId: item.imdbID,
        title: item.Title,
        year: parseInt(item.Year, 10),
      }));
    } catch (error) {
      console.error(`[OMDb] Error searching for "${titleName}":`, error);
      return null;
    }
  }

  async batchGetTitleMetrics(imdbIds: string[]): Promise<Map<string, ImdbMetrics>> {
    const metricsMap = new Map<string, ImdbMetrics>();

    // OMDb doesn't have batch endpoint, fetch sequentially with delay
    for (const imdbId of imdbIds) {
      const metrics = await this.getTitleMetrics(imdbId);
      if (metrics) {
        metricsMap.set(imdbId, metrics);
      }
      // Small delay to respect rate limits (1000 requests/day on free tier)
      await this.delay(100);
    }

    return metricsMap;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
