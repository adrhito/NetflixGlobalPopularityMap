import { Title, ImdbMetrics } from '@/lib/types';

/**
 * Mock Netflix titles with realistic distribution:
 * - Global blockbusters: 10+ regions, ratings 8.0+
 * - Regional favorites: 2-5 regions, ratings 7.0-8.5
 * - Niche content: 1-3 regions, varied ratings
 */

export interface MockTitleWithMetrics {
  title: Title;
  metrics: ImdbMetrics;
}

export const mockTitlesData: MockTitleWithMetrics[] = [
  // GLOBAL BLOCKBUSTERS - Available in 10+ regions
  {
    title: {
      imdbId: 'tt1517268',
      title: 'Barbie',
      type: 'movie',
      year: 2023,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 6.8,
      voteCount: 489000,
      popularityRank: 45,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt15398776',
      title: 'Oppenheimer',
      type: 'movie',
      year: 2023,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'NL', 'SE'],
    },
    metrics: {
      rating: 8.3,
      voteCount: 712000,
      popularityRank: 23,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt1745960',
      title: 'Top Gun: Maverick',
      type: 'movie',
      year: 2022,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'NL'],
    },
    metrics: {
      rating: 8.2,
      voteCount: 634000,
      popularityRank: 31,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt6791350',
      title: 'Guardians of the Galaxy Vol. 3',
      type: 'movie',
      year: 2023,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR'],
    },
    metrics: {
      rating: 7.9,
      voteCount: 402000,
      popularityRank: 58,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt9362722',
      title: 'Spider-Man: Across the Spider-Verse',
      type: 'movie',
      year: 2023,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL'],
    },
    metrics: {
      rating: 8.6,
      voteCount: 378000,
      popularityRank: 42,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt14230458',
      title: 'Poor Things',
      type: 'movie',
      year: 2023,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjktNDE3MC00YWQyLWEyMmEtN2ZmNzZhZDk3NGJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'NL', 'SE'],
    },
    metrics: {
      rating: 7.9,
      voteCount: 201000,
      popularityRank: 89,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt0111161',
      title: 'The Shawshank Redemption',
      type: 'movie',
      year: 1994,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'KR', 'NL'],
    },
    metrics: {
      rating: 9.3,
      voteCount: 2800000,
      popularityRank: 12,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt0468569',
      title: 'The Dark Knight',
      type: 'movie',
      year: 2008,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 9.0,
      voteCount: 2700000,
      popularityRank: 15,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt1375666',
      title: 'Inception',
      type: 'movie',
      year: 2010,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL'],
    },
    metrics: {
      rating: 8.8,
      voteCount: 2400000,
      popularityRank: 18,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt0816692',
      title: 'Interstellar',
      type: 'movie',
      year: 2014,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 8.7,
      voteCount: 1900000,
      popularityRank: 21,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },

  // GLOBAL TV SHOWS
  {
    title: {
      imdbId: 'tt0903747',
      title: 'Breaking Bad',
      type: 'tv',
      year: 2008,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 9.5,
      voteCount: 2100000,
      popularityRank: 8,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt0944947',
      title: 'Game of Thrones',
      type: 'tv',
      year: 2011,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'NL', 'SE'],
    },
    metrics: {
      rating: 9.2,
      voteCount: 2200000,
      popularityRank: 10,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt1190634',
      title: 'The Boys',
      type: 'tv',
      year: 2019,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzhjZjhjZTUtYWJlNi00ZDNhLTg4MTItNzU5OWRmYzk4YmJkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR'],
    },
    metrics: {
      rating: 8.7,
      voteCount: 689000,
      popularityRank: 27,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt5180504',
      title: 'The Witcher',
      type: 'tv',
      year: 2019,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 8.0,
      voteCount: 502000,
      popularityRank: 48,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt2861424',
      title: 'Rick and Morty',
      type: 'tv',
      year: 2013,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'DE', 'FR', 'ES', 'CA', 'AU', 'MX', 'KR', 'NL'],
    },
    metrics: {
      rating: 9.1,
      voteCount: 578000,
      popularityRank: 34,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt2707408',
      title: 'Narcos',
      type: 'tv',
      year: 2015,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmFjODU3YzgtMGQ5ZC00YzVhLWI4NzgtOTI2MmM2MzFhNDVmXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'NL', 'SE'],
    },
    metrics: {
      rating: 8.8,
      voteCount: 471000,
      popularityRank: 52,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt0417299',
      title: 'Avatar: The Last Airbender',
      type: 'tv',
      year: 2005,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'CA', 'AU', 'KR', 'NL'],
    },
    metrics: {
      rating: 9.3,
      voteCount: 362000,
      popularityRank: 61,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt2243973',
      title: 'Stranger Things',
      type: 'tv',
      year: 2016,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 8.7,
      voteCount: 1200000,
      popularityRank: 14,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt7991608',
      title: 'Squid Game',
      type: 'tv',
      year: 2021,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTJkZjdmOTUtOTJjZS00MDI4LWJkM2YtZTE4OWZjZWEzZTRjXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'IN', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL', 'SE'],
    },
    metrics: {
      rating: 8.0,
      voteCount: 678000,
      popularityRank: 28,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt8111088',
      title: 'The Mandalorian',
      type: 'tv',
      year: 2019,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
      netflixRegions: ['US', 'GB', 'BR', 'JP', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'MX', 'KR', 'NL'],
    },
    metrics: {
      rating: 8.6,
      voteCount: 543000,
      popularityRank: 39,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },

  // REGIONAL FAVORITES - 2-5 regions
  {
    title: {
      imdbId: 'tt10648342',
      title: 'Thor: Love and Thunder',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'CA', 'AU', 'GB'],
    },
    metrics: {
      rating: 6.3,
      voteCount: 412000,
      popularityRank: 134,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt4154796',
      title: 'Avengers: Endgame',
      type: 'movie',
      year: 2019,
      netflixRegions: ['US', 'GB', 'CA', 'AU', 'MX'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 1300000,
      popularityRank: 13,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt4154756',
      title: 'Avengers: Infinity War',
      type: 'movie',
      year: 2018,
      netflixRegions: ['US', 'GB', 'BR', 'CA', 'AU'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 1200000,
      popularityRank: 16,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt6751668',
      title: 'Parasite',
      type: 'movie',
      year: 2019,
      netflixRegions: ['KR', 'JP', 'US', 'GB', 'FR'],
    },
    metrics: {
      rating: 8.5,
      voteCount: 892000,
      popularityRank: 24,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt8267604',
      title: 'Capernaum',
      type: 'movie',
      year: 2018,
      netflixRegions: ['FR', 'DE', 'IT'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 96000,
      popularityRank: 512,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt5311514',
      title: 'Your Name',
      type: 'movie',
      year: 2016,
      netflixRegions: ['JP', 'KR', 'US', 'GB'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 298000,
      popularityRank: 167,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10272386',
      title: 'The French Dispatch',
      type: 'movie',
      year: 2021,
      netflixRegions: ['US', 'FR', 'GB'],
    },
    metrics: {
      rating: 7.1,
      voteCount: 141000,
      popularityRank: 345,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11286314',
      title: 'Don\'t Look Up',
      type: 'movie',
      year: 2021,
      netflixRegions: ['US', 'GB', 'BR', 'DE', 'FR'],
    },
    metrics: {
      rating: 7.2,
      voteCount: 658000,
      popularityRank: 98,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10648342',
      title: 'Doctor Strange in the Multiverse of Madness',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'CA', 'GB', 'AU'],
    },
    metrics: {
      rating: 6.9,
      voteCount: 476000,
      popularityRank: 128,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt7638348',
      title: 'The Batman',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'GB', 'CA', 'AU', 'DE'],
    },
    metrics: {
      rating: 7.8,
      voteCount: 789000,
      popularityRank: 67,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt9376612',
      title: 'Shang-Chi and the Legend of the Ten Rings',
      type: 'movie',
      year: 2021,
      netflixRegions: ['US', 'GB', 'CA', 'AU'],
    },
    metrics: {
      rating: 7.4,
      voteCount: 471000,
      popularityRank: 156,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10366206',
      title: 'John Wick: Chapter 4',
      type: 'movie',
      year: 2023,
      netflixRegions: ['US', 'GB', 'BR', 'DE', 'FR'],
    },
    metrics: {
      rating: 7.7,
      voteCount: 412000,
      popularityRank: 78,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt1160419',
      title: 'Dune',
      type: 'movie',
      year: 2021,
      netflixRegions: ['US', 'GB', 'FR', 'DE'],
    },
    metrics: {
      rating: 8.0,
      voteCount: 702000,
      popularityRank: 54,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt6264654',
      title: 'Free Guy',
      type: 'movie',
      year: 2021,
      netflixRegions: ['US', 'CA', 'GB'],
    },
    metrics: {
      rating: 7.1,
      voteCount: 456000,
      popularityRank: 142,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt1877830',
      title: 'The Batman',
      type: 'movie',
      year: 2022,
      netflixRegions: ['BR', 'MX', 'ES'],
    },
    metrics: {
      rating: 7.8,
      voteCount: 234000,
      popularityRank: 189,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11138512',
      title: 'The Noel Diary',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'GB', 'CA'],
    },
    metrics: {
      rating: 6.9,
      voteCount: 21000,
      popularityRank: 2341,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10298810',
      title: 'Glass Onion: A Knives Out Mystery',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'GB', 'CA', 'AU', 'DE'],
    },
    metrics: {
      rating: 7.2,
      voteCount: 298000,
      popularityRank: 112,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10954984',
      title: 'Nope',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'GB', 'CA'],
    },
    metrics: {
      rating: 6.8,
      voteCount: 298000,
      popularityRank: 234,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt8847712',
      title: 'The French Dispatch',
      type: 'movie',
      year: 2021,
      netflixRegions: ['FR', 'DE', 'IT'],
    },
    metrics: {
      rating: 7.4,
      voteCount: 124000,
      popularityRank: 412,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt9032400',
      title: 'Eternals',
      type: 'movie',
      year: 2021,
      netflixRegions: ['US', 'GB', 'BR', 'MX'],
    },
    metrics: {
      rating: 6.3,
      voteCount: 389000,
      popularityRank: 267,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11564570',
      title: 'Glass Onion',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'CA', 'AU'],
    },
    metrics: {
      rating: 7.3,
      voteCount: 187000,
      popularityRank: 198,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },

  // REGIONAL TV SHOWS
  {
    title: {
      imdbId: 'tt10155688',
      title: 'The Queen\'s Gambit',
      type: 'tv',
      year: 2020,
      netflixRegions: ['US', 'GB', 'DE', 'FR', 'IT'],
    },
    metrics: {
      rating: 8.5,
      voteCount: 598000,
      popularityRank: 36,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt2467372',
      title: 'Brooklyn Nine-Nine',
      type: 'tv',
      year: 2013,
      netflixRegions: ['US', 'GB', 'CA'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 378000,
      popularityRank: 98,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt7366338',
      title: 'Chernobyl',
      type: 'tv',
      year: 2019,
      netflixRegions: ['GB', 'DE', 'FR', 'IT'],
    },
    metrics: {
      rating: 9.3,
      voteCount: 834000,
      popularityRank: 19,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt6468322',
      title: 'Money Heist',
      type: 'tv',
      year: 2017,
      netflixRegions: ['ES', 'BR', 'MX', 'IT', 'FR'],
    },
    metrics: {
      rating: 8.2,
      voteCount: 589000,
      popularityRank: 43,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt9432978',
      title: 'The Last of Us',
      type: 'tv',
      year: 2023,
      netflixRegions: ['US', 'GB', 'CA', 'AU'],
    },
    metrics: {
      rating: 8.7,
      voteCount: 478000,
      popularityRank: 29,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10954600',
      title: 'Yellowstone',
      type: 'tv',
      year: 2018,
      netflixRegions: ['US', 'CA'],
    },
    metrics: {
      rating: 8.7,
      voteCount: 167000,
      popularityRank: 87,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt7908628',
      title: 'Peaky Blinders',
      type: 'tv',
      year: 2013,
      netflixRegions: ['GB', 'US', 'AU'],
    },
    metrics: {
      rating: 8.8,
      voteCount: 598000,
      popularityRank: 35,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt5290382',
      title: 'Mindhunter',
      type: 'tv',
      year: 2017,
      netflixRegions: ['US', 'GB', 'DE'],
    },
    metrics: {
      rating: 8.6,
      voteCount: 323000,
      popularityRank: 124,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt6763664',
      title: 'The Umbrella Academy',
      type: 'tv',
      year: 2019,
      netflixRegions: ['US', 'GB', 'CA', 'AU', 'BR'],
    },
    metrics: {
      rating: 7.9,
      voteCount: 278000,
      popularityRank: 143,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt7949218',
      title: 'Lupin',
      type: 'tv',
      year: 2021,
      netflixRegions: ['FR', 'DE', 'IT', 'ES'],
    },
    metrics: {
      rating: 7.5,
      voteCount: 89000,
      popularityRank: 412,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },

  // NICHE CONTENT - 1-3 regions
  {
    title: {
      imdbId: 'tt13444912',
      title: 'Everything Everywhere All at Once',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'GB'],
    },
    metrics: {
      rating: 7.8,
      voteCount: 512000,
      popularityRank: 72,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt1392190',
      title: 'Mad Max: Fury Road',
      type: 'movie',
      year: 2015,
      netflixRegions: ['AU'],
    },
    metrics: {
      rating: 8.1,
      voteCount: 1100000,
      popularityRank: 56,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt8721424',
      title: 'Ambulance',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US'],
    },
    metrics: {
      rating: 6.1,
      voteCount: 97000,
      popularityRank: 876,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11291274',
      title: 'The Pale Blue Eye',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'GB'],
    },
    metrics: {
      rating: 6.6,
      voteCount: 74000,
      popularityRank: 1234,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt2380307',
      title: 'Coco',
      type: 'movie',
      year: 2017,
      netflixRegions: ['MX', 'BR', 'ES'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 567000,
      popularityRank: 71,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11315808',
      title: 'The Sea Beast',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US'],
    },
    metrics: {
      rating: 7.0,
      voteCount: 56000,
      popularityRank: 1567,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt7984734',
      title: 'The Irishman',
      type: 'movie',
      year: 2019,
      netflixRegions: ['US', 'IT'],
    },
    metrics: {
      rating: 7.8,
      voteCount: 421000,
      popularityRank: 89,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt9663764',
      title: 'Extraction 2',
      type: 'movie',
      year: 2023,
      netflixRegions: ['US'],
    },
    metrics: {
      rating: 7.0,
      voteCount: 132000,
      popularityRank: 345,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10648342',
      title: 'Violent Night',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'CA'],
    },
    metrics: {
      rating: 6.7,
      voteCount: 78000,
      popularityRank: 987,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11291274',
      title: 'The Adam Project',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US', 'CA'],
    },
    metrics: {
      rating: 6.7,
      voteCount: 198000,
      popularityRank: 234,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt13024674',
      title: 'The School for Good and Evil',
      type: 'movie',
      year: 2022,
      netflixRegions: ['US'],
    },
    metrics: {
      rating: 5.9,
      voteCount: 45000,
      popularityRank: 2134,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt4593060',
      title: 'Mirzapur',
      type: 'tv',
      year: 2018,
      netflixRegions: ['IN'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 78000,
      popularityRank: 312,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10234724',
      title: 'Delhi Crime',
      type: 'tv',
      year: 2019,
      netflixRegions: ['IN'],
    },
    metrics: {
      rating: 8.5,
      voteCount: 42000,
      popularityRank: 789,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt6587640',
      title: 'Alice in Borderland',
      type: 'tv',
      year: 2020,
      netflixRegions: ['JP', 'KR'],
    },
    metrics: {
      rating: 7.7,
      voteCount: 98000,
      popularityRank: 234,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10919420',
      title: 'Squid Game',
      type: 'tv',
      year: 2021,
      netflixRegions: ['KR', 'JP', 'US'],
    },
    metrics: {
      rating: 8.0,
      voteCount: 623000,
      popularityRank: 33,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt12343534',
      title: 'All of Us Are Dead',
      type: 'tv',
      year: 2022,
      netflixRegions: ['KR'],
    },
    metrics: {
      rating: 7.5,
      voteCount: 87000,
      popularityRank: 456,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11737520',
      title: 'Trese',
      type: 'tv',
      year: 2021,
      netflixRegions: ['JP', 'KR'],
    },
    metrics: {
      rating: 6.9,
      voteCount: 12000,
      popularityRank: 3421,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt10160862',
      title: 'Wednesday',
      type: 'tv',
      year: 2022,
      netflixRegions: ['US', 'GB', 'BR'],
    },
    metrics: {
      rating: 8.1,
      voteCount: 312000,
      popularityRank: 76,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt4556462',
      title: 'Sunderland \'Til I Die',
      type: 'tv',
      year: 2018,
      netflixRegions: ['GB'],
    },
    metrics: {
      rating: 8.4,
      voteCount: 14000,
      popularityRank: 2987,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt9788486',
      title: 'Dark Desire',
      type: 'tv',
      year: 2020,
      netflixRegions: ['MX', 'BR', 'ES'],
    },
    metrics: {
      rating: 6.2,
      voteCount: 18000,
      popularityRank: 2134,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
  {
    title: {
      imdbId: 'tt11198330',
      title: 'Lupin',
      type: 'tv',
      year: 2021,
      netflixRegions: ['FR'],
    },
    metrics: {
      rating: 7.5,
      voteCount: 67000,
      popularityRank: 567,
      source: 'mock',
      fetchedAt: new Date('2024-01-15'),
    },
  },
];

/**
 * Get all mock titles
 */
export const getAllMockTitles = (): MockTitleWithMetrics[] => {
  return mockTitlesData;
};

/**
 * Get mock titles by region
 */
export const getMockTitlesByRegion = (regionCode: string): MockTitleWithMetrics[] => {
  return mockTitlesData.filter((t) => t.title.netflixRegions.includes(regionCode));
};

/**
 * Get mock title by IMDb ID
 */
export const getMockTitleByImdbId = (imdbId: string): MockTitleWithMetrics | undefined => {
  return mockTitlesData.find((t) => t.title.imdbId === imdbId);
};
