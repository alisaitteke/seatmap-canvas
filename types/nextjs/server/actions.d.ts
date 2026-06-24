import type { BlockData, ServerActionResult } from '../types';
export declare function loadSeatmapData(venueId: string): Promise<ServerActionResult<BlockData[]>>;
export declare function selectSeats(seatIds: string[], blockId: string): Promise<ServerActionResult>;
export declare function unselectSeats(seatIds: string[], blockId: string): Promise<ServerActionResult>;
export declare function reserveSeats(venueId: string, seats: Array<{
    blockId: string;
    seatId: string;
}>, userId?: string): Promise<ServerActionResult<{
    reservationId: string;
}>>;
export declare function cancelReservation(reservationId: string): Promise<ServerActionResult>;
export declare function getSeatAvailability(venueId: string, blockId?: string): Promise<ServerActionResult<{
    available: number;
    total: number;
}>>;
