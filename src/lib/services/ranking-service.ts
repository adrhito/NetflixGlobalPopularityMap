import { RankedTitle, Title, ImdbMetrics, TitleFilter, RegionSummary } from '@/lib/types';
import { getStreamingProvider, getImdbProvider } from '@/lib/providers/factory';
import { calculatePopularityScore } from '@/lib/scoring/popularity-score';
import { calculateGlobalScore } from '@/lib/scoring/global-score';
import { cacheService } from './cache-service';
import { getAllRegionCodes } from '@/lib/data/mock-regions';

/**
 * Main service for ranking titles
 * Orchestrates provider calls, caching, and score calculations
 */
class RankingService {
  /**
   * Get ranked titles for a specific region
   */
  async getRankedTitlesByRegion(regionCode: string): Promise<RankedTitle[]> {
    const cacheKey = `region:${regionCode}`;
    const cached = cacheService.get<RankedTitle[]>(cacheKey);

    if (cached) {
      console.log(`[RankingService] Cache hit for ${regionCode}, ${cached.length} titles`);
      return cached;
    }

    console.log(`[RankingService] Fetching data for ${regionCode}`);

    const streamingProvider = getStreamingProvider();
    const imdbProvider = getImdbProvider();

    // Get titles available in this region
    const titles = await streamingProvider.getNetflixTitlesByRegion(regionCode);
    console.log(`[RankingService] Got ${titles.length} titles from streaming provider for ${regionCode}`);

    // Get metrics for all titles
    const rankedTitles: RankedTitle[] = [];
    let metricsFound = 0;
    let metricsNotFound = 0;

    for (const title of titles) {
      const metrics = await imdbProvider.getTitleMetrics(title.imdbId);

      if (metrics) {
        metricsFound++;
        const popularityScore = calculatePopularityScore(metrics);

        rankedTitles.push({
          title,
          metrics,
          popularityScore,
          regionCoverageCount: title.netflixRegions.length,
        });
      } else {
        metricsNotFound++;
      }
    }

    console.log(`[RankingService] Metrics: ${metricsFound} found, ${metricsNotFound} not found for ${regionCode}`);
    console.log(`[RankingService] Final ranked titles count for ${regionCode}: ${rankedTitles.length}`);

    // Sort by popularity score (descending)
    rankedTitles.sort((a, b) => b.popularityScore - a.popularityScore);

    // Cache the result
    cacheService.set(cacheKey, rankedTitles);

    return rankedTitles;
  }

  /**
   * Get worldwide ranked titles with global scores
   */
  async getWorldwideRankedTitles(): Promise<RankedTitle[]> {
    const cacheKey = 'worldwide';
    const cached = cacheService.get<RankedTitle[]>(cacheKey);

    if (cached) {
      console.log('[RankingService] Cache hit for worldwide');
      return cached;
    }

    console.log('[RankingService] Fetching worldwide data');

    const streamingProvider = getStreamingProvider();
    const imdbProvider = getImdbProvider();

    // Get all regions
    const regions = await streamingProvider.getNetflixRegions();
    const allRegionCodes = regions.map((r) => r.code);

    // Aggregate all unique titles across all regions
    const titleMap = new Map<string, Title>();

    for (const regionCode of allRegionCodes) {
      const titles = await streamingProvider.getNetflixTitlesByRegion(regionCode);

      for (const title of titles) {
        if (!titleMap.has(title.imdbId)) {
          titleMap.set(title.imdbId, title);
        }
      }
    }

    // Get metrics and calculate scores for all titles
    const rankedTitles: RankedTitle[] = [];

    for (const title of titleMap.values()) {
      const metrics = await imdbProvider.getTitleMetrics(title.imdbId);

      if (metrics) {
        const popularityScore = calculatePopularityScore(metrics);
        const regionCount = title.netflixRegions.length;
        const globalScore = calculateGlobalScore(
          popularityScore,
          regionCount,
          allRegionCodes.length
        );

        rankedTitles.push({
          title,
          metrics,
          popularityScore,
          globalScore,
          regionCoverageCount: regionCount,
        });
      }
    }

    // Sort by global score (descending)
    rankedTitles.sort((a, b) => (b.globalScore || 0) - (a.globalScore || 0));

    // Cache the result
    cacheService.set(cacheKey, rankedTitles);

    return rankedTitles;
  }

  /**
   * Get summary for all regions (for map visualization)
   */
  async getAllRegionSummaries(): Promise<RegionSummary[]> {
    const cacheKey = 'region-summaries';
    const cached = cacheService.get<RegionSummary[]>(cacheKey);

    if (cached) {
      console.log('[RankingService] Cache hit for region summaries');
      return cached;
    }

    console.log('[RankingService] Fetching region summaries');

    const streamingProvider = getStreamingProvider();
    const regions = await streamingProvider.getNetflixRegions();

    const summaries: RegionSummary[] = [];

    for (const region of regions) {
      const rankedTitles = await this.getRankedTitlesByRegion(region.code);

      const movies = rankedTitles.filter((t) => t.title.type === 'movie');
      const tvShows = rankedTitles.filter((t) => t.title.type === 'tv');

      const topMovie = movies[0];
      const topTvShow = tvShows[0];
      const topOverall = rankedTitles[0];

      const averageScore =
        rankedTitles.length > 0
          ? rankedTitles.reduce((sum, t) => sum + t.popularityScore, 0) /
            rankedTitles.length
          : 0;

      summaries.push({
        region,
        topMovie,
        topTvShow,
        topOverall,
        totalTitles: rankedTitles.length,
        averagePopularityScore: Math.round(averageScore),
      });
    }

    // Cache the result
    cacheService.set(cacheKey, summaries);

    return summaries;
  }

  /**
   * Filter and sort ranked titles
   */
  filterAndSortTitles(titles: RankedTitle[], filter: TitleFilter): RankedTitle[] {
    let filtered = [...titles];

    // Filter by type
    if (filter.type && filter.type !== 'all') {
      filtered = filtered.filter((t) => t.title.type === filter.type);
    }

    // Filter by search term
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter((t) =>
        t.title.title.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    const sortBy = filter.sortBy || 'popularity';
    const sortOrder = filter.sortOrder || 'desc';

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'popularity':
          comparison = a.popularityScore - b.popularityScore;
          break;
        case 'rating':
          comparison = a.metrics.rating - b.metrics.rating;
          break;
        case 'voteCount':
          comparison = a.metrics.voteCount - b.metrics.voteCount;
          break;
        case 'regionCoverage':
          comparison =
            (a.regionCoverageCount || 0) - (b.regionCoverageCount || 0);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }
}

// Export singleton instance
export const rankingService = new RankingService();
