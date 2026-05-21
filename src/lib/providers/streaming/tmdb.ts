import { StreamingAvailabilityProvider } from './interface';
import { Region, Title } from '@/lib/types';

/**
 * TMDb API implementation for streaming availability
 * Uses TMDb's "watch providers" endpoint to get Netflix availability by region
 *
 * API Docs: https://developer.themoviedb.org/docs
 * Watch Providers: https://developer.themoviedb.org/reference/movie-watch-providers
 */
export class TmdbStreamingProvider implements StreamingAvailabilityProvider {
  private apiKey: string;
  private baseUrl = 'https://api.themoviedb.org/3';
  private netflixProviderId = 8; // Netflix provider ID in TMDb

  // Major Netflix regions (optimized for faster loading - top 20 markets)
  private supportedRegions: Region[] = [
    { code: 'US', name: 'United States', geoId: 'USA', lastUpdated: new Date() },
    { code: 'GB', name: 'United Kingdom', geoId: 'GBR', lastUpdated: new Date() },
    { code: 'BR', name: 'Brazil', geoId: 'BRA', lastUpdated: new Date() },
    { code: 'JP', name: 'Japan', geoId: 'JPN', lastUpdated: new Date() },
    { code: 'IN', name: 'India', geoId: 'IND', lastUpdated: new Date() },
    { code: 'DE', name: 'Germany', geoId: 'DEU', lastUpdated: new Date() },
    { code: 'FR', name: 'France', geoId: 'FRA', lastUpdated: new Date() },
    { code: 'ES', name: 'Spain', geoId: 'ESP', lastUpdated: new Date() },
    { code: 'IT', name: 'Italy', geoId: 'ITA', lastUpdated: new Date() },
    { code: 'CA', name: 'Canada', geoId: 'CAN', lastUpdated: new Date() },
    { code: 'AU', name: 'Australia', geoId: 'AUS', lastUpdated: new Date() },
    { code: 'MX', name: 'Mexico', geoId: 'MEX', lastUpdated: new Date() },
    { code: 'KR', name: 'South Korea', geoId: 'KOR', lastUpdated: new Date() },
    { code: 'NL', name: 'Netherlands', geoId: 'NLD', lastUpdated: new Date() },
    { code: 'SE', name: 'Sweden', geoId: 'SWE', lastUpdated: new Date() },
    { code: 'AR', name: 'Argentina', geoId: 'ARG', lastUpdated: new Date() },
    { code: 'PL', name: 'Poland', geoId: 'POL', lastUpdated: new Date() },
    { code: 'TR', name: 'Turkey', geoId: 'TUR', lastUpdated: new Date() },
    { code: 'TH', name: 'Thailand', geoId: 'THA', lastUpdated: new Date() },
    { code: 'ID', name: 'Indonesia', geoId: 'IDN', lastUpdated: new Date() },
  ];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getNetflixRegions(): Promise<Region[]> {
    return this.supportedRegions;
  }

  async getNetflixTitlesByRegion(regionCode: string): Promise<Title[]> {
    try {
      // Get popular movies on Netflix in this region
      const movies = await this.getPopularNetflixContent('movie', regionCode);
      const tvShows = await this.getPopularNetflixContent('tv', regionCode);

      return [...movies, ...tvShows];
    } catch (error) {
      console.error(`Error fetching Netflix titles for ${regionCode}:`, error);
      return [];
    }
  }

  async getTitleAvailability(imdbId: string): Promise<{
    title: Title;
    availableRegions: string[];
  } | null> {
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

      // Get watch providers for all regions
      const providersUrl = `${this.baseUrl}/${type}/${tmdbId}/watch/providers?api_key=${this.apiKey}`;
      const providersResponse = await fetch(providersUrl);
      const providersData = await providersResponse.json();

      // Find regions where Netflix is available
      const availableRegions: string[] = [];
      const results = providersData.results || {};

      for (const [regionCode, data] of Object.entries(results) as [string, any][]) {
        const flatrate = data.flatrate || [];
        if (flatrate.some((p: any) => p.provider_id === this.netflixProviderId)) {
          availableRegions.push(regionCode);
        }
      }

      const title: Title = {
        imdbId,
        title: result.title || result.name,
        type,
        year: this.extractYear(result.release_date || result.first_air_date),
        posterUrl: result.poster_path
          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
          : undefined,
        netflixRegions: availableRegions,
      };

      return {
        title,
        availableRegions,
      };
    } catch (error) {
      console.error(`Error fetching availability for ${imdbId}:`, error);
      return null;
    }
  }

  private async getPopularNetflixContent(
    type: 'movie' | 'tv',
    regionCode: string
  ): Promise<Title[]> {
    try {
      console.log(`[TMDB] Fetching ${type} for region ${regionCode}`);
      const allTitles: Title[] = [];
      const maxPages = 3; // 3 pages × 20 results = 60 per type (60 movies + 60 TV = 120 total, take top 100)

      // Fetch multiple pages in parallel
      const pagePromises = [];
      for (let page = 1; page <= maxPages; page++) {
        const url = `${this.baseUrl}/discover/${type}?api_key=${this.apiKey}&watch_region=${regionCode}&with_watch_providers=${this.netflixProviderId}&sort_by=popularity.desc&page=${page}`;
        console.log(`[TMDB] Fetching page ${page}: ${url.replace(this.apiKey, 'REDACTED')}`);

        pagePromises.push(
          fetch(url).then(async (response) => {
            if (!response.ok) {
              const errorText = await response.text();
              console.error(`[TMDB] API error ${response.status}: ${errorText}`);
              throw new Error(`TMDB API returned ${response.status}: ${errorText}`);
            }
            return response.json();
          })
        );
      }

      const pageResults = await Promise.all(pagePromises);

      // Process all pages
      for (let i = 0; i < pageResults.length; i++) {
        const data = pageResults[i];
        const results = data.results || [];
        console.log(`[TMDB] Page ${i + 1} returned ${results.length} results`);

        if (results.length === 0) {
          console.warn(`[TMDB] No results for ${type} in ${regionCode} on page ${i + 1}`);
          continue;
        }

        // Convert to our Title format
        const pageTitles: Title[] = results.map((item: any) => ({
          imdbId: `tmdb_${type}_${item.id}`,
          title: item.title || item.name,
          type,
          year: this.extractYear(item.release_date || item.first_air_date),
          posterUrl: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : undefined,
          netflixRegions: [regionCode],
        }));

        allTitles.push(...pageTitles);
      }

      console.log(`[TMDB] Total ${type} fetched for ${regionCode}: ${allTitles.length}`);
      return allTitles;
    } catch (error) {
      console.error(`[TMDB] Error fetching popular ${type} for ${regionCode}:`, error);
      console.error(`[TMDB] Error details:`, error instanceof Error ? error.message : error);
      return [];
    }
  }

  private extractYear(dateString?: string): number {
    if (!dateString) return new Date().getFullYear();
    return parseInt(dateString.split('-')[0], 10);
  }
}
