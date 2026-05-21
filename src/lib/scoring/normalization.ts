/**
 * Normalization utilities for scoring calculations
 */

/**
 * Normalize a value to 0-1 range using min-max normalization
 */
export function normalizeMinMax(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Normalize IMDb rating (0-10) to 0-1 range
 */
export function normalizeRating(rating: number): number {
  return Math.max(0, Math.min(1, rating / 10));
}

/**
 * Normalize vote count using logarithmic scale
 * This handles the wide range of vote counts (hundreds to millions)
 */
export function normalizeVoteCount(voteCount: number): number {
  if (voteCount <= 0) return 0;

  // Use log10 scale with reasonable bounds
  const minLog = 2; // 100 votes (log10(100) = 2)
  const maxLog = 7; // 10 million votes (log10(10000000) = 7)

  const logVotes = Math.log10(voteCount);
  return normalizeMinMax(logVotes, minLog, maxLog);
}

/**
 * Normalize popularity rank (lower is better)
 * Inverts the scale so higher normalized value = better rank
 */
export function normalizePopularityRank(rank: number): number {
  if (rank <= 0) return 0;

  // Ranks typically range from 1 to 10000+
  // Use inverse log scale to give more weight to top ranks
  const minRank = 1;
  const maxRank = 5000;

  // Invert: lower rank = higher normalized value
  const inverted = maxRank - Math.min(rank, maxRank);
  return normalizeMinMax(inverted, 0, maxRank - minRank);
}

/**
 * Normalize region coverage (number of regions where available)
 */
export function normalizeRegionCoverage(count: number, maxRegions: number = 15): number {
  return normalizeMinMax(count, 0, maxRegions);
}

/**
 * Normalize any generic metric with automatic min/max detection from dataset
 */
export function normalizeDataset(values: number[]): Map<number, number> {
  if (values.length === 0) return new Map();

  const min = Math.min(...values);
  const max = Math.max(...values);

  const normalized = new Map<number, number>();
  for (const value of values) {
    normalized.set(value, normalizeMinMax(value, min, max));
  }

  return normalized;
}
