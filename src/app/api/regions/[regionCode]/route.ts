import { NextResponse } from 'next/server';
import { rankingService } from '@/lib/services/ranking-service';
import { cacheService } from '@/lib/services/cache-service';
import { ApiResponse, RankedTitle } from '@/lib/types';

/**
 * GET /api/regions/[regionCode]
 * Returns ranked titles for a specific region
 * Query params:
 *  - clearCache=true: Clears cache before fetching
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ regionCode: string }> }
) {
  try {
    const { regionCode } = await params;
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    if (!regionCode) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Region code is required',
        timestamp: new Date(),
      };

      return NextResponse.json(response, { status: 400 });
    }

    if (clearCache) {
      console.log(`[API /api/regions/${regionCode}] Clearing cache`);
      cacheService.clear();
    }

    const rankedTitles = await rankingService.getRankedTitlesByRegion(
      regionCode.toUpperCase()
    );

    const response: ApiResponse<RankedTitle[]> = {
      success: true,
      data: rankedTitles,
      timestamp: new Date(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(`[API /api/regions/${(await params).regionCode}] Error:`, error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch region data',
      timestamp: new Date(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
