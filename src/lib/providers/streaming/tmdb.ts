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

  // TMDb region codes that have Netflix (major regions - can be expanded)
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
    { code: 'BE', name: 'Belgium', geoId: 'BEL', lastUpdated: new Date() },
    { code: 'CH', name: 'Switzerland', geoId: 'CHE', lastUpdated: new Date() },
    { code: 'CL', name: 'Chile', geoId: 'CHL', lastUpdated: new Date() },
    { code: 'CO', name: 'Colombia', geoId: 'COL', lastUpdated: new Date() },
    { code: 'CZ', name: 'Czech Republic', geoId: 'CZE', lastUpdated: new Date() },
    { code: 'DK', name: 'Denmark', geoId: 'DNK', lastUpdated: new Date() },
    { code: 'FI', name: 'Finland', geoId: 'FIN', lastUpdated: new Date() },
    { code: 'HK', name: 'Hong Kong', geoId: 'HKG', lastUpdated: new Date() },
    { code: 'ID', name: 'Indonesia', geoId: 'IDN', lastUpdated: new Date() },
    { code: 'IE', name: 'Ireland', geoId: 'IRL', lastUpdated: new Date() },
    { code: 'IL', name: 'Israel', geoId: 'ISR', lastUpdated: new Date() },
    { code: 'MY', name: 'Malaysia', geoId: 'MYS', lastUpdated: new Date() },
    { code: 'NO', name: 'Norway', geoId: 'NOR', lastUpdated: new Date() },
    { code: 'NZ', name: 'New Zealand', geoId: 'NZL', lastUpdated: new Date() },
    { code: 'PE', name: 'Peru', geoId: 'PER', lastUpdated: new Date() },
    { code: 'PH', name: 'Philippines', geoId: 'PHL', lastUpdated: new Date() },
    { code: 'PL', name: 'Poland', geoId: 'POL', lastUpdated: new Date() },
    { code: 'PT', name: 'Portugal', geoId: 'PRT', lastUpdated: new Date() },
    { code: 'RO', name: 'Romania', geoId: 'ROU', lastUpdated: new Date() },
    { code: 'RU', name: 'Russia', geoId: 'RUS', lastUpdated: new Date() },
    { code: 'SG', name: 'Singapore', geoId: 'SGP', lastUpdated: new Date() },
    { code: 'TH', name: 'Thailand', geoId: 'THA', lastUpdated: new Date() },
    { code: 'TR', name: 'Turkey', geoId: 'TUR', lastUpdated: new Date() },
    { code: 'TW', name: 'Taiwan', geoId: 'TWN', lastUpdated: new Date() },
    { code: 'ZA', name: 'South Africa', geoId: 'ZAF', lastUpdated: new Date() },
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
      const allTitles: Title[] = [];
      const maxPages = 5; // Fetch 5 pages (up to 100 titles per type)

      // Fetch multiple pages
      for (let page = 1; page <= maxPages; page++) {
        const url = `${this.baseUrl}/discover/${type}?api_key=${this.apiKey}&watch_region=${regionCode}&with_watch_providers=${this.netflixProviderId}&sort_by=popularity.desc&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results || [];
        if (results.length === 0) break; // No more results

        // Convert to our Title format (batch process to reduce API calls)
        const pageTitles: Title[] = results.map((item: any) => ({
          imdbId: `tmdb_${type}_${item.id}`, // Use TMDb ID as fallback (faster than fetching external IDs for each)
          title: item.title || item.name,
          type,
          year: this.extractYear(item.release_date || item.first_air_date),
          posterUrl: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : undefined,
          netflixRegions: [regionCode],
        }));

        allTitles.push(...pageTitles);

        // Respect rate limits
        if (page < maxPages) {
          await new Promise(resolve => setTimeout(resolve, 250)); // 250ms delay between pages
        }
      }

      return allTitles;
    } catch (error) {
      console.error(`Error fetching popular ${type} for ${regionCode}:`, error);
      return [];
    }
  }

  private extractYear(dateString?: string): number {
    if (!dateString) return new Date().getFullYear();
    return parseInt(dateString.split('-')[0], 10);
  }
}
