/*
 * types.ts
 * React Plugin Types for Seatmap Canvas
 */

import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import DefaultsModel from '../lib/models/defaults.model';

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

/** A 2D point in chart (document) coordinates. */
export interface Point2D {
  x: number;
  y: number;
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

/* ---------------------------------------------------------------------------
 * Chart-level render objects
 *
 * Everything that is not bookable seating (sections-as-polygons, GA areas,
 * table/booth bodies, decorative shapes/icons/text) is emitted by the studio
 * converter as a typed render object alongside `blocks[]`. Geometry is
 * pre-resolved into document coordinates so the renderer stays "dumb": it draws
 * what it is given and does not re-run studio layout math.
 * ------------------------------------------------------------------------- */

/** Discriminator for the chart-level object union. */
export type ObjectType =
  | 'section'
  | 'ga'
  | 'table'
  | 'booth'
  | 'shape'
  | 'icon'
  | 'text';

/** Fields shared by every chart-level render object. */
export interface ObjectDataBase {
  /** Stable object id (studio uuid). */
  id: string;
  /** Render-type discriminator. */
  type: ObjectType;
  /** Whether the object responds to selection as a whole (GA/booth). */
  selectable?: boolean;
  /** Initial selected state. */
  selected?: boolean;
  /** Pass-through payload echoed back on `OBJECT.CLICK`. */
  custom_data?: any;
}

/**
 * A section polygon. The interior seating is emitted separately as a
 * {@link BlockData}; this object only paints the polygon fill, outline and
 * caption. `path` is a pre-built SVG path `d` string honoring any cutoff/bounds.
 */
export interface SectionObjectData extends ObjectDataBase {
  type: 'section';
  path: string;
  /** Label anchor (polygon center with label offsets baked in). */
  center: Point2D;
  /** Resolved category fill color (falls back to the theme uncategorized fill). */
  color?: string;
  /** Caption text; defaults to "Section" when omitted but `label_shown`. */
  label?: string | null;
  /** Whether the caption is drawn. */
  label_shown?: boolean;
  /** Caption font size override (defaults to the section style `label_size`). */
  label_size?: number | null;
  /** Seat count appended to the caption ("label · N") when greater than 0. */
  seat_count?: number;
}

/**
 * A general-admission area: a shaped region booked by capacity. Selectable as
 * a whole. `path` is a pre-built SVG path; `rotation` is applied around `center`.
 */
export interface GaObjectData extends ObjectDataBase {
  type: 'ga';
  path: string;
  center: Point2D;
  color?: string;
  /** Final SVG fill-opacity (converter resolves translucent + opacity%). */
  fill_opacity?: number;
  /** Display rotation (degrees) applied around `center`. */
  rotation?: number;
  label?: string | null;
  label_shown?: boolean;
  /** Capacity, used to build the default "GA · {capacity}" caption. */
  capacity?: number;
}

/**
 * A table body. The chairs around the table are emitted as real seats in a
 * block; this object only paints the body (round circle or rounded rect) and an
 * optional table label.
 */
export interface TableObjectData extends ObjectDataBase {
  type: 'table';
  /** Body geometry kind. */
  shape: 'round' | 'rect';
  center: Point2D;
  /** Radius of a round table body (`shape: 'round'`). */
  radius?: number;
  /** Width of a rectangular table body (`shape: 'rect'`). */
  width?: number;
  /** Height of a rectangular table body (`shape: 'rect'`). */
  height?: number;
  /** Corner radius of a rectangular body (defaults to the table style). */
  corner_radius?: number;
  /** Rotation (degrees) applied around `center` (rect tables). */
  rotation?: number;
  /** Body fill override (defaults to the theme `table_fill`). */
  color?: string;
  label?: string | null;
  label_shown?: boolean;
}

/**
 * A bookable booth: a rounded rectangle with the diagonal "cross" lines,
 * rotated around its center and selectable as a whole.
 */
export interface BoothObjectData extends ObjectDataBase {
  type: 'booth';
  center: Point2D;
  width: number;
  height: number;
  /** Corner radius of the booth body (defaults to the booth style). */
  corner_radius?: number;
  /** Rotation (degrees) applied around `center`. */
  rotation?: number;
  /** Body fill, typically the category color (falls back to theme `booth_fill`). */
  color?: string;
  label?: string | null;
}

/** A decorative, non-bookable shape painted on the background or foreground. */
export interface ShapeObjectData extends ObjectDataBase {
  type: 'shape';
  path: string;
  center: Point2D;
  /** Fill color picked by the user. */
  fill?: string;
  /** Stroke color picked by the user (or `null`/omitted for no stroke). */
  stroke?: string | null;
  stroke_width?: number;
  /** Rotation (degrees) applied around `center`. */
  rotation?: number;
  /** Stacking layer relative to the seating objects. */
  layer?: 'background' | 'foreground';
}

/** A decorative glyph rendered as a rounded tile with a caption. */
export interface IconObjectData extends ObjectDataBase {
  type: 'icon';
  center: Point2D;
  size: number;
  /** Rotation (degrees) applied around `center`. */
  rotation?: number;
  /** Tile fill color. */
  color?: string;
  /** Opacity 0–100 of the tile fill. */
  opacity?: number;
  /** Glyph key (e.g. "stage"); the renderer maps it to a caption. */
  content?: string;
  /** Explicit caption override (wins over the `content` mapping). */
  caption?: string;
}

/** A free-floating text caption anchored at `origin`. */
export interface TextObjectData extends ObjectDataBase {
  type: 'text';
  origin: Point2D;
  text: string;
  font_size: number;
  /** Text color (falls back to the theme `label`). */
  color?: string;
  bold?: boolean;
  italic?: boolean;
  /** Rotation (degrees) applied around `origin`. */
  rotation?: number;
}

/** Discriminated union of all chart-level render objects. */
export type ObjectData =
  | SectionObjectData
  | GaObjectData
  | TableObjectData
  | BoothObjectData
  | ShapeObjectData
  | IconObjectData
  | TextObjectData;

/** The point a venue's content is oriented around (e.g. stage/pitch). */
export interface FocalPointData extends Point2D {}

/**
 * The full chart document the studio converter emits and the canvas renders.
 * `blocks` remains the bookable seating; `objects` and `focal_point` are the
 * new chart-level layers.
 */
export interface CanvasChart {
  blocks: BlockData[];
  objects?: ObjectData[];
  focal_point?: FocalPointData | null;
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
