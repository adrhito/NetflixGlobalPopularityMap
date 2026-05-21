import { StreamingAvailabilityProvider } from './streaming/interface';
import { ImdbProvider } from './imdb/interface';
import { MockStreamingProvider } from './streaming/mock';
import { TmdbStreamingProvider } from './streaming/tmdb';
import { MockImdbProvider } from './imdb/mock';
import { TmdbImdbProvider } from './imdb/tmdb';

/**
 * Provider factory that selects implementations based on environment configuration
 */

let streamingProviderInstance: StreamingAvailabilityProvider | null = null;
let imdbProviderInstance: ImdbProvider | null = null;

/**
 * Get the streaming availability provider
 * Uses TMDb if API key is configured, otherwise falls back to mock
 */
export function getStreamingProvider(): StreamingAvailabilityProvider {
  if (streamingProviderInstance) {
    return streamingProviderInstance;
  }

  const useMock = process.env.USE_MOCK_DATA === 'true';
  const tmdbApiKey = process.env.TMDB_API_KEY;

  if (!useMock && tmdbApiKey) {
    console.log('[Provider] Using TMDb for streaming data');
    streamingProviderInstance = new TmdbStreamingProvider(tmdbApiKey);
  } else {
    console.log('[Provider] Using mock streaming data');
    streamingProviderInstance = new MockStreamingProvider();
  }

  return streamingProviderInstance;
}

/**
 * Get the IMDb metrics provider
 * Uses TMDb if API key is configured, otherwise falls back to mock
 */
export function getImdbProvider(): ImdbProvider {
  if (imdbProviderInstance) {
    return imdbProviderInstance;
  }

  const useMock = process.env.USE_MOCK_DATA === 'true';
  const tmdbApiKey = process.env.TMDB_API_KEY;

  if (!useMock && tmdbApiKey) {
    console.log('[Provider] Using TMDb for IMDb data');
    imdbProviderInstance = new TmdbImdbProvider(tmdbApiKey);
  } else {
    console.log('[Provider] Using mock IMDb data');
    imdbProviderInstance = new MockImdbProvider();
  }

  return imdbProviderInstance;
}

/**
 * Reset provider instances (useful for testing or reconfiguration)
 */
export function resetProviders(): void {
  streamingProviderInstance = null;
  imdbProviderInstance = null;
}
