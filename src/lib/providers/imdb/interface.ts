import { ImdbMetrics } from '@/lib/types';

/**
 * Interface for IMDb data providers
 * Implementations: mock (default), imdb-graphql, omdb, tmdb, custom
 */
export interface ImdbProvider {
  /**
   * Get IMDb metrics for a specific title
   * @param imdbId IMDb identifier
   */
  getTitleMetrics(imdbId: string): Promise<ImdbMetrics | null>;

  /**
   * Search for a title by name and year
   * @param titleName Title name to search
   * @param year Optional release year for filtering
   */
  searchTitle(titleName: string, year?: number): Promise<{
    imdbId: string;
    title: string;
    year: number;
  }[] | null>;

  /**
   * Batch fetch metrics for multiple titles (for efficiency)
   * @param imdbIds Array of IMDb identifiers
   */
  batchGetTitleMetrics(imdbIds: string[]): Promise<Map<string, ImdbMetrics>>;
}
