/*
 * actions.ts
 * Server Actions for Seatmap Canvas
 * Handles server-side data operations and mutations
 */

'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import type { BlockData, ServerActionResult } from '../types';

/**
 * Load seatmap data from a data source
 * @param venueId - Venue identifier (sanitized)
 * @returns Server action result with block data
 */
export async function loadSeatmapData(venueId: string): Promise<ServerActionResult<BlockData[]>> {
  try {
    // Validate and sanitize venueId to prevent SSRF
    if (!venueId || typeof venueId !== 'string') {
      return {
        success: false,
        error: 'Invalid venue ID',
      };
    }

    // Only allow alphanumeric characters and hyphens
    const sanitizedVenueId = venueId.replace(/[^a-zA-Z0-9-]/g, '');
    
    if (sanitizedVenueId !== venueId) {
      return {
        success: false,
        error: 'Invalid venue ID format',
      };
    }

    // Use a whitelist approach - construct URL from trusted base
    const baseUrl = process.env.API_URL || 'https://api.example.com';
    const url = `${baseUrl}/venues/${sanitizedVenueId}/seatmap`;

    const response = await fetch(url, {
      next: { tags: ['seatmap'], revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to load seatmap data: ${response.statusText}`,
      };
    }

    const data: BlockData[] = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Select multiple seats (server-side processing)
 * @param seatIds - Array of seat IDs to select
 * @param blockId - Block ID containing the seats
 * @returns Server action result
 */
export async function selectSeats(
  seatIds: string[],
  blockId: string
): Promise<ServerActionResult> {
  try {
    // Example server-side seat selection logic
    // Replace with actual API call or database operation
    
    // Validate seats are available
    // Save selection to database/session
    // Update cache/revalidate as needed
    
    console.log(`Selecting seats: ${seatIds.join(', ')} in block ${blockId}`);

    // Revalidate related paths if needed
    revalidateTag('seatmap');
    
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to select seats',
    };
  }
}

/**
 * Unselect seats (server-side processing)
 * @param seatIds - Array of seat IDs to unselect
 * @param blockId - Block ID containing the seats
 * @returns Server action result
 */
export async function unselectSeats(
  seatIds: string[],
  blockId: string
): Promise<ServerActionResult> {
  try {
    console.log(`Unselecting seats: ${seatIds.join(', ')} in block ${blockId}`);

    // Server-side unselection logic
    revalidateTag('seatmap');
    
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to unselect seats',
    };
  }
}

/**
 * Reserve selected seats
 * @param venueId - Venue identifier
 * @param seats - Array of seat selections with block and seat IDs
 * @param userId - User making the reservation
 * @returns Server action result with reservation ID
 */
export async function reserveSeats(
  venueId: string,
  seats: Array<{ blockId: string; seatId: string }>,
  userId?: string
): Promise<ServerActionResult<{ reservationId: string }>> {
  try {
    // Example reservation logic
    // 1. Validate seats are still available
    // 2. Create reservation in database
    // 3. Lock seats temporarily
    // 4. Return reservation ID

    const reservationId = `res-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log(`Creating reservation ${reservationId} for ${seats.length} seats`);

    // Revalidate to show updated availability
    revalidatePath(`/venue/${venueId}`);
    revalidateTag('seatmap');
    
    return {
      success: true,
      data: { reservationId },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reserve seats',
    };
  }
}

/**
 * Cancel a reservation
 * @param reservationId - Reservation to cancel
 * @returns Server action result
 */
export async function cancelReservation(
  reservationId: string
): Promise<ServerActionResult> {
  try {
    console.log(`Cancelling reservation ${reservationId}`);

    // Server-side cancellation logic
    // 1. Find reservation
    // 2. Release seat locks
    // 3. Update database

    revalidateTag('seatmap');
    
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel reservation',
    };
  }
}

/**
 * Get seat availability status
 * @param venueId - Venue identifier
 * @param blockId - Optional block filter
 * @returns Server action result with availability data
 */
export async function getSeatAvailability(
  venueId: string,
  blockId?: string
): Promise<ServerActionResult<{ available: number; total: number }>> {
  try {
    // Example availability check
    // Query database for current seat status

    const availability = {
      available: 150,
      total: 200,
    };

    return {
      success: true,
      data: availability,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get availability',
    };
  }
}
