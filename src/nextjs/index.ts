/*
 * index.ts
 * Main exports for Next.js Plugin
 * Universal exports that work in both App Router and Pages Router
 */

export { default as SeatmapCanvas } from './client/SeatmapCanvas';
export { useSeatmap } from './client/useSeatmap';
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
} from './types';
