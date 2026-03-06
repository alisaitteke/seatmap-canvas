/*
 * utils.ts
 * SSG/ISR Utility Functions for Seatmap Canvas
 * Helpers for static generation and incremental static regeneration
 */

import type { BlockData, Venue } from '../types';

/**
 * Generate static params for dynamic routes
 * Use with generateStaticParams in App Router
 * @param venues - Array of venues to generate params for
 * @returns Array of param objects for static generation
 */
export function generateSeatmapStaticParams(venues: Venue[]) {
  return venues.map((venue) => ({
    id: venue.id,
  }));
}

/**
 * Get static props for seatmap (Pages Router compatible)
 * @param venueId - Venue identifier
 * @param revalidate - ISR revalidation time in seconds (default: 3600 = 1 hour)
 * @returns Props object with data and revalidation settings
 */
export async function getStaticSeatmapProps(
  venueId: string,
  revalidate: number = 3600
): Promise<{
  props: { data: BlockData[]; venueId: string };
  revalidate: number;
}> {
  const data = await fetchSeatmapData(venueId);

  return {
    props: {
      data,
      venueId,
    },
    revalidate,
  };
}

/**
 * Get server-side props for seatmap (Pages Router SSR)
 * @param venueId - Venue identifier
 * @returns Props object with fresh data
 */
export async function getServerSideSeatmapProps(venueId: string): Promise<{
  props: { data: BlockData[]; venueId: string };
}> {
  const data = await fetchSeatmapData(venueId);

  return {
    props: {
      data,
      venueId,
    },
  };
}

/**
 * Fetch seatmap data (internal helper)
 * Replace with actual data fetching logic
 * @param venueId - Venue identifier
 * @returns Block data array
 */
async function fetchSeatmapData(venueId: string): Promise<BlockData[]> {
  // Example implementation - replace with actual data source
  try {
    // Option 1: Fetch from API
    const response = await fetch(`${process.env.API_URL}/venues/${venueId}/seatmap`, {
      next: { tags: ['seatmap', `venue-${venueId}`] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch venue ${venueId}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching seatmap data for venue ${venueId}:`, error);
    
    // Return empty array or throw based on your error handling strategy
    return [];
  }
}

/**
 * Generate metadata for seatmap page (App Router)
 * @param venueId - Venue identifier
 * @returns Metadata object for Next.js
 */
export async function generateSeatmapMetadata(venueId: string) {
  try {
    // Fetch venue information
    const venueInfo = await fetchVenueInfo(venueId);

    return {
      title: `${venueInfo.name} - Seat Selection`,
      description: `Select your seats at ${venueInfo.name}. Interactive seat map with real-time availability.`,
      openGraph: {
        title: `${venueInfo.name} - Seat Selection`,
        description: `Select your seats at ${venueInfo.name}`,
        images: venueInfo.image ? [venueInfo.image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Seat Selection',
      description: 'Interactive seat selection',
    };
  }
}

/**
 * Fetch venue information (internal helper)
 * @param venueId - Venue identifier
 * @returns Venue information
 */
async function fetchVenueInfo(venueId: string): Promise<Venue> {
  // Example implementation
  try {
    const response = await fetch(`${process.env.API_URL}/venues/${venueId}`, {
      next: { tags: [`venue-${venueId}`], revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch venue info ${venueId}`);
    }

    return await response.json();
  } catch (error) {
    // Return default venue info
    return {
      id: venueId,
      name: 'Venue',
      description: '',
    };
  }
}

/**
 * Preload seatmap data for better performance
 * Use in layout or page components
 * @param venueId - Venue identifier
 */
export function preloadSeatmapData(venueId: string) {
  void fetchSeatmapData(venueId);
}

/**
 * Cache configuration for seatmap data
 */
export const SEATMAP_CACHE_CONFIG = {
  revalidate: 3600, // 1 hour
  tags: ['seatmap'],
} as const;

/**
 * Generate cache tags for venue-specific seatmap
 * @param venueId - Venue identifier
 * @returns Array of cache tags
 */
export function getSeatmapCacheTags(venueId: string): string[] {
  return ['seatmap', `venue-${venueId}`, `seatmap-${venueId}`];
}
