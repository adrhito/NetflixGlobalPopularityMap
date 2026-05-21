import { normalizeRegionCoverage } from './normalization';

/**
 * Calculate global score for a title based on popularity and regional availability
 *
 * Formula:
 * globalScore = popularityScore * 0.75 + regionCoverageNormalized * 0.25
 *
 * Weights:
 * - Popularity Score (75%): Quality/engagement indicator
 * - Region Coverage (25%): Global reach indicator
 *
 * @param popularityScore Score from 0-100
 * @param regionCount Number of regions where available
 * @param maxRegions Total number of possible regions (default: 15)
 * @returns Score from 0-100
 */
export function calculateGlobalScore(
  popularityScore: number,
  regionCount: number,
  maxRegions: number = 15
): number {
  // Normalize region coverage to 0-1
  const regionCoverageNorm = normalizeRegionCoverage(regionCount, maxRegions);

  // Popularity score is already 0-100, convert to 0-1
  const popularityNorm = popularityScore / 100;

  // Apply weights
  const WEIGHT_POPULARITY = 0.75;
  const WEIGHT_COVERAGE = 0.25;

  const weightedScore =
    popularityNorm * WEIGHT_POPULARITY +
    regionCoverageNorm * WEIGHT_COVERAGE;

  // Scale to 0-100
  return Math.round(weightedScore * 100);
}

/**
 * Calculate global score with custom weights
 */
export function calculateGlobalScoreCustom(
  popularityScore: number,
  regionCount: number,
  maxRegions: number,
  weights: {
    popularity: number;
    coverage: number;
  }
): number {
  const regionCoverageNorm = normalizeRegionCoverage(regionCount, maxRegions);
  const popularityNorm = popularityScore / 100;

  const weightedScore =
    popularityNorm * weights.popularity +
    regionCoverageNorm * weights.coverage;

  return Math.round(weightedScore * 100);
}

/**
 * Get a breakdown of global score components for debugging/display
 */
export function getGlobalScoreBreakdown(
  popularityScore: number,
  regionCount: number,
  maxRegions: number = 15
): {
  totalScore: number;
  components: {
    popularity: { raw: number; normalized: number; weighted: number };
    regionCoverage: { raw: number; normalized: number; weighted: number };
  };
} {
  const regionCoverageNorm = normalizeRegionCoverage(regionCount, maxRegions);
  const popularityNorm = popularityScore / 100;

  const WEIGHT_POPULARITY = 0.75;
  const WEIGHT_COVERAGE = 0.25;

  return {
    totalScore: calculateGlobalScore(popularityScore, regionCount, maxRegions),
    components: {
      popularity: {
        raw: popularityScore,
        normalized: popularityNorm,
        weighted: popularityNorm * WEIGHT_POPULARITY * 100,
      },
      regionCoverage: {
        raw: regionCount,
        normalized: regionCoverageNorm,
        weighted: regionCoverageNorm * WEIGHT_COVERAGE * 100,
      },
    },
  };
}
