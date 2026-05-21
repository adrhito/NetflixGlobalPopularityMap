import { NextResponse } from 'next/server';
import { rankingService } from '@/lib/services/ranking-service';
import { cacheService } from '@/lib/services/cache-service';
import { ApiResponse, RegionSummary } from '@/lib/types';

/**
 * GET /api/regions
 * Returns all regions with their top title summaries
 * Query params:
 *  - clearCache=true: Clears cache before fetching
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    if (clearCache) {
      console.log('[API /api/regions] Clearing cache');
      cacheService.clear();
    }

    const summaries = await rankingService.getAllRegionSummaries();

    const response: ApiResponse<RegionSummary[]> = {
      success: true,
      data: summaries,
      timestamp: new Date(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /api/regions] Error:', error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch regions',
      timestamp: new Date(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
