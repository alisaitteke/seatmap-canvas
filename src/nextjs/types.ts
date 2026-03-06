/*
 * types.ts
 * Next.js Plugin Types for Seatmap Canvas
 */

import type { SeatMapCanvas } from '../lib/canvas.index';
import type DefaultsModel from '../lib/models/defaults.model';
import type { ReactNode } from 'react';

export interface SeatmapOptions extends Partial<DefaultsModel> {
  [key: string]: any;
  prefetch?: boolean;
  revalidate?: number;
}

export interface SeatClickEvent {
  id: string;
  x: number;
  y: number;
  color: string;
  salable: boolean;
  custom_data?: any;
  note?: string;
  tags?: any;
  title?: string;
  isSelected: () => boolean;
  select: () => void;
  unSelect: () => void;
}

export interface BlockData {
  id: string;
  title: string;
  labels?: any[];
  color?: string;
  seats: SeatData[];
  gap?: number;
  background_image?: string;
  background_opacity?: number;
  background_fit?: 'cover' | 'contain' | 'fill' | 'none';
  background_x?: number;
  background_y?: number;
  background_width?: number;
  background_height?: number;
}

export interface SeatData {
  id: string;
  x: number;
  y: number;
  color?: string;
  salable?: boolean;
  custom_data?: any;
  note?: string;
  tags?: any;
  title?: string;
}

export interface SeatmapCanvasProps {
  options?: SeatmapOptions;
  data?: BlockData[];
  className?: string;
  style?: React.CSSProperties;
  autoZoomToVenue?: boolean;
  onReady?: (instance: SeatMapCanvas) => void;
  onSeatClick?: (seat: any) => void;
  onSeatSelect?: (seat: any) => void;
  onSeatUnselect?: (seat: any) => void;
  onBlockClick?: (block: any) => void;
  onDataChange?: (data: BlockData[]) => void;
}

export interface SeatmapCanvasRef {
  getInstance: () => SeatMapCanvas | null;
  seatmap: SeatMapCanvas | null;
}

export interface UseSeatmapReturn {
  seatmapInstance: SeatMapCanvas | null;
  isReady: boolean;
  selectedSeats: any[];
  containerRef: React.RefObject<HTMLDivElement>;
  loadData: (data: BlockData[]) => void;
  getSelectedSeats: () => any[];
  getSeat: (seatId: string, blockId: string) => any;
  getBlocks: () => any[];
  zoomToBlock: (blockId: string) => void;
  zoomToVenue: () => void;
  addEventListener: (event: string, callback: Function) => void;
}

export interface SeatmapServerWrapperProps {
  dataSource: string | (() => Promise<BlockData[]>);
  options?: SeatmapOptions;
  className?: string;
  style?: React.CSSProperties;
  fallback?: ReactNode;
  revalidate?: number;
  onSeatClick?: (seat: any) => void;
  onSeatSelect?: (seat: any) => void;
  onSeatUnselect?: (seat: any) => void;
  onBlockClick?: (block: any) => void;
}

export interface ServerActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SeatmapSkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Venue {
  id: string;
  name: string;
  description?: string;
  [key: string]: any;
}
