/*
 * types.ts
 * React Plugin Types for Seatmap Canvas
 */

import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import DefaultsModel from '../lib/models/defaults.model';
import type { Point2D, ObjectData, BlockTableData, FocalPointData, FloorData, MultiFloorView } from '../lib/models/object.model';

/* Re-export the canonical chart-object types (defined in the renderer so they
 * stay the single source of truth) for wrapper/consumer convenience. */
export type {
  Point2D,
  ObjectType,
  ObjectDataBase,
  SectionObjectData,
  GaObjectData,
  TableObjectData,
  BlockTableData,
  BoothObjectData,
  ShapeObjectData,
  IconObjectData,
  TextObjectData,
  ObjectData,
  FocalPointData,
  FloorData,
  MultiFloorView,
} from '../lib/models/object.model';

export interface SeatmapOptions extends Partial<DefaultsModel> {
  [key: string]: any;
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
  /**
   * Explicit hull polygon for the block, in document coordinates. When present
   * (e.g. for section blocks emitted by the studio converter) the renderer uses
   * it verbatim instead of recomputing a convex hull from the seats.
   */
  _bounds?: Point2D[];
  /** Display rotation (degrees) applied to the block around its center. */
  rotate?: number;
  /**
   * Block-local table bodies (round/rect) painted above the block hull and
   * beneath the chairs. Each table rotates with the block. Optional and
   * additive: blocks without tables keep their convex-hull rendering.
   */
  tables?: BlockTableData[];
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

/**
 * The full chart document the studio converter emits and the canvas renders.
 * `blocks` remains the bookable seating; `objects` and `focal_point` are the
 * chart-level layers. Multi-floor charts additionally provide `floors[]`, which
 * supersedes the flat fields when present.
 */
export interface CanvasChart {
  blocks?: BlockData[];
  objects?: ObjectData[];
  focal_point?: FocalPointData | null;
  /** Multi-floor venues (max 9). When present, the flat fields are ignored. */
  floors?: FloorData[];
  /** Stacked-view layout for multi-floor charts (defaults to `stage`). */
  multi_floor_view?: MultiFloorView;
}

/** Floor descriptor surfaced to wrapper consumers via `onFloorChanged`/`getFloors`. */
export interface FloorInfo {
  /** Floor index, or `-1` for the all-floors (picking) view. */
  index: number;
  id: string | null;
  display_name: string | null;
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
  /** Fired when the active floor changes (multi-floor charts). */
  onFloorChanged?: (floor: FloorInfo) => void;
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
  /** Enter a floor by its public id (multi-floor charts). */
  goToFloor: (floorId: string) => void;
  /** Leave the selected floor for the stacked all-floors view. */
  goToAllFloorsView: () => void;
  /** All floors as `{ index, id, display_name }`. */
  getFloors: () => Array<{ index: number; id: string; display_name: string }>;
  /** The active floor, or `{ index: -1 }` for the all-floors view. */
  getCurrentFloor: () => { index: number; id: string | null; display_name: string | null };
}
