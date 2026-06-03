import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for the chart focal point: three concentric glow rings plus an outer
 * and inner dot, drawn at a screen-stable size. Mirrors studio `Scene` /
 * `.FocalPoint.createShapes`.
 *
 * The marker keeps a constant on-screen size at any zoom: the renderer draws
 * it inside a group that is counter-scaled by `1 / zoom`, so every length here
 * is expressed in *screen pixels* relative to {@link base_size}. Ring radii are
 * `factor * base_size`, the outer/inner dots are `outer_dot_factor` /
 * `inner_dot_factor` of it, and stroke widths are the matching `*_stroke_factor`.
 */
export class FocalStyle {
    /** On-screen base size (px) the rings and dots are derived from (`unzoom(20)`). */
    base_size: number = 20;

    /** Radius multipliers for the three glow rings (largest first). */
    glow_factors: number[] = [9, 6, 3];
    /** Stroke opacity for each corresponding glow ring. */
    glow_opacities: number[] = [0.07, 0.12, 0.15];
    /** Glow ring stroke width as a fraction of {@link base_size}. */
    glow_stroke_factor: number = 0.1;
    /** Glow ring color (theme `focal_glow`). */
    glow: string;

    /** Outer dot radius as a fraction of {@link base_size}. */
    outer_dot_factor: number = 1;
    /** Outer dot stroke width as a fraction of {@link base_size}. */
    outer_stroke_factor: number = 0.1;
    /** Inner dot radius as a fraction of {@link base_size}. */
    inner_dot_factor: number = 0.5;
    /** Inner dot stroke width as a fraction of {@link base_size}. */
    inner_stroke_factor: number = 0.25;

    /** Outer/inner dot outline (theme `focal_stroke`). */
    stroke: string;
    /** Outer/inner dot fill (theme `focal_fill`). */
    fill: string;

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.glow = palette.focal_glow;
        this.stroke = palette.focal_stroke;
        this.fill = palette.focal_fill;
    }
}
