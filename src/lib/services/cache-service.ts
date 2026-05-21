import { CacheEntry } from '@/lib/types';

/**
 * Simple in-memory cache service with TTL
 */
class CacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL: number = 15 * 60 * 1000; // 15 minutes in milliseconds

  /**
   * Get a value from cache
   * Returns null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set a value in cache with optional custom TTL
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expiresAt });
  }

  /**
   * Delete a specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clear expired entries (garbage collection)
   */
  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    keys: string[];
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const cacheService = new CacheService();

// Run garbage collection every 5 minutes
if (typeof window === 'undefined') {
  // Only run in server environment
  setInterval(() => {
    cacheService.clearExpired();
  }, 5 * 60 * 1000);
}
