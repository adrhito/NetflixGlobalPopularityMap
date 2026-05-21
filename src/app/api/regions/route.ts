import { NextResponse } from 'next/server';
import { rankingService } from '@/lib/services/ranking-service';
import { ApiResponse, RegionSummary } from '@/lib/types';

/**
 * GET /api/regions
 * Returns all regions with their top title summaries
 */
export async function GET() {
  try {
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
