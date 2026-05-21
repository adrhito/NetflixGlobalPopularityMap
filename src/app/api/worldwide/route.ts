import { NextResponse } from 'next/server';
import { rankingService } from '@/lib/services/ranking-service';
import { ApiResponse, RankedTitle } from '@/lib/types';

/**
 * GET /api/worldwide
 * Returns worldwide ranked titles with global scores
 */
export async function GET() {
  try {
    const rankedTitles = await rankingService.getWorldwideRankedTitles();

    const response: ApiResponse<RankedTitle[]> = {
      success: true,
      data: rankedTitles,
      timestamp: new Date(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /api/worldwide] Error:', error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch worldwide data',
      timestamp: new Date(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
