import { Region, Title } from '@/lib/types';

/**
 * Interface for streaming availability providers
 * Implementations: mock (default), watchmode, justwatch, custom
 */
export interface StreamingAvailabilityProvider {
  /**
   * Get all available Netflix regions
   */
  getNetflixRegions(): Promise<Region[]>;

  /**
   * Get all Netflix titles available in a specific region
   * @param regionCode ISO 3166-1 alpha-2 country code
   */
  getNetflixTitlesByRegion(regionCode: string): Promise<Title[]>;

  /**
   * Get availability information for a specific title
   * @param imdbId IMDb identifier
   */
  getTitleAvailability(imdbId: string): Promise<{
    title: Title;
    availableRegions: string[];
  } | null>;
}
