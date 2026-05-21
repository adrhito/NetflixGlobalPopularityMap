import { Region } from '@/lib/types';

/**
 * Mock Netflix regions with geographic metadata
 * Based on actual Netflix availability as of 2024
 */
export const mockRegions: Region[] = [
  {
    code: 'US',
    name: 'United States',
    geoId: 'USA',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    geoId: 'GBR',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'BR',
    name: 'Brazil',
    geoId: 'BRA',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'JP',
    name: 'Japan',
    geoId: 'JPN',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'IN',
    name: 'India',
    geoId: 'IND',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'DE',
    name: 'Germany',
    geoId: 'DEU',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'FR',
    name: 'France',
    geoId: 'FRA',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'ES',
    name: 'Spain',
    geoId: 'ESP',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'IT',
    name: 'Italy',
    geoId: 'ITA',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'CA',
    name: 'Canada',
    geoId: 'CAN',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'AU',
    name: 'Australia',
    geoId: 'AUS',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'MX',
    name: 'Mexico',
    geoId: 'MEX',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'KR',
    name: 'South Korea',
    geoId: 'KOR',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'NL',
    name: 'Netherlands',
    geoId: 'NLD',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    code: 'SE',
    name: 'Sweden',
    geoId: 'SWE',
    lastUpdated: new Date('2024-01-15'),
  },
];

export const getRegionByCode = (code: string): Region | undefined => {
  return mockRegions.find((r) => r.code === code);
};

export const getAllRegionCodes = (): string[] => {
  return mockRegions.map((r) => r.code);
};
