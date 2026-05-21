import { ImdbProvider } from './interface';
import { ImdbMetrics } from '@/lib/types';

/**
 * TMDb-based IMDb provider
 * Uses TMDb API to fetch IMDb ratings and other metrics
 *
 * API Docs: https://developer.themoviedb.org/docs
 */
export class TmdbImdbProvider implements ImdbProvider {
  private apiKey: string;
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getTitleMetrics(imdbId: string): Promise<ImdbMetrics | null> {
    try {
      // Find the title by IMDb ID
      const findUrl = `${this.baseUrl}/find/${imdbId}?api_key=${this.apiKey}&external_source=imdb_id`;
      const findResponse = await fetch(findUrl);
      const findData = await findResponse.json();

      const result = findData.movie_results?.[0] || findData.tv_results?.[0];
      if (!result) {
        return null;
      }

      const type = findData.movie_results?.[0] ? 'movie' : 'tv';
      const tmdbId = result.id;

      // Get detailed info including vote count
      const detailsUrl = `${this.baseUrl}/${type}/${tmdbId}?api_key=${this.apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      const details = await detailsResponse.json();

      return {
        rating: details.vote_average || 0,
        voteCount: details.vote_count || 0,
        popularityRank: Math.round(details.popularity || 0),
        source: 'tmdb',
        fetchedAt: new Date(),
      };
    } catch (error) {
      console.error(`Error fetching metrics for ${imdbId}:`, error);
      return null;
    }
  }

  async searchTitle(
    titleName: string,
    year?: number
  ): Promise<{ imdbId: string; title: string; year: number }[] | null> {
    try {
      // Search for movies and TV shows
      const searchUrl = `${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${encodeURIComponent(titleName)}${year ? `&year=${year}` : ''}`;
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        return null;
      }

      // Get IMDb IDs for results
      const results = await Promise.all(
        data.results
          .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
          .slice(0, 10)
          .map(async (item: any) => {
            const type = item.media_type;
            const externalIdsUrl = `${this.baseUrl}/${type}/${item.id}/external_ids?api_key=${this.apiKey}`;
            const externalIdsResponse = await fetch(externalIdsUrl);
            const externalIds = await externalIdsResponse.json();

            return {
              imdbId: externalIds.imdb_id || `tmdb_${type}_${item.id}`,
              title: item.title || item.name,
              year: this.extractYear(item.release_date || item.first_air_date),
            };
          })
      );

      return results.filter((r) => r.imdbId);
    } catch (error) {
      console.error(`Error searching for "${titleName}":`, error);
      return null;
    }
  }

  async batchGetTitleMetrics(imdbIds: string[]): Promise<Map<string, ImdbMetrics>> {
    const metricsMap = new Map<string, ImdbMetrics>();

    // TMDb doesn't have a batch endpoint, so we fetch sequentially
    // Add a small delay between requests to avoid rate limiting
    for (const imdbId of imdbIds) {
      const metrics = await this.getTitleMetrics(imdbId);
      if (metrics) {
        metricsMap.set(imdbId, metrics);
      }
      // Small delay to respect rate limits
      await this.delay(50);
    }

    return metricsMap;
  }

  private extractYear(dateString?: string): number {
    if (!dateString) return new Date().getFullYear();
    return parseInt(dateString.split('-')[0], 10);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
