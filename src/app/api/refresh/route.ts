import { NextResponse } from 'next/server';
import { cacheService } from '@/lib/services/cache-service';
import { resetProviders } from '@/lib/providers/factory';
import { ApiResponse } from '@/lib/types';

/**
 * POST /api/refresh
 * Clears cache and resets providers
 * Requires admin token for production use
 */
export async function POST(request: Request) {
  try {
    // Check for admin token in production
    if (process.env.NODE_ENV === 'production') {
      const authHeader = request.headers.get('authorization');
      const adminToken = process.env.ADMIN_REFRESH_TOKEN;

      if (!adminToken || authHeader !== `Bearer ${adminToken}`) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Unauthorized',
          timestamp: new Date(),
        };

        return NextResponse.json(response, { status: 401 });
      }
    }

    // Clear cache
    cacheService.clear();

    // Reset providers (they'll be recreated on next request)
    resetProviders();

    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Cache cleared and providers reset successfully',
      },
      timestamp: new Date(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /api/refresh] Error:', error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to refresh data',
      timestamp: new Date(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
