/*
 * app-router/index.ts
 * App Router specific exports for Next.js Plugin
 * Includes Server Components, Server Actions, and SSG utilities
 */

// Client Components
export { default as SeatmapCanvas } from '../client/SeatmapCanvas';
export { useSeatmap } from '../client/useSeatmap';

// Server Components
export { SeatmapServerWrapper } from '../server/SeatmapServerWrapper';
export { SeatmapSkeleton } from '../server/SeatmapSkeleton';

// Server Actions
export {
  loadSeatmapData,
  selectSeats,
  unselectSeats,
  reserveSeats,
  cancelReservation,
  getSeatAvailability,
} from '../server/actions';

// SSG/ISR Utilities
export {
  generateSeatmapStaticParams,
  getStaticSeatmapProps,
  getServerSideSeatmapProps,
  generateSeatmapMetadata,
  preloadSeatmapData,
  getSeatmapCacheTags,
  SEATMAP_CACHE_CONFIG,
} from '../server/utils';

// Types
export type {
  SeatmapOptions,
  SeatmapCanvasProps,
  SeatClickEvent,
  BlockData,
  SeatData,
  UseSeatmapReturn,
  SeatmapCanvasRef,
  SeatmapServerWrapperProps,
  ServerActionResult,
  SeatmapSkeletonProps,
  Venue,
} from '../types';
