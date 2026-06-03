/*
 * theme.palette.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Light/dark chrome palette for the renderer. These values mirror
 * `seatmap-studio/src/render/canvas-theme.ts` one-to-one so a chart rendered by
 * the canvas matches the studio editor pixel-for-pixel.
 *
 * Only *chrome* colors live here (object outlines, labels, table/section/GA
 * scaffolding, focal point). Data-driven colors — category fills and the
 * shape/text/icon colors a user picks — are never themed; they travel on the
 * object/seat model and win over these defaults.
 */

/** Selector for the chrome palette resolved at construction time. */
export type CanvasTheme = 'light' | 'dark';

/**
 * Resolved chrome colors for a single theme. Field names are the canvas
 * convention (snake_case) and map directly onto the studio `CanvasPalette`.
 */
export interface CanvasPalette {
    /** Default outline for chairs/objects (booth body, table body, icons). */
    object_stroke: string;
    /** Outline + highlight color for the current selection. */
    selected_stroke: string;
    /** Primary label fill (seat numbers, table/booth/section labels). */
    label: string;
    /** Secondary, dimmer label fill (row labels, GA captions). */
    muted_label: string;
    /** Fill for chairs/objects with no category assigned. */
    uncategorized_fill: string;
    /** Fill of a table body. */
    table_fill: string;
    /** Fill of a booth body fallback (when uncategorized). */
    booth_fill: string;
    /** Outline of a section polygon. */
    section_stroke: string;
    /** Outline of a general-admission area. */
    ga_stroke: string;
    /** Focal-point ring/dot outline. */
    focal_stroke: string;
    /** Focal-point dot fill. */
    focal_fill: string;
    /** Focal-point glow ring color. */
    focal_glow: string;
    /** Seat-level selection highlight ring. */
    seat_highlight: string;
}

/** Light palette — the studio's original canvas colors. */
export const LIGHT_PALETTE: CanvasPalette = {
    object_stroke: '#0f1012',
    selected_stroke: '#0784fa',
    label: '#0f1012',
    muted_label: '#aeb8c4',
    uncategorized_fill: '#7c8694',
    table_fill: '#cdd3db',
    booth_fill: '#3a3d44',
    section_stroke: '#9aa3ad',
    ga_stroke: '#7c8694',
    focal_stroke: '#06111d',
    focal_fill: '#ffffff',
    focal_glow: '#111111',
    seat_highlight: '#0784fa',
};

/**
 * Dark palette. Object inks flip from near-black to near-white so outlines and
 * labels stay legible on the darker paper, while body fills go dark so the
 * (now light) labels read on top of them.
 */
export const DARK_PALETTE: CanvasPalette = {
    object_stroke: '#e7e9ee',
    selected_stroke: '#4aa3ff',
    label: '#e7e9ee',
    muted_label: '#8b95a3',
    uncategorized_fill: '#7c8694',
    table_fill: '#3a3f4a',
    booth_fill: '#cdd3db',
    section_stroke: '#8b95a3',
    ga_stroke: '#9aa3ad',
    focal_stroke: '#0a0f17',
    focal_fill: '#e7e9ee',
    focal_glow: '#ffffff',
    seat_highlight: '#4aa3ff',
};

/** Resolve the chrome palette for a theme (defaults to light). */
export function getPalette(theme?: CanvasTheme | null): CanvasPalette {
    return theme === 'dark' ? DARK_PALETTE : LIGHT_PALETTE;
}
