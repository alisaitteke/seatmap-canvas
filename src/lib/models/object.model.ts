/*
 * object.model.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Chart-level render objects — the canonical (source-of-truth) type definitions
 * shared by the renderer and the React/Vue/etc. wrappers (`src/react/types.ts`
 * re-exports these). Everything that is not bookable seating
 * (sections-as-polygons, GA areas, table/booth bodies, decorative
 * shapes/icons/text) is emitted by the studio converter as a typed render object
 * alongside `blocks[]`.
 *
 * Geometry is pre-resolved into document coordinates so the renderer stays
 * "dumb": it draws what it is given and does not re-run studio layout math. Keep
 * this file dependency-free (no D3/DOM) so it can be imported from anywhere.
 */

/** A 2D point in chart (document) coordinates. */
export interface Point2D {
    x: number;
    y: number;
}

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
    /**
     * Zone key this section/zone-area belongs to (zoned venues only). Mirrors the
     * seat-level `custom_data.zoneKey`, letting consumers group sections by zone.
     */
    zone?: string | number | null;
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
 * A block-local table body. Unlike {@link TableObjectData} (a chart-level
 * object), this lives inside its owning {@link BlockData} alongside the chairs:
 * it rotates with the block and its body is painted as the seating cluster
 * background (above the block hull, beneath the chairs). Geometry mirrors the
 * chart-level table body fields, minus the chart-object base (`id` is optional,
 * no `type`/selection state).
 */
export interface BlockTableData {
    /** Optional stable id (studio table uuid); used only for diffing/debug. */
    id?: string;
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

/** How a multi-floor chart is laid out when every floor is shown at once. */
export type MultiFloorView = 'stage' | 'isometric';

/**
 * A single floor of a multi-floor venue. Each floor carries its own seating,
 * chart-level objects, focal point and (optionally) background image, mirroring
 * the legacy player's per-floor `subChart`. `blocks` stays loosely typed so this
 * dependency-free model never imports the renderer's `BlockModel`/`BlockData`.
 */
export interface FloorData {
    /** Stable identifier (legacy `floorName`); used by the name-based API. */
    id: string;
    /** Optional UI label (legacy `floorDisplayName`); falls back to `id`. */
    display_name?: string;
    blocks: any[];
    objects?: ObjectData[];
    focal_point?: FocalPointData | null;
    /** Per-floor background image URL; falls back to the chart-level background. */
    background_image?: string | null;
}

/**
 * Minimal shape of a full chart document accepted by {@link DataModel.replaceData}
 * alongside the legacy `BlockData[]` array form.
 *
 * Backward compatible: single-floor charts keep using `blocks`/`objects`/
 * `focal_point`. Multi-floor charts instead provide `floors[]`; when present it
 * is the source of truth and the flat fields are ignored.
 */
export interface CanvasChartData {
    blocks?: any[];
    objects?: ObjectData[];
    focal_point?: FocalPointData | null;
    /** Multi-floor venues (max 9 floors). Omitted/empty for single-floor charts. */
    floors?: FloorData[];
    /** Stacked-view layout for multi-floor charts (defaults to `stage`). */
    multi_floor_view?: MultiFloorView;
}
