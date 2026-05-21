import { ImdbMetrics } from '@/lib/types';
import {
  normalizeRating,
  normalizeVoteCount,
  normalizePopularityRank,
} from './normalization';

/**
 * Calculate popularity score for a title based on IMDb metrics
 *
 * Formula:
 * popularityScore = (ratingNormalized * 0.45) + (logVoteCountNormalized * 0.40) + (popularitySignalNormalized * 0.15)
 *
 * Weights:
 * - Rating (45%): Quality indicator
 * - Vote Count (40%): Engagement/reach indicator (log-scaled)
 * - Popularity Rank (15%): Trending/buzz indicator
 *
 * @returns Score from 0-100
 */
export function calculatePopularityScore(metrics: ImdbMetrics): number {
  // Normalize each component to 0-1 range
  const ratingNorm = normalizeRating(metrics.rating);
  const voteCountNorm = normalizeVoteCount(metrics.voteCount);
  const popularityNorm = metrics.popularityRank
    ? normalizePopularityRank(metrics.popularityRank)
    : 0;

  // Apply weights
  const WEIGHT_RATING = 0.45;
  const WEIGHT_VOTES = 0.40;
  const WEIGHT_POPULARITY = 0.15;

  const weightedScore =
    ratingNorm * WEIGHT_RATING +
    voteCountNorm * WEIGHT_VOTES +
    popularityNorm * WEIGHT_POPULARITY;

  // Scale to 0-100
  return Math.round(weightedScore * 100);
}

/**
 * Calculate popularity score with custom weights
 */
export function calculatePopularityScoreCustom(
  metrics: ImdbMetrics,
  weights: {
    rating: number;
    voteCount: number;
    popularity: number;
  }
): number {
  const ratingNorm = normalizeRating(metrics.rating);
  const voteCountNorm = normalizeVoteCount(metrics.voteCount);
  const popularityNorm = metrics.popularityRank
    ? normalizePopularityRank(metrics.popularityRank)
    : 0;

  const weightedScore =
    ratingNorm * weights.rating +
    voteCountNorm * weights.voteCount +
    popularityNorm * weights.popularity;

  return Math.round(weightedScore * 100);
}

/**
 * Get a breakdown of popularity score components for debugging/display
 */
export function getPopularityScoreBreakdown(metrics: ImdbMetrics): {
  totalScore: number;
  components: {
    rating: { raw: number; normalized: number; weighted: number };
    voteCount: { raw: number; normalized: number; weighted: number };
    popularityRank: { raw: number; normalized: number; weighted: number };
  };
} {
  const ratingNorm = normalizeRating(metrics.rating);
  const voteCountNorm = normalizeVoteCount(metrics.voteCount);
  const popularityNorm = metrics.popularityRank
    ? normalizePopularityRank(metrics.popularityRank)
    : 0;

  const WEIGHT_RATING = 0.45;
  const WEIGHT_VOTES = 0.40;
  const WEIGHT_POPULARITY = 0.15;

  return {
    totalScore: calculatePopularityScore(metrics),
    components: {
      rating: {
        raw: metrics.rating,
        normalized: ratingNorm,
        weighted: ratingNorm * WEIGHT_RATING * 100,
      },
      voteCount: {
        raw: metrics.voteCount,
        normalized: voteCountNorm,
        weighted: voteCountNorm * WEIGHT_VOTES * 100,
      },
      popularityRank: {
        raw: metrics.popularityRank || 0,
        normalized: popularityNorm,
        weighted: popularityNorm * WEIGHT_POPULARITY * 100,
      },
    },
  };
}
