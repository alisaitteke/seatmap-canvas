/*
 * geometry.constants.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Canonical seat-geometry constants shared with seatmap-studio.
 *
 * These are the single source of truth for the canvas and are mirrored by
 * `seatmap-studio/src/document/defaults.ts`. A studio sync-guard test imports
 * this module and asserts equality, so the two repos cannot silently drift.
 * The values originate from the studio reference geometry:
 *   - `Chair.width = 16`, `Chair.drawRadius = width/2 - 1 = 7`
 *   - `Chair.strokeWidth = 1`
 *   - `Row.DEFAULT_CHAIR_SPACING = 5`, `Row.DEFAULT_SPACING = 14`
 *
 * Keep this file dependency-free so it can be imported from anywhere (renderer,
 * tests, the converter) without pulling in D3 or DOM types.
 */

/** Diameter of a chair in document units (`Chair.width`). */
export const CHAIR_WIDTH = 16;

/** Stroke width of a chair outline in document units (`Chair.strokeWidth`). */
export const CHAIR_STROKE_WIDTH = 1;

/**
 * Radius of a chair's rendered circle (`Chair.drawRadius`). The visible
 * circle is one unit smaller than half the chair width so adjacent chairs do
 * not visually touch. This replaces the legacy canvas default of `12`.
 */
export const CHAIR_RADIUS = CHAIR_WIDTH / 2 - CHAIR_STROKE_WIDTH; // 7

/** Default spacing between chairs within a row, in document units. */
export const CHAIR_SPACING = 5;

/** Default vertical spacing between rows, in document units. */
export const ROW_SPACING = 14;

/**
 * Horizontal advance from one chair's center to the next within a row
 * (`chair width + inter-chair spacing`). Used by layout/zoom math.
 */
export const SPACE_PER_CHAIR = CHAIR_WIDTH + CHAIR_SPACING; // 21

/** Stroke width applied to a selected seat (slightly heavier than the base). */
export const SEAT_SELECTED_STROKE_WIDTH = 1.5;

/**
 * Frozen, serializable view of the geometry contract. Convenient for the
 * studio sync-guard test (`expect(GEOMETRY_DEFAULTS).toEqual({...})`).
 */
export const GEOMETRY_DEFAULTS = {
    chair_width: CHAIR_WIDTH,
    chair_radius: CHAIR_RADIUS,
    chair_stroke: CHAIR_STROKE_WIDTH,
    chair_spacing: CHAIR_SPACING,
    row_spacing: ROW_SPACING,
    space_per_chair: SPACE_PER_CHAIR,
} as const;

export type GeometryDefaults = typeof GEOMETRY_DEFAULTS;
