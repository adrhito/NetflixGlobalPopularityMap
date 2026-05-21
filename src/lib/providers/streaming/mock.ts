import { StreamingAvailabilityProvider } from './interface';
import { Region, Title } from '@/lib/types';
import {
  mockRegions,
  getRegionByCode,
} from '@/lib/data/mock-regions';
import {
  getAllMockTitles,
  getMockTitlesByRegion,
  getMockTitleByImdbId,
} from '@/lib/data/mock-titles';

/**
 * Mock implementation of streaming availability provider
 * Used when no real API is configured or as fallback
 */
export class MockStreamingProvider implements StreamingAvailabilityProvider {
  async getNetflixRegions(): Promise<Region[]> {
    // Simulate API delay
    await this.delay(100);
    return mockRegions;
  }

  async getNetflixTitlesByRegion(regionCode: string): Promise<Title[]> {
    await this.delay(150);
    const titlesWithMetrics = getMockTitlesByRegion(regionCode);
    return titlesWithMetrics.map((t) => t.title);
  }

  async getTitleAvailability(imdbId: string): Promise<{
    title: Title;
    availableRegions: string[];
  } | null> {
    await this.delay(100);
    const titleWithMetrics = getMockTitleByImdbId(imdbId);

    if (!titleWithMetrics) {
      return null;
    }

    return {
      title: titleWithMetrics.title,
      availableRegions: titleWithMetrics.title.netflixRegions,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
