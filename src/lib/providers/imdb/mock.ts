import { ImdbProvider } from './interface';
import { ImdbMetrics } from '@/lib/types';
import { getMockTitleByImdbId, getAllMockTitles } from '@/lib/data/mock-titles';

/**
 * Mock implementation of IMDb provider
 * Used when no real API is configured or as fallback
 */
export class MockImdbProvider implements ImdbProvider {
  async getTitleMetrics(imdbId: string): Promise<ImdbMetrics | null> {
    await this.delay(100);
    const titleData = getMockTitleByImdbId(imdbId);
    return titleData?.metrics || null;
  }

  async searchTitle(
    titleName: string,
    year?: number
  ): Promise<{ imdbId: string; title: string; year: number }[] | null> {
    await this.delay(150);
    const allTitles = getAllMockTitles();
    const searchTerm = titleName.toLowerCase();

    const matches = allTitles
      .filter((t) => {
        const titleMatch = t.title.title.toLowerCase().includes(searchTerm);
        const yearMatch = year ? t.title.year === year : true;
        return titleMatch && yearMatch;
      })
      .map((t) => ({
        imdbId: t.title.imdbId,
        title: t.title.title,
        year: t.title.year,
      }))
      .slice(0, 10); // Limit to 10 results

    return matches.length > 0 ? matches : null;
  }

  async batchGetTitleMetrics(imdbIds: string[]): Promise<Map<string, ImdbMetrics>> {
    await this.delay(200);
    const metricsMap = new Map<string, ImdbMetrics>();

    for (const imdbId of imdbIds) {
      const metrics = await this.getTitleMetrics(imdbId);
      if (metrics) {
        metricsMap.set(imdbId, metrics);
      }
    }

    return metricsMap;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
